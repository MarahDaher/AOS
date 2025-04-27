import { useEditableFields } from "./useEditableFields";

export const useFieldEditable = (offerId?: number) => {
  const { data: editableFields = [] } = useEditableFields(offerId);

  const isFieldEditable = (fieldName: string) => {
    if (!editableFields || editableFields.length === 0) {
      return false;
    }
    return editableFields.includes(fieldName);
  };

  return { isFieldEditable };
};
