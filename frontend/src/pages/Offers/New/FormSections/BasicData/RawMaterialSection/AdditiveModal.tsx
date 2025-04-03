// 📁 AdditiveModal.tsx
import BaseDialog from "@components/BaseDialog";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Delete } from "@mui/icons-material";

export interface AdditiveFormValue {
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
  onSubmit: (values: AdditiveFormValue[]) => void;
  initialValues: AdditiveFormValue[];
  materialName: string;
}

const AdditiveSchema = Yup.array(
  Yup.object().shape({
    name: Yup.string().required(),
    category: Yup.string().required(),
    price_per_kg: Yup.number().required().min(0),
    price_date: Yup.string().required(),
    dosage_percent: Yup.number().required().min(0),
    additional_price: Yup.number().required().min(0),
  })
);

const AdditiveModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  materialName,
}: AdditiveModalProps) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={AdditiveSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
        onClose();
      }}
    >
      {({ values, handleChange, handleBlur, submitForm }) => (
        <Form>
          <BaseDialog
            title={`Additive editieren für "${materialName}"`}
            open={open}
            onClose={onClose}
            hideActions={true}
            onSubmit={submitForm}
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
                          <TableCell>zzgl. Anteil Preis [%]</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField
                                name={`[${index}].name`}
                                variant="standard"
                                value={item.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name={`[${index}].category`}
                                variant="standard"
                                value={item.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                name={`[${index}].price_per_kg`}
                                variant="standard"
                                value={item.price_per_kg}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="date"
                                name={`[${index}].price_date`}
                                variant="standard"
                                value={item.price_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                name={`[${index}].dosage_percent`}
                                variant="standard"
                                value={item.dosage_percent}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                type="number"
                                name={`[${index}].additional_price`}
                                variant="standard"
                                value={item.additional_price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => remove(index)}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        push({
                          name: "",
                          category: "",
                          price_per_kg: 0,
                          price_date: "",
                          dosage_percent: 0,
                          additional_price: 0,
                        })
                      }
                    >
                      Additiv hinzufügen
                    </Button>
                  </Box>

                  <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                    <Button onClick={onClose}>Abbrechen</Button>
                    <Button
                      type="submit"
                      onClick={submitForm}
                      variant="contained"
                    >
                      Speichern
                    </Button>
                  </Box>
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
