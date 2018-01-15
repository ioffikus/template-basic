import axios, { AxiosRequestConfig } from 'axios';
import { IXShopHeaders } from 'src/core/interfaces/IXShopHeaders';
import ServerCfg from 'src/configs/server';

export const abortTokenPool: { [abortToken: string]: boolean } = {};

axios.interceptors.request.use(
  config => {
    if (process.env.BROWSER) {
      const abortToken = config.headers['x-abort-token'];
      if (abortToken && abortTokenPool[abortToken]) {
        return Promise.reject(null);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    if (process.env.BROWSER) {
      const abortToken = response.config.headers['x-abort-token'];
      if (abortToken && abortTokenPool[abortToken]) {
        return Promise.reject(null);
      }
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

const _request = (method: string, config: AxiosRequestConfig, xShopHeaders: IXShopHeaders, abortToken: string) => {
  const headers =
    process.env.BROWSER && abortToken
      ? { ...config.headers, ...xShopHeaders, 'x-abort-token': abortToken }
      : { ...config.headers, ...xShopHeaders };
  const baseURL = process.env.BROWSER ? '' : `http://${ServerCfg.HOST}:${ServerCfg.PORT}`;
  return axios({
    responseType: 'json',
    validateStatus: status => status === 200,
    ...config,
    method,
    headers,
    baseURL,
  });
};

export const GET = (config: AxiosRequestConfig, xShopHeaders: IXShopHeaders, abortToken?: string) =>
  _request('GET', config, xShopHeaders, abortToken);

export const POST = (config: AxiosRequestConfig, xShopHeaders: IXShopHeaders, abortToken?: string) =>
  _request('POST', config, xShopHeaders, abortToken);

export const DELETE = (config: AxiosRequestConfig, xShopHeaders: IXShopHeaders, abortToken?: string) =>
  _request('DELETE', config, xShopHeaders, abortToken);

export const PUT = (config: AxiosRequestConfig, xShopHeaders: IXShopHeaders, abortToken?: string) =>
  _request('PUT', config, xShopHeaders, abortToken);
