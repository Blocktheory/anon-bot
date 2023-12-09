import API_INSTANCES from "./httpInterceptor";
import { AxiosResponse } from "axios";
import { TResponse } from "../types";

export const globalGetService = <TParamType, U>(
  url: string,
  params: TParamType,
  instance: keyof typeof API_INSTANCES = "blockTheory"
): Promise<TResponse<U>> => {
  return new Promise(function (resolve, reject) {
    API_INSTANCES[instance]({
      method: "GET",
      url: url,
      params: params,
    })
      .then((response: AxiosResponse<U>) => {
        const _response: TResponse<U> = {
          data: response.data,
          statusCode: response.status,
          message: response.statusText,
        };

        resolve(_response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const globalApiService = <TDataType, TApiResponse>(
  url: string,
  data: TDataType,
  method: string,
  instance: keyof typeof API_INSTANCES = "blockTheory"
): Promise<TResponse<TApiResponse>> => {
  return new Promise(function (resolve, reject) {
    API_INSTANCES[instance]({
      method: method,
      url: url,
      data: data,
    })
      .then((response: AxiosResponse<TResponse<TApiResponse>>) => {
        const _response: TResponse<TApiResponse> = {
          data: response.data.data,
          statusCode: response.status,
          message: response.statusText,
        };
        resolve(_response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
