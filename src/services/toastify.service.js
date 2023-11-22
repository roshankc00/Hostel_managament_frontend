import { toast } from "react-toastify";

const config = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const successToast = (message) => {
  toast.success(message, config);
};

export const warningToast = (message) => {
  toast.warning(message, config);
};

export const errorToast = (message) => {
  toast.error(message, config);
};
export const loadingToast = () => {
  toast.loading("loading", config);
};
