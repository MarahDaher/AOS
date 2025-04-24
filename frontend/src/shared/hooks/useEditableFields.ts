import { useQuery } from "@tanstack/react-query";
import { OffersApi } from "@api/offers";

export const useEditableFields = (offerId?: number) => {
  return useQuery({
    queryKey: ["editable-fields", offerId ?? "new"],
    queryFn: () => {
      if (!offerId) {
        return Promise.resolve(["general_offer_number"]);
      }
      return OffersApi.getEditableFields(offerId);
    },
    enabled: offerId !== undefined,
    refetchOnWindowFocus: false,
  });
};
