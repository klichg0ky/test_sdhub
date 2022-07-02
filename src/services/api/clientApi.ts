import axios from "axios";
import { message as Message } from "antd";
export const clientApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const handleError = (data: Record<string, any>) => {
  const errors: string[] = [];
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      errors.push(...data[key]);
    } else {
      errors.push(data[key]);
    }
  });
  return errors?.[0] || "Неполадки на сервере";
};

clientApi.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    Message.error(handleError(error.response.data));
    return Promise.reject(error);
  }
);
