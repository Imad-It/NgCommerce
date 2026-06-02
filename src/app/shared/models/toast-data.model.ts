export interface ToastData {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
}

export const initialToast: ToastData = {
  visible: false,
  title: '',
  message: '',
  type: 'success',
};
