export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText?: string;
}
export const initialDialogData: ConfirmDialogData = {
  title: '',
  message: '',
  confirmButtonText: '',
};
