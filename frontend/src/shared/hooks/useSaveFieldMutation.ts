import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSaveFieldMutation = () => {
  return useMutation({
    mutationFn: async ({ name, value }: { name: string; value: any }) => {
      return axios.patch("/api/offer", { [name]: value });
    },
  });
};
