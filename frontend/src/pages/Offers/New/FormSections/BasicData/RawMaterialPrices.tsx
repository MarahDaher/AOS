// 📁 RawMaterialPricesTable.tsx
import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider } from "formik";
import { Typography } from "@mui/material";
import { Table, TableContainer, TableBody, Paper } from "@mui/material";
import RawMaterialTableHead from "./RawMaterialSection/RawMaterialTableHead";
import RawMaterialRow from "./RawMaterialSection/RawMaterialRow";
import { useRawMaterialPricesTable } from "./RawMaterialSection/useRawMaterialPricesTable";
import AdditiveModal from "./RawMaterialSection/AdditiveModal";

const RawMaterialPrices = () => {
  const {
    formik,
    baseMaterials,
    selectedMaterial,
    openModal,
    setOpenModal,
    rawMaterialRows,
    handleOpenModal,
    handleChangeMaterial,
    handleUpdateField,
    setRawMaterialRows,
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
              type="number"
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
                  baseMaterials={baseMaterials}
                  onChangeMaterial={handleChangeMaterial}
                  onUpdateField={handleUpdateField}
                  setRawMaterialRows={setRawMaterialRows}
                  onOpenModal={handleOpenModal}
                />
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
              value={totalPriceShare.toFixed(2)}
              disabled
            />
            <Typography variant="caption">(berechnet)</Typography>
          </Grid>
        </Grid>
      </CardBox>

      <AdditiveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(values) => {
          console.log("Saving additives:", values);
          setOpenModal(false);
        }}
        materialName={selectedMaterial?.name || ""}
        initialValues={selectedMaterial?.additives || []}
      />
    </FormikProvider>
  );
};

export default RawMaterialPrices;
