// 📁 useRawMaterialPricesTable.ts

import { useFormik } from "formik";
import { useEffect, useState, useCallback } from "react";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { RawMaterialApi } from "@api/raw-materials";
import { useOfferContext } from "@contexts/OfferProvider";
import { RawMaterialPricesTableInitialValues } from "@pages/Offers/New/Index";
import { BaseMaterial, RawMaterialRow } from "@interfaces/RawMaterial.model";
import { AdditiveApi } from "@api/additives";
import { useApiSuccessHandler } from "@hooks/useApiSuccessHandler";
import debounce from "lodash.debounce";

export const useRawMaterialPricesTable = () => {
  const { showError } = useApiErrorHandler();
  const { showSuccess } = useApiSuccessHandler();
  const { offerDetails } = useOfferContext();

  const [baseMaterials, setRawMaterials] = useState<BaseMaterial[]>([]);
  const [rawMaterialRows, setRawMaterialRows] = useState<RawMaterialRow[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const createEmptyRow = (): RawMaterialRow => ({
    offer_id: offerDetails?.id || 0,
    raw_material_id: 0,
    supplier: "",
    share: 0,
    price_date: "",
    price: 0,
    type: "",
    _additives_concatenated: "",
    _additives_price_sum: 0,
    _price_minus_discount: 0,
    _price_share: 0,
    _price_minus_discount_share: 0,
  });

  const fetchOfferRawMaterials = async () => {
    if (!offerDetails?.id) return;
    try {
      const res =
        await OfferRawMaterialCalculatedApi.getRawMaterialCalculatedByOfferId(
          offerDetails.id
        );

      const filledRows = [...res];
      while (filledRows.length < 4) {
        filledRows.push(createEmptyRow());
      }

      setRawMaterialRows(filledRows);
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

  const handleAddMaterial = async (newMaterialId: number) => {
    if (!offerDetails?.id) return;

    try {
      await OfferRawMaterialCalculatedApi.createRawMaterial({
        offer_id: offerDetails.id,
        raw_material_id: newMaterialId,
      });

      fetchOfferRawMaterials();
      showSuccess("Rohstoff erfolgreich hinzugefügt.");
    } catch (error) {
      showError(error);
    }
  };

  const debouncedUpdate = useCallback(
    debounce(
      async (
        offerId: number,
        rawMaterialId: number,
        field: keyof RawMaterialRow,
        value: any
      ) => {
        try {
          await OfferRawMaterialCalculatedApi.updateRawMaterial(
            offerId,
            rawMaterialId,
            { [field]: value }
          );
          showSuccess("Feld erfolgreich gespeichert.");
        } catch (error) {
          showError(error);
        }
      },
      500
    ),
    []
  );

  const handleUpdateField = (
    row: RawMaterialRow,
    field: keyof RawMaterialRow,
    value: string | number
  ) => {
    setRawMaterialRows((prev) =>
      prev.map((r) =>
        r.offer_id === row.offer_id && r.raw_material_id === row.raw_material_id
          ? { ...r, [field]: value }
          : r
      )
    );

    if (row.offer_id && row.raw_material_id) {
      debouncedUpdate(row.offer_id, row.raw_material_id, field, value);
    }
  };

  const handleChangeMaterial = async (
    row: RawMaterialRow,
    newMaterialId: number
  ) => {
    try {
      await OfferRawMaterialCalculatedApi.updateRawMaterial(
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

  const handleOpenModal = async (row: RawMaterialRow) => {
    try {
      const response = await AdditiveApi.getAdditivesForRawMaterial(
        row.offer_id,
        row.raw_material_id
      );
      const additives = response;
      setSelectedMaterial({
        ...row,
        additives: additives,
      });

      setOpenModal(true);
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
    return () => {
      debouncedUpdate.cancel();
    };
  }, []);

  return {
    formik,
    baseMaterials,
    rawMaterialRows,
    selectedMaterial,
    openModal,
    setOpenModal,
    handleAddMaterial,
    handleOpenModal,
    setSelectedMaterial,
    handleChangeMaterial,
    handleUpdateField,
    setRawMaterialRows,
    fetchOfferRawMaterials,
    createEmptyRow,
  };
};
