import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const notifyError = (message: string | string[]) => {
  if (Array.isArray(message)) {
    toast.error(message.join(", "));
  } else {
    toast.error(message);
  }
  return;
};

export const notifySuccess = (message: string) => {
  toast.success(message);
  return;
};

export const notifyWarning = (message: string) => {
  toast.warning(message);
  return;
};

export const notifyInfo = (message: string) => {
  toast.info(message);
  return;
};