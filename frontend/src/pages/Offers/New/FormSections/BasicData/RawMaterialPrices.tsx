import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik, useFormikContext } from "formik";
import {
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import { RawMaterialApi } from "@api/raw-materials";
import { RawMaterialModel } from "@interfaces/RawMaterial.model";
import { RawMaterialPricesTableInitialValues } from "../../Index";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { useEffect, useState } from "react";
import { useOfferContext } from "@contexts/OfferProvider";

const RawMaterialPricesTable = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const { showError } = useApiErrorHandler();
  const { offerDetails } = useOfferContext();

  const [baseMaterials, setRawMaterials] = useState<RawMaterialModel[]>([]);
  const [rawMaterialRows, setRawMaterialRows] = useState<any[]>([]);

  const fetchOfferRawMaterials = async () => {
    if (!offerDetails?.id) return;
    try {
      const response =
        await OfferRawMaterialCalculatedApi.getRawMaterialCalculatedByOfferId(
          offerDetails.id
        );
      setRawMaterialRows(response);
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
    row: any,
    field: string,
    value: string | number
  ) => {
    try {
      await OfferRawMaterialCalculatedApi.update(
        row.offer_id,
        row.raw_material_id,
        {
          [field]: value,
        }
      );
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  const handleUpdateRawMaterial = async (
    rawMaterialId: number,
    field: string,
    value: string | number
  ) => {
    try {
      await RawMaterialApi.updateRawMaterial(rawMaterialId, { [field]: value });
      fetchOfferRawMaterials();
    } catch (error) {
      showError(error);
    }
  };

  const handleChangeMaterial = async (row: any, newMaterialId: number) => {
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

  const formik = useFormik({
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
    const totalPriceShare = rawMaterialRows.reduce(
      (sum, row) => sum + (parseFloat(row._price_share) || 0),
      0
    );

    setFieldValue(
      "general_raw_material_price_total_calculated",
      totalPriceShare.toFixed(2)
    );
  }, [rawMaterialRows, setFieldValue]);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Rohstoffpreise">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="end"
          mb={2}
        >
          <Grid size={{ xs: 2, md: 1.5 }}>
            <FormInputSaveField
              name="general_raw_material_purchase_discount"
              label="Skonto [%]"
              type="number"
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
              {rawMaterialRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      value={row.raw_material_id || ""}
                      onChange={(e) =>
                        handleChangeMaterial(row, Number(e.target.value))
                      }
                    >
                      {baseMaterials.map((m) => (
                        <MenuItem key={m.id} value={m.id}>
                          {m.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell>
                    <Typography>{row.type || "-"}</Typography>
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={row.supplier || ""}
                      onChange={(e) =>
                        setRawMaterialRows((prev) =>
                          prev.map((r) =>
                            r.offer_id === row.offer_id &&
                            r.raw_material_id === row.raw_material_id
                              ? { ...r, supplier: e.target.value }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(row, "supplier", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      type="number"
                      variant="standard"
                      value={row.share}
                      onChange={(e) =>
                        setRawMaterialRows((prev) =>
                          prev.map((r) =>
                            r.offer_id === row.offer_id &&
                            r.raw_material_id === row.raw_material_id
                              ? { ...r, share: Number(e.target.value) }
                              : r
                          )
                        )
                      }
                      onBlur={(e) =>
                        handleUpdateField(row, "share", Number(e.target.value))
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="month"
                      fullWidth
                      variant="standard"
                      value={
                        row.price_date
                          ? (() => {
                              if (row.price_date.includes(".")) {
                                // صيغة مثل "01.07.2025"
                                const parts = row.price_date.split(".");
                                if (parts.length === 3) {
                                  return `${parts[2]}-${parts[1]}`; // "YYYY-MM"
                                }
                              } else if (row.price_date.includes("-")) {
                                // صيغة مثل "2025-07-01"
                                return row.price_date.slice(0, 7); // "YYYY-MM"
                              }
                              return "";
                            })()
                          : ""
                      }
                      onChange={(e) =>
                        setRawMaterialRows((prev) => {
                          const updated = [...prev];
                          updated[index].price_date = `${e.target.value}-01`;
                          return updated;
                        })
                      }
                      onBlur={(e) =>
                        handleUpdateRawMaterial(
                          row.raw_material_id,
                          "price_date",
                          `${e.target.value}-01`
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      type="number"
                      variant="standard"
                      value={row.price}
                      onChange={(e) =>
                        setRawMaterialRows((prev) => {
                          const updated = [...prev];
                          updated[index].price = e.target.value;
                          return updated;
                        })
                      }
                      onBlur={(e) =>
                        handleUpdateRawMaterial(
                          row.raw_material_id,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Typography>{row._price_minus_discount ?? "-"}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>{row._price_share ?? "-"}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography>
                      {row._price_minus_discount_share ?? "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="end"
          mt={2}
        >
          <Grid size={{ xs: 3, md: 2 }}>
            <FormInputSaveField
              name="general_raw_material_price_total_overwritten"
              label="Rohstoffpreis gesamt [€]"
              type="number"
            />
            <Typography variant="caption">(überschrieben)</Typography>
          </Grid>

          <Grid size={{ xs: 3, md: 2 }}>
            <FormInputField
              name="general_raw_material_price_total_calculated"
              label="Rohstoffpreis gesamt / kg [€]"
              value={values.general_raw_material_price_total_calculated || ""}
              disabled
            />
            <Typography variant="caption">(berechnet)</Typography>
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default RawMaterialPricesTable;
