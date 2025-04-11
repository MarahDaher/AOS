import BaseDialog from "@components/BaseDialog";
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
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Close, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AdditiveApi } from "@api/additives";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import ConfirmationDialog from "@components/ConfirmationDialog";

export interface AdditiveFormValue {
  id: number;
  name: string;
  category: string;
  price_per_kg: number;
  price_date: string;
  dosage_percent: number;
  additional_price: number;
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
      price_per_kg: Yup.number().required().min(0),
      price_date: Yup.string().required(),
      dosage_percent: Yup.number().required().min(0),
      additional_price: Yup.number().required().min(0),
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
  const { showError } = useApiErrorHandler();
  // State
  const [additivesList, setAdditivesList] = useState<any[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{
    id: number;
    index: number;
  } | null>(null);

  const fetchAdditives = async () => {
    try {
      const res = await AdditiveApi.getAll();
      setAdditivesList(res);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    fetchAdditives();
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={AdditiveSchema}
        onSubmit={() => {}}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <BaseDialog
              title={`Additive editieren für "${materialName}"`}
              open={open}
              onClose={onClose}
              hideActions={true}
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
                                <Typography>{item.price_per_kg}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{item.price_date}</Typography>
                              </TableCell>
                              <TableCell>
                                <TextField
                                  type="number"
                                  name={`additives.${index}.dosage_percent`}
                                  variant="standard"
                                  value={item.dosage_percent}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton
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

                    {/* Dropdown for adding new additive */}
                    <Box mt={2} display="flex" justifyContent="center" gap={1}>
                      <TextField
                        variant="filled"
                        select
                        sx={{ width: "50%" }}
                        label="Additiv hinzufügen"
                        value=""
                        onChange={async (e) => {
                          const additiveId = Number(e.target.value);
                          const selectedAdditive = additivesList.find(
                            (a) => a.id === additiveId
                          );

                          if (selectedAdditive) {
                            try {
                              const res =
                                await AdditiveApi.addAdditiveToRawMaterial({
                                  offer_id: selectedMaterial.offer_id,
                                  raw_material_id:
                                    selectedMaterial.raw_material_id,
                                  additives_id: additiveId,
                                });

                              const newAdditive = res;

                              push({
                                id: newAdditive.id,
                                name: newAdditive.name,
                                category: newAdditive.category,
                                price_per_kg: newAdditive.price_per_kg,
                                price_date: newAdditive.price_date,
                                dosage_percent: newAdditive.share ?? 0,
                                additional_price: 0,
                              });
                            } catch (error) {
                              showError(error);
                            }
                          }
                        }}
                      >
                        {(() => {
                          const availableAdditives = additivesList.filter(
                            (additive) =>
                              !values.additives.some(
                                (added) => added.id === additive.id
                              )
                          );

                          if (availableAdditives.length === 0) {
                            return (
                              <MenuItem disabled value="">
                                Alle Additive wurden hinzugefügt
                              </MenuItem>
                            );
                          }

                          return availableAdditives.map((additive) => (
                            <MenuItem key={additive.id} value={additive.id}>
                              {additive.name} ({additive.category})
                            </MenuItem>
                          ));
                        })()}
                      </TextField>
                    </Box>

                    <ConfirmationDialog
                      open={confirmDeleteOpen}
                      onClose={() => setConfirmDeleteOpen(false)}
                      onConfirm={async () => {
                        if (deletingItem) {
                          try {
                            await AdditiveApi.deleteAdditiveFromRawMaterial({
                              offer_id: selectedMaterial.offer_id,
                              raw_material_id: selectedMaterial.raw_material_id,
                              additives_id: deletingItem.id,
                            });

                            remove(deletingItem.index);
                          } catch (error) {
                            showError(error);
                          } finally {
                            setConfirmDeleteOpen(false);
                            setDeletingItem(null);
                          }
                        }
                      }}
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
    </>
  );
};

export default AdditiveModal;
