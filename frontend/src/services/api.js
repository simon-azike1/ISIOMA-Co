import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const servicesAPI = {
  getAll: () => api.get('/services'),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  reorder: (id, order) => api.patch(`/services/${id}/reorder`, { order })
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
};

export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

export const faqsAPI = {
  getAll: () => api.get('/faqs'),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`)
};

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact/messages'),
  markAsRead: (id) => api.patch(`/contact/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/contact/messages/${id}`)
};

export const consultancyAPI = {
  get: () => api.get('/consultancy'),
  getAllActive: () => api.get('/consultancy/all-active'),
  getAll: () => api.get('/consultancy/all'),
  create: (data) => api.post('/consultancy', data),
  update: (id, data) => api.put(`/consultancy/${id}`, data),
  delete: (id) => api.delete(`/consultancy/${id}`)
};

export default api;