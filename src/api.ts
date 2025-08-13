import axios from 'axios';

const API_BASE_URL = 'http://localhost:3005/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithUpload = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for adding auth token
apiWithUpload.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with improved error logging
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;

//     if (response) {
//       // console.error(' API Error Response:', {
//       //   url: response.config.url,
//       //   method: response.config.method,
//       //   status: response.status,
//       //   statusText: response.statusText,
//       //   data: response.data,
//       // });
//     } else if (error.request) {
//       console.error(' No response received:', error.request);
//     } else {
//       console.error(' Error setting up request:', error.message);
//     }

//     return Promise.reject(error);
//   }
// );

//  API endpoints

// Home
export const getHomeData = () => api.get('/home');
export const getHomeDataById = (id: string) => api.get(`/home/${id}`);

// User Auth
export const registerUser = ({ user_name, email, password, phone_number, role }: any) => api.post('/user/auth/register', { email, password, user_name, phone_number, role });
export const loginUser = ({ email, password }: any) => api.post('/user/auth/login', { email, password });

// Users
export const getUsers = () => api.get('/user');
export const getUserById = (id: string) => api.get(`/user/${id}`);
export const updateUser = (id: string, userData: any) => api.patch(`/user/${id}`, userData);
export const deleteUser = (id: string) => api.delete(`/user/${id}`);

// Labs
export const createLab = (labData: any) => apiWithUpload.post('/labs', labData)
export const getLabs = () => api.get('/labs');
export const getLabById = (id: string) => api.get(`/labs/${id}`);
export const updateLab = (id: string, labData: any) => api.patch(`/labs/${id}`, labData);
export const deleteLab = (id: string) => api.delete(`/labs/${id}`);

// Company
export const createCompany = (companyData: any) => apiWithUpload.post('/company', companyData);
export const getCompanies = () => api.get('/company');
export const getCompanyById = (id: string) => api.get(`/company/${id}`);
export const updateCompany = (id: string, companyData: any) => api.patch(`/company/${id}`, companyData);
export const deleteCompany = (id: string) => api.delete(`/company/${id}`);

// Products
export const createProduct = (productData: any) => api.post('/products', productData);
export const getProducts = () => api.get('/products');
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const updateProduct = (id: string, productData: any) => api.patch(`/products/${id}`, productData);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);

// Attachments
export const createUserAttach = (userAttachData: any) => api.post('/user-attach', userAttachData);
export const getUserAttaches = () => api.get('/user-attach');
export const getUserAttachById = (id: string) => api.get(`/user-attach/${id}`);
export const updateUserAttach = (id: string, userAttachData: any) => api.patch(`/user-attach/${id}`, userAttachData);
export const deleteUserAttach = (id: string) => api.delete(`/user-attach/${id}`);

// Product Image
export const createProductImage = (productImageData: any) => api.post('/product-image', productImageData);
export const getProductImages = () => api.get('/product-image');
export const getProductImageById = (id: string) => api.get(`/product-image/${id}`);
export const updateProductImage = (id: string, productImageData: any) => api.patch(`/product-image/${id}`, productImageData);
export const deleteProductImage = (id: string) => api.delete(`/product-image/${id}`);

export default api;
