import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OfferRawMaterialCalculatedModel } from "@interfaces/RawMaterial.model";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { useApiSuccessHandler } from "./useApiSuccessHandler";

export const useRawMaterials = (offerId: number) => {
  const queryClient = useQueryClient();
  const { showSuccess } = useApiSuccessHandler();

  // Load raw materials
  const rawMaterialsQuery = useQuery<OfferRawMaterialCalculatedModel[]>({
    queryKey: ["raw-materials", offerId],
    queryFn: async () => {
      const response =
        await OfferRawMaterialCalculatedApi.getRawMaterialCalculatedByOfferId(
          offerId
        );
      return response;
    },
  });

  // Update raw material
  const updateMutation = useMutation({
    mutationFn: async ({
      rawMaterialId,
      data,
    }: {
      rawMaterialId: number;
      data: Partial<OfferRawMaterialCalculatedModel>;
    }) => {
      const response =
        await OfferRawMaterialCalculatedApi.updateRawMaterialDemand(
          offerId,
          rawMaterialId,
          data
        );
      showSuccess("Feld erfolgreich gespeichert.");
      return response.data;
    },
    onSuccess: () => {
      // Refresh list after update
      queryClient.invalidateQueries({ queryKey: ["raw-materials", offerId] });
    },
  });

  return {
    ...rawMaterialsQuery,
    updateRawDemanMaterial: updateMutation.mutateAsync,
    updateStatus: updateMutation.status,
    updateError: updateMutation.error,
  };
};
