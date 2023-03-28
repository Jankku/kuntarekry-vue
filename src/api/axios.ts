import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  async (req) => {
    req.params = { ...req.params, client: import.meta.env.VITE_KUNTAREKRY_CLIENT_ID };
    return req;
  },
  async (err: unknown) => Promise.reject(err)
);

export default instance;
