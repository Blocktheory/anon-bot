/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { TApiResponse } from "../types";

export const API_BASE_URL: string | undefined =
  "https://api.blio.blocktheory.com/api";

//@ts-ignore
function axiosInstanceCreator(baseURL: string | undefined, accessKey?: string) {
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

const blockTheoryInstance = axiosInstanceCreator(API_BASE_URL);

export const API_INSTANCES = {
  blockTheory: blockTheoryInstance,
};
export default API_INSTANCES;
