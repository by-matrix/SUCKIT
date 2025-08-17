const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      paymentMethod = 'cod',
      specialInstructions,
      couponCode
    } = req.body;

    const userId = req.user.userId;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Validate delivery address
    if (!deliveryAddress || !deliveryAddress.address || !deliveryAddress.phone) {
      return res.status(400).json({
        success: false,
        message: 'Valid delivery address is required'
      });
    }

    // Calculate order totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      if (!product.isAvailable || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock or insufficient quantity`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Calculate delivery fee (free for orders above ₹199)
    const deliveryFee = subtotal >= 199 ? 0 : 40;
    
    // Apply discount if coupon code is provided
    let discount = 0;
    // TODO: Implement coupon validation logic

    const total = subtotal + deliveryFee - discount;

    // Calculate expected delivery time (15 minutes from now)
    const expectedDeliveryTime = new Date(Date.now() + 15 * 60 * 1000);

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      deliveryAddress,
      paymentMethod,
      expectedDeliveryTime,
      specialInstructions,
      couponCode,
      statusHistory: [{
        status: 'placed',
        timestamp: new Date(),
        note: 'Order placed successfully'
      }]
    });

    await order.save();

    // Populate order details
    await order.populate('items.product', 'name images unit');
    await order.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ user: userId })
      .populate('items.product', 'name images unit')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Order.countDocuments({ user: userId });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: Number(page),
          pages: Math.ceil(total / Number(limit)),
          total,
          hasNext: Number(page) < Math.ceil(total / Number(limit)),
          hasPrev: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.userId;

    const order = await Order.findOne({ 
      _id: orderId, 
      user: userId 
    })
      .populate('items.product', 'name images unit')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.userId;
    const { reason } = req.body;

    const order = await Order.findOne({ 
      _id: orderId, 
      user: userId 
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (['delivered', 'cancelled'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'This order cannot be cancelled'
      });
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // Update order status
    order.orderStatus = 'cancelled';
    order.cancelReason = reason;
    order.cancelledBy = 'user';
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: `Order cancelled by user. Reason: ${reason}`
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order'
    });
  }
};
