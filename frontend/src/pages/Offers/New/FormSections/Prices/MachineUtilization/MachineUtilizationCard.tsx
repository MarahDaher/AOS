import CardBox from "@components/CardBox";
import FormIntField from "@components/FormInputs/FormIntField";
import Grid from "@mui/material/Grid2";
import MachineUtilizationTable from "./MachineUtilizationTable";
import { Box } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { mapMachineUtilizationData } from ".";
import { useOfferContext } from "@contexts/OfferProvider";
import { usePermissions } from "@hooks/usePermissions";

const MachineUtilizationCard = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("prices");

  const mappedData = offerDetails
    ? mapMachineUtilizationData(offerDetails).rows
    : [];

  const formik = useFormik({
    initialValues: {
      pricing_machine_utilization_annual_machine_capacity:
        offerDetails?.pricing_machine_utilization_annual_machine_capacity ?? "",
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
                <FormIntField
                  name="pricing_machine_utilization_annual_machine_capacity"
                  label="Maschinenkapazität [Std / Jahr]"
                  disabled={!isEditable}
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
