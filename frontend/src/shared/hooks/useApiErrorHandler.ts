// hooks/useApiErrorHandler.ts
import { useSnackbar } from "notistack";

export const useApiErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (error: any) => {
    if (typeof error === "string") {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    if (error?.response?.data) {
      const res = error.response.data;

      // General message
      if (res.message) {
        enqueueSnackbar(res.message, { variant: "error" });
      }

      // Field validation errors (422)
      if (res.data && typeof res.data === "object") {
        Object.values(res.data).forEach((fieldErrors) => {
          (fieldErrors as string[]).forEach((msg) =>
            enqueueSnackbar(msg, { variant: "error" })
          );
        });
      }
    } else {
      enqueueSnackbar("Etwas ist schief gelaufen.", { variant: "error" });
    }
  };

  return { showError };
};
