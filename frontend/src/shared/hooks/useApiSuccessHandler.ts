import { useSnackbar } from "notistack";

export const useApiSuccessHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  return { showSuccess };
};
