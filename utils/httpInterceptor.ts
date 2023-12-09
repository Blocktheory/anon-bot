/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { ANON_API_BASE_URL } from "../constants";
import { TApiResponse } from "../types";

export const API_BASE_URL: string | undefined = ANON_API_BASE_URL;

//@ts-ignore
function axiosInstanceCreator(baseURL: string | undefined) {
  const axiosInstance: AxiosInstance = axios.create();
  axiosInstance.defaults.baseURL = baseURL;
  axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response: AxiosResponse<TApiResponse>) {
      if (response.status >= 200 && response.status <= 299) {
        return response;
      } else {
        return Promise.reject(response);
      }
    },

    function (error: AxiosError) {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

const anonInstance = axiosInstanceCreator(API_BASE_URL);

export const API_INSTANCES = {
  anon: anonInstance,
};
export default API_INSTANCES;
