import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { instance } from './instance';

// Обертка для использования нашего кастомного инстанса axios
export async function customInstance<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return instance(config);
}

// Экспортируем также типы для совместимости
export type { AxiosRequestConfig, AxiosResponse };

// Экспортируем также базовый URL для использования в orval
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
