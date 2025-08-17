// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/products?${searchParams}`);
  },

  getById: (id) => apiRequest(`/products/${id}`),

  getFeatured: () => apiRequest('/products/featured'),

  addReview: (productId, reviewData) =>
    apiRequest(`/products/${productId}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest('/categories'),
};

// Orders API
export const ordersAPI = {
  create: (orderData) =>
    apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getUserOrders: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/orders?${searchParams}`);
  },

  getById: (id) => apiRequest(`/orders/${id}`),

  cancel: (id, reason) =>
    apiRequest(`/orders/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    }),
};

// Users API
export const usersAPI = {
  updateProfile: (profileData) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  addAddress: (addressData) =>
    apiRequest('/users/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    }),

  updateAddress: (addressId, addressData) =>
    apiRequest(`/users/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    }),

  deleteAddress: (addressId) =>
    apiRequest(`/users/addresses/${addressId}`, {
      method: 'DELETE',
    }),

  changePassword: (passwordData) =>
    apiRequest('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    }),
};
