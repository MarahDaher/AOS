/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, Method } from "axios";
import { axiosInstance } from "./config";
import { enqueueSnackbar } from "notistack";

interface RequestOptions {
  method: Method;
  endpoint: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  onUnauthorized?: () => void; // 👈 for logout redirect
}

interface SuccessResponse<T = any> {
  status: true;
  message?: string;
  data: T;
}

interface ErrorResponse {
  status: false;
  message: string;
  data?: Record<string, string[]>;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export async function handleRequest<T = any>({
  method,
  endpoint,
  data,
  params,
  headers,
  onUnauthorized,
}: RequestOptions): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance({
      method,
      url: endpoint,
      data,
      params,
      headers,
    });

    if (response.data.status) {
      return response.data.data;
    } else {
      const { message, data: fieldErrors } = response.data;

      const hasFieldErrors =
        fieldErrors &&
        typeof fieldErrors === "object" &&
        Object.keys(fieldErrors).length > 0;

      if (!hasFieldErrors || message !== "Validierungsfehler") {
        enqueueSnackbar(message || "Fehler bei der Anfrage", {
          variant: "error",
        });
      }

      if (hasFieldErrors) {
        Object.values(fieldErrors).forEach((fieldMsgs) => {
          (fieldMsgs as string[]).forEach((msg) =>
            enqueueSnackbar(msg, { variant: "error" })
          );
        });
      }

      throw new Error(message || "API-Fehler");
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      // 🔐 Handle unauthenticated or expired sessions
      if (status === 401 || status === 419) {
        enqueueSnackbar("Sitzung abgelaufen. Bitte erneut anmelden.", {
          variant: "warning",
        });

        if (typeof onUnauthorized === "function") {
          onUnauthorized(); // trigger logout + redirect
        }

        throw new Error("Unauthenticated");
      }

      const hasFieldErrors =
        data?.data &&
        typeof data.data === "object" &&
        Object.keys(data.data).length > 0;

      if (!hasFieldErrors || data?.message !== "Validierungsfehler") {
        enqueueSnackbar(data?.message || `Fehler [${status}]`, {
          variant: "error",
        });
      }

      if (hasFieldErrors) {
        Object.values(data.data).forEach((fieldMsgs) => {
          (fieldMsgs as string[]).forEach((msg) =>
            enqueueSnackbar(msg, { variant: "error" })
          );
        });
      }

      throw new Error(data?.message || "API-Fehler");
    } else if (error.request) {
      enqueueSnackbar("Keine Antwort vom Server.", { variant: "error" });
      throw new Error("Keine Antwort vom Server.");
    } else {
      enqueueSnackbar("Unerwarteter Fehler.", { variant: "error" });
      throw new Error(error.message);
    }
  }
}
