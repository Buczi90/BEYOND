import internal from 'stream';

export interface ResponseModel {
  data?: any;
  error?: ErrorModel;
  token: string;
}

export interface ErrorModel {
  code: number;
  message: string;
}
