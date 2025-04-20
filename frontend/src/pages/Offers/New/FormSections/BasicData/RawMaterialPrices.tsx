import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider } from "formik";
import { Typography, Button, Stack } from "@mui/material";
import { Table, TableContainer, TableBody, Paper } from "@mui/material";
import RawMaterialTableHead from "./RawMaterialSection/RawMaterialTableHead";
import RawMaterialRow from "./RawMaterialSection/RawMaterialRow";
import { useRawMaterialPricesTable } from "./RawMaterialSection/useRawMaterialPricesTable";
import AdditiveModal from "./RawMaterialSection/AdditiveModal";
import FormInputFallbackField from "@components/FormInputFallbackField";
import { formatNumberToGerman } from "@utils/formatNumbers";

const RawMaterialPrices = () => {
  const {
    formik,
    baseMaterials,
    selectedMaterial,
    openModal,
    setOpenModal,
    rawMaterialRows,
    isFieldEditable,
    handleOpenModal,
    handleChangeMaterial,
    handleUpdateField,
    setRawMaterialRows,
    fetchOfferRawMaterials,
    createEmptyRow,
    handleAddMaterial,
  } = useRawMaterialPricesTable();

  const totalPriceShare = rawMaterialRows.reduce(
    (sum, row) => sum + (parseFloat(String(row._price_share)) || 0),
    0
  );

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
              numeric
              onSaved={fetchOfferRawMaterials}
              disabled={
                !isFieldEditable("general_raw_material_purchase_discount")
              }
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table size="small">
            <RawMaterialTableHead />
            <TableBody>
              {rawMaterialRows.map((row, index) => (
                <RawMaterialRow
                  key={index}
                  row={row}
                  rawMaterialRows={rawMaterialRows}
                  baseMaterials={baseMaterials}
                  onChangeMaterial={handleChangeMaterial}
                  onUpdateField={handleUpdateField}
                  setRawMaterialRows={setRawMaterialRows}
                  onOpenModal={handleOpenModal}
                  handleAddMaterial={handleAddMaterial}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ➡️ Add "Add Row" Button */}
        <Grid container justifyContent="flex-end" mt={2}>
          <Grid>
            <Button
              disabled={
                !isFieldEditable("general_raw_material_purchase_discount")
              }
              variant="outlined"
              onClick={() =>
                setRawMaterialRows((prev) => [...prev, createEmptyRow()])
              }
            >
              Neue Zeile hinzufügen
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="end" mt={2}>
          <Grid size={{ xs: 3, md: 3 }}>
            <Stack spacing={0.5}>
              <FormInputFallbackField
                name="general_raw_material_price_total_overwritten"
                label="Rohstoffpreis gesamt / kg [€]"
                fallbackValue={totalPriceShare.toFixed(2)}
                disabled={
                  !isFieldEditable(
                    "general_raw_material_price_total_overwritten"
                  )
                }
              />
              <Typography variant="caption">(überschrieben)</Typography>

              <Button
                size="small"
                disabled={
                  !isFieldEditable(
                    "general_raw_material_price_total_overwritten"
                  )
                }
                variant="text"
                color="secondary"
                onClick={() =>
                  formik.setFieldValue(
                    "general_raw_material_price_total_overwritten",
                    ""
                  )
                }
                sx={{ alignSelf: "flex-start", textTransform: "none", pl: 0 }}
              >
                Zurücksetzen auf berechneten Wert
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 3, md: 2 }}>
            <FormInputField
              name="general_raw_material_price_total_calculated"
              label="Rohstoffpreis gesamt / kg [€]"
              value={formatNumberToGerman(totalPriceShare)}
              disabled
              numeric
            />
            <Typography variant="caption">(berechnet)</Typography>
          </Grid>
        </Grid>
      </CardBox>

      <AdditiveModal
        open={openModal}
        onClose={() => {
          fetchOfferRawMaterials();
          setOpenModal(false);
        }}
        materialName={selectedMaterial?.name || ""}
        initialValues={selectedMaterial?.additives || []}
        selectedMaterial={{
          offer_id: selectedMaterial?.offer_id,
          raw_material_id: selectedMaterial?.raw_material_id,
        }}
      />
    </FormikProvider>
  );
};

export default RawMaterialPrices;
