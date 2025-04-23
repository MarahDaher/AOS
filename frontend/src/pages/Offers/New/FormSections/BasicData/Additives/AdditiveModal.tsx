// components/AdditiveModal.tsx
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";
import BaseDialog from "@components/BaseDialog";
import ConfirmationDialog from "@components/ConfirmationDialog";
import { useEditableFields } from "@hooks/useEditableFields";
import { useOfferContext } from "@contexts/OfferProvider";
import { useAdditiveModal } from "./useAdditiveModal";

export interface AdditiveFormValue {
  id: number;
  name: string;
  category: string;
  price: number;
  price_date: string;
  share: number;
}

export interface AdditiveModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: { additives: AdditiveFormValue[] };
  materialName: string;
  selectedMaterial: {
    offer_id: number;
    raw_material_id: number;
  };
}

const AdditiveSchema = Yup.object({
  additives: Yup.array(
    Yup.object().shape({
      name: Yup.string().required(),
      category: Yup.string().required(),
      price: Yup.number().required().min(0),
      price_date: Yup.string().required(),
      share: Yup.number().required().min(0),
    })
  ),
});

const AdditiveModal = ({
  open,
  onClose,
  initialValues,
  materialName,
  selectedMaterial,
}: AdditiveModalProps) => {
  const { offerId } = useOfferContext();
  const { data: editableFields = [] } = useEditableFields(offerId!);
  const isFieldEditable = (field: string) => editableFields.includes(field);

  const {
    additivesList,
    formattedPriceInputs,
    formattedShareInputs,
    setFormattedPriceInputs,
    setFormattedShareInputs,
    confirmDeleteOpen,
    setConfirmDeleteOpen,
    setDeletingItem,
    handleValueBlur,
    handleAdditiveAdd,
    handleAdditiveDelete,
  } = useAdditiveModal(initialValues, selectedMaterial);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={AdditiveSchema}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <BaseDialog
            title={`Additive editieren für "${materialName}"`}
            open={open}
            onClose={onClose}
            hideActions
            maxWidth="md"
            actionButton={
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            }
          >
            <FieldArray name="additives">
              {({ remove, push }) => (
                <>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Additiv</TableCell>
                          <TableCell>Kategorie</TableCell>
                          <TableCell>Preis / kg [€]</TableCell>
                          <TableCell>Preisstand</TableCell>
                          <TableCell>Prozentsatz (Dosierung)</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.additives.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography>{item.name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{item.category}</Typography>
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                variant="standard"
                                value={formattedPriceInputs[index] ?? ""}
                                onChange={(e) => {
                                  const input = e.target.value.replace(
                                    /[^0-9,.-]/g,
                                    ""
                                  );
                                  setFormattedPriceInputs((prev) => ({
                                    ...prev,
                                    [index]: input,
                                  }));
                                }}
                                onBlur={() =>
                                  handleValueBlur(
                                    "price",
                                    index,
                                    formattedPriceInputs[index],
                                    setFieldValue,
                                    item
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Typography>{item.price_date}</Typography>
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                variant="standard"
                                value={formattedShareInputs[index] ?? ""}
                                onChange={(e) => {
                                  const input = e.target.value.replace(
                                    /[^0-9,.-]/g,
                                    ""
                                  );
                                  setFormattedShareInputs((prev) => ({
                                    ...prev,
                                    [index]: input,
                                  }));
                                }}
                                onBlur={() =>
                                  handleValueBlur(
                                    "share",
                                    index,
                                    formattedShareInputs[index],
                                    setFieldValue,
                                    item
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton
                                disabled={!isFieldEditable("dosage_percent")}
                                onClick={() => {
                                  setDeletingItem({ id: item.id, index });
                                  setConfirmDeleteOpen(true);
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box mt={2} display="flex" justifyContent="center" gap={1}>
                    <TextField
                      variant="filled"
                      select
                      disabled={!isFieldEditable("dosage_percent")}
                      sx={{ width: "50%" }}
                      label="Additiv hinzufügen"
                      value=""
                      onChange={(e) =>
                        handleAdditiveAdd(Number(e.target.value), push, values)
                      }
                    >
                      {(() => {
                        const available = additivesList.filter(
                          (additive) =>
                            !values.additives.some((a) => a.id === additive.id)
                        );
                        return available.length === 0 ? (
                          <MenuItem disabled value="">
                            Alle Additive wurden hinzugefügt
                          </MenuItem>
                        ) : (
                          available.map((a) => (
                            <MenuItem key={a.id} value={a.id}>
                              {a.name} ({a.category})
                            </MenuItem>
                          ))
                        );
                      })()}
                    </TextField>
                  </Box>

                  <ConfirmationDialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmDeleteOpen(false)}
                    onConfirm={() => handleAdditiveDelete(remove)}
                    title="Löschen bestätigen"
                    message="Möchten Sie dieses Additiv wirklich löschen?"
                    confirmText="Ja, löschen"
                    cancelText="Abbrechen"
                  />
                </>
              )}
            </FieldArray>
          </BaseDialog>
        </Form>
      )}
    </Formik>
  );
};

export default AdditiveModal;
