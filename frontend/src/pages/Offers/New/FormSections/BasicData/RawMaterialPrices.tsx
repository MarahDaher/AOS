import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import FormDatePicker from "@components/FormDatePicker";

const mockRawMaterials = [
  {
    id: 1,
    name: "Rohstoff A",
    type: "1592-533",
    price_per_kg: 24,
    price_date: "2024-11-01",
  },
  {
    id: 2,
    name: "Rohstoff B",
    type: "237-5316",
    price_per_kg: 37,
    price_date: "2024-11-01",
  },
  {
    id: 3,
    name: "Rohstoff C",
    type: "2624-545",
    price_per_kg: 24,
    price_date: "2025-01-01",
  },
  {
    id: 4,
    name: "Rohstoff D",
    type: "3035-8750",
    price_per_kg: 67,
    price_date: "2025-01-01",
  },
];

const rows = ["A", "B", "C", "D"];

const RawMaterialPricesTable = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  const getMaterialData = (id: number) =>
    mockRawMaterials.find((m) => m.id === id);

  return (
    <CardBox label="Rohstoffpreise">
      {/* Inputs before table */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="end"
        mb={2}
      >
        <Grid size={{ xs: 2, md: 1.5 }}>
          <FormInputField
            name="general_profile_description"
            label="Skonto [%]"
            value={values.general_raw_material_purchase_discount || ""}
            onChange={(e) =>
              setFieldValue(
                "general_raw_material_purchase_discount",
                Number(e.target.value)
              )
            }
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="250px">Rohstoff</TableCell>
              <TableCell width="150px">Typ</TableCell>
              <TableCell width="150px">Lieferant</TableCell>
              <TableCell width="150px">Anteil [%]</TableCell>
              <TableCell>Preisstand</TableCell>
              <TableCell>Preis [€]</TableCell>
              <TableCell>Preis - Sko [€]</TableCell>
              <TableCell>Preis (anteilig) [€]</TableCell>
              <TableCell>Preis - Sko (anteilig) [€]</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((letter) => {
              const idField = `general_raw_material${letter}_id`;
              const supplierField = `general_raw_material${letter}_supplier`;
              const shareField = `general_raw_material${letter}_share`;
              const priceField = `raw_material_${letter.toLowerCase()}_price`;
              const priceDateField = `raw_material_${letter.toLowerCase()}_price_date`;
              const discountPriceField = `raw_material_${letter.toLowerCase()}_discount_price`;
              const sharePriceField = `raw_material_${letter.toLowerCase()}_share_price`;
              const discountSharePriceField = `raw_material_${letter.toLowerCase()}_discount_share_price`;

              const material = getMaterialData(values[idField]);

              useEffect(() => {
                if (material) {
                  setFieldValue(priceField, material.price_per_kg);
                  setFieldValue(priceDateField, material.price_date);
                }
              }, [values[idField]]);

              return (
                <TableRow key={letter}>
                  <TableCell>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      value={values[idField] || ""}
                      onChange={(e) =>
                        setFieldValue(idField, Number(e.target.value))
                      }
                    >
                      {mockRawMaterials.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                          {m.name} ({m.type})
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell>
                    <Typography>{material?.type || "-"}</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={values[supplierField] || ""}
                      onChange={(e) =>
                        setFieldValue(supplierField, e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      type="number"
                      variant="standard"
                      value={values[shareField] || ""}
                      onChange={(e) =>
                        setFieldValue(shareField, Number(e.target.value))
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="month"
                      fullWidth
                      variant="standard"
                      value={
                        values[priceDateField]
                          ? values[priceDateField].slice(0, 7)
                          : ""
                      }
                      onChange={(e) => {
                        const selectedDate = new Date(`${e.target.value}-01`);
                        setFieldValue(
                          priceDateField,
                          selectedDate.toISOString()
                        );
                      }}
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          padding: 0,
                          fontWeight: 400,
                          fontSize: "0.875rem",
                          background: "transparent",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      type="number"
                      value={values[priceField] || ""}
                      onChange={(e) =>
                        setFieldValue(priceField, Number(e.target.value))
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Typography>{values[discountPriceField] || "-"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{values[sharePriceField] || "-"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {values[discountSharePriceField] || "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Inputs after table */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="end"
        mt={2}
      >
        <Grid
          size={{ xs: 3, md: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormInputField
            name="general_raw_material_price_total_overwritten"
            label="Rohstoffpreis gesamt [€]"
            value={values.general_raw_material_price_total_overwritten || ""}
            onChange={(e) =>
              setFieldValue(
                "general_raw_material_price_total_overwritten",
                Number(e.target.value)
              )
            }
          />
          <Typography variant="caption">(überschrieben)</Typography>
        </Grid>

        <Grid
          size={{ xs: 3, md: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormInputField
            name="general_raw_material_price_total_calculated"
            label="Rohstoffpreis gesamt [€]"
            value={values.general_raw_material_price_total_calculated || ""}
            onChange={(e) =>
              setFieldValue(
                "general_raw_material_price_total_calculated",
                Number(e.target.value)
              )
            }
          />
          <Typography variant="caption">(berechnet)</Typography>
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default RawMaterialPricesTable;
