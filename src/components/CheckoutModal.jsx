import React, { useState } from 'react';
import { X, MapPin, Clock, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      onClose();
      setOrderPlaced(false);
      setStep(1);
    }, 3000);
  };

  if (!isOpen) return null;

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-4">Your order will be delivered in 15 minutes</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">Order ID: #SUC{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{totalItems} items</span>
            <span className="font-semibold text-gray-900">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-lg text-gray-900">₹{totalPrice}</span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <MapPin className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Delivery Address</p>
              <p className="text-sm text-gray-600">123 Main Street, City, PIN 123456</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <Clock className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Delivery Time</p>
              <p className="text-sm text-gray-600">15 minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Payment Method</p>
              <p className="text-sm text-gray-600">Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Truck className="w-5 h-5" />
            <span>Place Order - ₹{totalPrice}</span>
          </div>
        </button>

        <p className="text-xs text-gray-500 text-center mt-3">
          By placing this order, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default CheckoutModal;
