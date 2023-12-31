import { ReactElement } from "react";

export type TRouteTypes = {
  path: string;
  element: ReactElement;
  key: string;
};

export type TResponse<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: T;
  statusCode: number;
  message: string;
};

export type TApiResponse = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {};
  status_code: number;
  message: string;
};

export type TErrors = {
  [key: string]: string;
};
