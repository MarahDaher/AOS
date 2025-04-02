import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { RawMaterialApi } from "@api/raw-materials";
import { useOfferContext } from "@contexts/OfferProvider";
import { RawMaterialPricesTableInitialValues } from "@pages/Offers/New/Index";
import { BaseMaterial, RawMaterialRow } from "@interfaces/RawMaterial.model";

export const useRawMaterialPricesTable = () => {
  const { showError } = useApiErrorHandler();
  const { offerDetails } = useOfferContext();

  const [baseMaterials, setRawMaterials] = useState<BaseMaterial[]>([]);
  const [rawMaterialRows, setRawMaterialRows] = useState<RawMaterialRow[]>([]);

  const fetchOfferRawMaterials = async () => {
    if (!offerDetails?.id) return;
    try {
      const res =
        await OfferRawMaterialCalculatedApi.getRawMaterialCalculatedByOfferId(
          offerDetails.id
        );
      setRawMaterialRows(res);
    } catch (error) {
      showError(error);
    }
  };

  const fetchRawMaterials = async () => {
    try {
      const res = await RawMaterialApi.getAllOffers();
      setRawMaterials(res);
    } catch (error) {
      showError(error);
    }
  };

  const handleUpdateField = async (
    row: RawMaterialRow,
    field: keyof RawMaterialRow,
    value: string | number
  ) => {
    try {
      await OfferRawMaterialCalculatedApi.update(
        row.offer_id,
        row.raw_material_id,
        { [field]: value }
      );
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  const handleUpdateRawMaterial = async (
    rawMaterialId: number,
    field: keyof RawMaterialRow,
    value: string | number
  ) => {
    try {
      await RawMaterialApi.updateRawMaterial(rawMaterialId, { [field]: value });
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  const handleChangeMaterial = async (
    row: RawMaterialRow,
    newMaterialId: number
  ) => {
    try {
      await OfferRawMaterialCalculatedApi.update(
        row.offer_id,
        row.raw_material_id,
        {
          raw_material_id: newMaterialId,
        }
      );
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  const formik = useFormik<any>({
    initialValues: {
      ...RawMaterialPricesTableInitialValues,
      ...(offerDetails
        ? {
            general_raw_material_price_total_overwritten:
              offerDetails.general_raw_material_price_total_overwritten ?? "",
            general_raw_material_purchase_discount:
              offerDetails.general_raw_material_purchase_discount ?? "",
            general_raw_material_price_total_calculated:
              offerDetails.general_raw_material_price_total_calculated ?? "",
          }
        : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    fetchRawMaterials();
    fetchOfferRawMaterials();
  }, [offerDetails?.id]);

  useEffect(() => {
    const totalPriceShare = rawMaterialRows.reduce(
      (sum, row) => sum + (parseFloat(String(row._price_share)) || 0),
      0
    );

    formik.setFieldValue(
      "general_raw_material_price_total_calculated",
      totalPriceShare.toFixed(2)
    );
  }, [rawMaterialRows]);

  return {
    formik,
    baseMaterials,
    rawMaterialRows,
    handleChangeMaterial,
    handleUpdateField,
    handleUpdateRawMaterial,
    setRawMaterialRows,
  };
};
