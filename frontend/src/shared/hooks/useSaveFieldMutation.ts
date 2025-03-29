import { OffersApi } from "@api/offers";
import { useOfferContext } from "@contexts/OfferProvider";
import { useMutation } from "@tanstack/react-query";

export const useSaveFieldMutation = () => {
  const { offerId, setOfferId } = useOfferContext();

  return useMutation({
    mutationFn: async ({ name, value }: { name: string; value: any }) => {
      const currentOfferId = offerId;

      if (!currentOfferId) {
        // First field → create offer
        const res = await OffersApi.createOffer({ field: name, value });

        console.log(res);

        setOfferId(res.id); // Set offerId globally

        console.log(offerId, "offerId");
      } else {
        // Update field
        await OffersApi.UpdateOffer(currentOfferId, { field: name, value });
      }
    },
  });
};
