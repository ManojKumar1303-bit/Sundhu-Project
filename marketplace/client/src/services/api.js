import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('thread_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
export const authApi = { register: (data) => api.post('/auth/register', data), login: (data) => api.post('/auth/login', data) }
export const marketplaceApi = { products: () => api.get('/products'), product: (id) => api.get(`/products/${id}`), saveCart: (items) => api.put('/cart', { items }), cart: () => api.get('/cart'), wishlist: () => api.get('/wishlist'), toggleWishlist: (id) => api.post(`/wishlist/${id}`), orders: () => api.get('/orders'), createOrder: (data) => api.post('/orders', data), dashboard: () => api.get('/dashboard'), profile: (data) => api.patch('/profile', data), users: () => api.get('/admin/users'), updateUser: (id, data) => api.patch(`/admin/users/${id}`, data), deleteUser: (id) => api.delete(`/admin/users/${id}`), approveSeller: (id, approvalStatus) => api.patch(`/admin/sellers/${id}`, { approvalStatus }), approveProduct: (id, status) => api.patch(`/admin/products/${id}`, { status }), createProduct: (data) => api.post('/products', data), updateProduct: (id, data) => api.patch(`/products/${id}`, data), deleteProduct: (id) => api.delete(`/products/${id}`), categories: () => api.get('/categories'), createCategory: (data) => api.post('/categories', data), updateCategory: (id, data) => api.patch(`/categories/${id}`, data), deleteCategory: (id) => api.delete(`/categories/${id}`), updateOrder: (id, orderStatus) => api.patch(`/orders/${id}`, { orderStatus }), review: (id, data) => api.post(`/products/${id}/reviews`, data) }
export default api
