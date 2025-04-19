import { useQuery } from "@tanstack/react-query";
import { OffersApi } from "@api/offers";

export const useEditableFields = (offerId?: number) => {
  return useQuery({
    queryKey: ["editable-fields", offerId],
    queryFn: () => OffersApi.getEditableFields(offerId!),
    enabled: !!offerId,
    refetchOnWindowFocus: false,
  });
};
