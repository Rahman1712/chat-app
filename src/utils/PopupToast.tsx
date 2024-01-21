import { toast } from "react-hot-toast";

type ToastType = 'success' | 'error';

const PopupToast = (toastType: ToastType, toastMessage: string, duration: number = 1000): void => {
  switch (toastType) {
    case 'success':
      toast.success(toastMessage, { position: 'bottom-center' });
      break;
    case 'error':
      toast.error(toastMessage, { position: 'bottom-center', duration });
      break;
    default:
      toast.error('Error occurred...!');
      break;
  }
};

export default PopupToast;
