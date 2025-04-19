import { useOfferContext } from "@contexts/OfferProvider";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import { usePermissions } from "@hooks/usePermissions";

const ProcessingCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");

  const mapInitialValues = (offer: any) => ({
    runningcard_extrusion_speed_IST:
      offer.runningcard_extrusion_speed_IST ?? "",
    runningcard_profile_weight_IST: offer.runningcard_profile_weight_IST ?? "",
  });

  const formik = useFormik({
    initialValues: offerDetails
      ? mapInitialValues(offerDetails)
      : {
          runningcard_extrusion_speed_IST: "",
        },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <>
      <FormikProvider value={formik}>
        <CardBox label="Verarbeitung">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <FormInputSaveField
                name="runningcard_extrusion_speed_IST"
                label="Geschwindigkeit Eingefahren (IST) [m/min]"
                disabled={!isEditable}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2.4 }}>
              <FormInputSaveField
                name="runningcard_profile_weight_IST"
                label="Metergewicht Eingefahren (IST) [g/m]"
                disabled={!isEditable}
              />
            </Grid>
          </Grid>
        </CardBox>
      </FormikProvider>
    </>
  );
};

export default ProcessingCard;
