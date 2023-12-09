import { TResponse } from "../types";
import { globalPostService } from "./globalApiServices";

export const postProofData = (data: any): Promise<TResponse<any[]>> => {
  return new Promise((resolve, reject) => {
    globalPostService<null, any[]>(`proof/accept`, data, "anon")
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
