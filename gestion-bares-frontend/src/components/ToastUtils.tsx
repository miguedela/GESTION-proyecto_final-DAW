import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const commonOptions: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...commonOptions, ...options });
}

export const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...commonOptions, ...options });
}

export const showInfoToast = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...commonOptions, ...options });
}

export const showWarningToast = (message: string, options?: ToastOptions) => {
    toast.warn(message, { ...commonOptions, ...options });
}

export const showCustomToast = (message: string, options?: ToastOptions) => {
    toast(message, { ...commonOptions, ...options });
}
