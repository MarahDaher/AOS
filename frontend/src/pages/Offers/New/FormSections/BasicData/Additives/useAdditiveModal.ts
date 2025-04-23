import { useEffect, useState } from "react";
import { AdditiveApi } from "@api/additives";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { useApiSuccessHandler } from "@hooks/useApiSuccessHandler";
import { formatNumberToGerman, parseGermanNumber } from "@utils/formatNumbers";

interface AdditiveFormValue {
  id: number;
  name: string;
  category: string;
  price: number;
  price_date: string;
  share: number;
}

interface SelectedMaterial {
  offer_id: number;
  raw_material_id: number;
}

type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean
) => void;

export const useAdditiveModal = (
  initialValues: { additives: AdditiveFormValue[] },
  selectedMaterial: SelectedMaterial
) => {
  const { showError } = useApiErrorHandler();
  const { showSuccess } = useApiSuccessHandler();

  const [additivesList, setAdditivesList] = useState<AdditiveFormValue[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{
    id: number;
    index: number;
  } | null>(null);
  const [formattedPriceInputs, setFormattedPriceInputs] = useState<
    Record<number, string>
  >({});
  const [formattedShareInputs, setFormattedShareInputs] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    const priceMap: Record<number, string> = {};
    const shareMap: Record<number, string> = {};

    initialValues.additives.forEach((item, i) => {
      priceMap[i] = item.price ? formatNumberToGerman(item.price) : "";
      shareMap[i] = item.share ? formatNumberToGerman(item.share) : "";
    });

    setFormattedPriceInputs(priceMap);
    setFormattedShareInputs(shareMap);
  }, [initialValues]);

  useEffect(() => {
    const fetchAdditives = async () => {
      try {
        const res = await AdditiveApi.getAll();
        setAdditivesList(res);
      } catch (err) {
        showError(err);
      }
    };
    fetchAdditives();
  }, []);

  const handleValueBlur = async (
    type: "price" | "share",
    index: number,
    value: string,
    setFieldValue: SetFieldValue,
    item: AdditiveFormValue
  ) => {
    const parsed = parseGermanNumber(value);
    if (parsed !== null) {
      setFieldValue(`additives.${index}.${type}`, parsed);

      const formatter =
        type === "price" ? setFormattedPriceInputs : setFormattedShareInputs;

      formatter((prev) => ({
        ...prev,
        [index]: formatNumberToGerman(parsed),
      }));

      try {
        await AdditiveApi.updateAdditiveOffer({
          offer_id: selectedMaterial.offer_id,
          raw_material_id: selectedMaterial.raw_material_id,
          additives_id: item.id,
          [type]: parsed,
        });
        showSuccess(
          `${type === "price" ? "Preis" : "Prozentsatz"} wurde aktualisiert`
        );
      } catch (err) {
        showError(err);
      }
    }
  };

  const handleAdditiveAdd = async (
    id: number,
    push: (obj: AdditiveFormValue) => void,
    values: { additives: AdditiveFormValue[] }
  ) => {
    const selected = additivesList.find((a) => a.id === id);
    if (!selected) return;

    try {
      const res = await AdditiveApi.addAdditiveToRawMaterial({
        offer_id: selectedMaterial.offer_id,
        raw_material_id: selectedMaterial.raw_material_id,
        additives_id: id,
      });

      const index = values.additives.length;

      push({
        id: res.id,
        name: res.name,
        category: res.category,
        price: res.price,
        price_date: res.price_date,
        share: res.share ?? 0,
      });

      setFormattedPriceInputs((prev) => ({
        ...prev,
        [index]: formatNumberToGerman(res.price),
      }));
      setFormattedShareInputs((prev) => ({
        ...prev,
        [index]: formatNumberToGerman(res.share ?? 0),
      }));
    } catch (err) {
      showError(err);
    }
  };

  const handleAdditiveDelete = async (remove: (index: number) => void) => {
    if (!deletingItem) return;
    try {
      await AdditiveApi.deleteAdditiveFromRawMaterial({
        offer_id: selectedMaterial.offer_id,
        raw_material_id: selectedMaterial.raw_material_id,
        additives_id: deletingItem.id,
      });
      remove(deletingItem.index);
    } catch (err) {
      showError(err);
    } finally {
      setConfirmDeleteOpen(false);
      setDeletingItem(null);
    }
  };

  return {
    additivesList,
    formattedPriceInputs,
    formattedShareInputs,
    confirmDeleteOpen,
    setFormattedPriceInputs,
    setFormattedShareInputs,
    setConfirmDeleteOpen,
    setDeletingItem,
    handleValueBlur,
    handleAdditiveAdd,
    handleAdditiveDelete,
  };
};
