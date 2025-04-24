import { OffersApi } from "@api/offers";
import { useOfferContext } from "@contexts/OfferProvider";
import { useMutation } from "@tanstack/react-query";
import { NavigateFunction } from "react-router-dom";

export const useSaveFieldMutation = (navigate?: NavigateFunction) => {
  const { offerId, setOfferData, setOfferId } = useOfferContext();

  return useMutation({
    mutationFn: async ({ name, value }: { name: string; value: any }) => {
      if (!offerId) {
        const res = await OffersApi.createOffer({ field: name, value });
        const newId = res.id;

        setOfferId(newId);
        setOfferData(res.offer);

        console.log("Created offer with ID:", newId);
        if (navigate) {
          navigate(`/angebote/${newId}`);
        }
      } else {
        const res = await OffersApi.UpdateOffer(offerId, {
          field: name,
          value,
        });
        setOfferData(res.offer);
      }
    },
  });
};
