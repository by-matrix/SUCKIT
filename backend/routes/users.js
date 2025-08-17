const express = require('express');
const router = express.Router();
const {
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  changePassword
} = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

// @route   POST /api/users/addresses
// @desc    Add new address
// @access  Private
router.post('/addresses', auth, addAddress);

// @route   PUT /api/users/addresses/:addressId
// @desc    Update address
// @access  Private
router.put('/addresses/:addressId', auth, updateAddress);

// @route   DELETE /api/users/addresses/:addressId
// @desc    Delete address
// @access  Private
router.delete('/addresses/:addressId', auth, deleteAddress);

// @route   PUT /api/users/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', auth, changePassword);

module.exports = router;
