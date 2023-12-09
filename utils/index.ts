import { TResponse } from "../types";
import { globalGetService } from "./globalApiServices";

export const apiCall = (query: any): Promise<TResponse<any[]>> => {
  return new Promise((resolve, reject) => {
    globalGetService<null, any[]>(``, null, "blockTheory")
      .then((response) => {
        const _response = {
          ...response,
          data: response.data,
        };
        resolve(_response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
