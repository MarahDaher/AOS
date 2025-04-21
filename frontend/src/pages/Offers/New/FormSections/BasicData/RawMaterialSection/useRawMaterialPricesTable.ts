import debounce from "lodash.debounce";
import { AdditiveApi } from "@api/additives";
import { BaseMaterial, RawMaterialRow } from "@interfaces/RawMaterial.model";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { RawMaterialApi } from "@api/raw-materials";
import { RawMaterialPricesTableInitialValues } from "@pages/Offers/New/Index";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { useApiSuccessHandler } from "@hooks/useApiSuccessHandler";
import { useCallback, useEffect, useState } from "react";
import { useEditableFields } from "@hooks/useEditableFields";
import { useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { useRawMaterials } from "@hooks/useRawMaterialsDemand";

export const useRawMaterialPricesTable = () => {
  const { showError } = useApiErrorHandler();
  const { showSuccess } = useApiSuccessHandler();

  // Hooks
  const { offerDetails, offerId } = useOfferContext();
  const { updateRawDemanMaterial } = useRawMaterials(offerId!);

  // Permissions
  const { data: editableFields = [] } = useEditableFields(offerId!);

  const isFieldEditable = (fieldName: string) =>
    editableFields.includes(fieldName);

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

      if (res.length === 0) {
        setRawMaterialRows([createEmptyRow()]);
      } else {
        const filledRows = [...res];
        while (filledRows.length < 4) {
          filledRows.push(createEmptyRow());
        }
        setRawMaterialRows(filledRows);
      }
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
      const createdMaterial =
        await OfferRawMaterialCalculatedApi.createRawMaterial({
          offer_id: offerDetails.id,
          raw_material_id: newMaterialId,
        });

      setRawMaterialRows((prev) =>
        prev.map((r) =>
          r.raw_material_id === 0
            ? {
                ...createdMaterial,
                share: r.share,
                supplier: r.supplier,
                price_date: r.price_date,
                price: r.price,
                type: r.type,
              }
            : r
        )
      );

      showSuccess("Rohstoff erfolgreich hinzugefügt.");

      // (Optional) لو بدك تتأكد انه كل شي تمام بعد شوي
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          await fetchOfferRawMaterials();
          showSuccess("Feld erfolgreich gespeichert.");
        } catch (error) {
          showError(error);
        }
      },
      500
    ),
    [fetchOfferRawMaterials] // Also important to pass it as dependency
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
    updateRawDemanMaterial,
    isFieldEditable,
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
