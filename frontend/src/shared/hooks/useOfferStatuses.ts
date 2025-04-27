import { useQuery } from "@tanstack/react-query";
import { OffersApi } from "@api/offers";

export const useOfferStatuses = () => {
  return useQuery({
    queryKey: ["offer-statuses"],
    queryFn: OffersApi.getAllOfferStatus,
    refetchOnWindowFocus: false,
  });
};
