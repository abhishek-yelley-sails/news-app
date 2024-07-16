import axios from 'axios';
import { LoginData, UserInfoEditData, UserPasswordEditData } from '../util/definitions';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

type DataType = LoginData | UserInfoEditData | UserPasswordEditData | null;

export async function makeRequest(url: string, data: DataType = null, token: string | null = null, method = 'get') {
  const config: { url: string, method: string, data: DataType, headers?: { [key: string]: string } } = {
    url,
    method,
    data,
  };
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  if (method !== 'get' && data) {
    config.data = data;
  }
  const response = await axiosInstance(config);
  return response.data;
}


export default makeRequest;
