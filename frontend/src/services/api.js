// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Books API
export const booksAPI = {
  // Get all books with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_BASE_URL}/books?${queryParams}` : `${API_BASE_URL}/books`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },
  
  // Get book by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse(response);
  },
  
  // Search books
  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
  
  // Create book (Admin only)
  create: async (bookData) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(bookData)
    });
    return handleResponse(response);
  },
  
  // Update book (Admin only)
  update: async (id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(bookData)
    });
    return handleResponse(response);
  },
  
  // Delete book (Admin only)
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  }
};

// Users API
export const usersAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },
  
  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await handleResponse(response);
    
    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    return !!getAuthToken();
  },
  
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  }
};

// Orders API
export const ordersAPI = {
  // Create new order
  create: async (orderData) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Add auth token if user is logged in
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },
  
  // Get order by ID
  getById: async (id) => {
    const headers = {};
    
    // Add auth token if user is logged in
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, { headers });
    return handleResponse(response);
  },
  
  // Get user orders
  getUserOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },
  
  // Get all orders (Admin only)
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_BASE_URL}/orders?${queryParams}` : `${API_BASE_URL}/orders`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },
  
  // Update order status (Admin only)
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  }
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
};

export default {
  booksAPI,
  usersAPI,
  ordersAPI,
  healthCheck
};
