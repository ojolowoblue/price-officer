//@ts-nocheck
import { AxiosError } from 'axios';

export const parseError = (err: AxiosError): string => {
  if (err?.response?.data?.error) {
    if (typeof err.response.data.error === 'string') {
      return err.response.data.error;
    }
    if (err.response.data.error.message) {
      return err.response.data.error.message;
    }
  }
  if (err?.response?.data?.message) {
    return err.response.data.message;
  } else if (err?.response?.data?.status) {
    return err.response.data.status;
  } else if (err?.message) {
    return err.message;
  } else {
    return 'Error Occured';
  }
};
