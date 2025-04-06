import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import MachineUtilizationTable from "./MachineUtilizationTable";
import { FormikProvider, useFormik } from "formik";
import FormInputSaveField from "@components/FormInputSaveField";
import { Box } from "@mui/material";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapMachineUtilizationData } from ".";

const MachineUtilizationCard = () => {
  const { offerDetails } = useOfferContext();

  const mappedData = offerDetails
    ? mapMachineUtilizationData(offerDetails).rows
    : [];

  const formik = useFormik({
    initialValues: {
      pricing_machine_utilization_annual_machine_capacity: 0,
    },
    onSubmit: () => {},
  });

  return (
    <>
      <CardBox label="Maschinenauslastung">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <MachineUtilizationTable data={mappedData} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}></Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <FormikProvider value={formik}>
              <Box display="flex" justifyContent="end">
                <FormInputSaveField
                  name="pricing_machine_utilization_annual_machine_capacity"
                  label="Maschinenkapazität [Std / Jahr]"
                  type="number"
                />
              </Box>
            </FormikProvider>
          </Grid>
        </Grid>
      </CardBox>
    </>
  );
};
export default MachineUtilizationCard;
