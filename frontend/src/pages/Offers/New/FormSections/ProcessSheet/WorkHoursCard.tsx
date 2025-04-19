import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import { usePermissions } from "@hooks/usePermissions";

const WorkHoursCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");

  const formik = useFormik({
    initialValues: {
      runningcard_hourlyrecording_construction:
        offerDetails?.runningcard_hourlyrecording_construction ?? "",
      runningcard_hourlyrecording_toolwork:
        offerDetails?.runningcard_hourlyrecording_toolwork ?? "",
      runningcard_hourlyrecording_entry:
        offerDetails?.runningcard_hourlyrecording_entry ?? "",
      runningcard_hourlyrecording_entrystitches:
        offerDetails?.runningcard_hourlyrecording_entrystitches ?? "",
      runningcard_hourlyrecording_entrydriver_user_id:
        offerDetails?.runningcard_hourlyrecording_entrydriver_user_id ?? "",
      runningcard_hourlyrecording_toolmaker_user_id:
        offerDetails?.runningcard_hourlyrecording_toolmaker_user_id ?? "",
      _runningcard_hourlyrecording_total:
        offerDetails?._runningcard_hourlyrecording_total ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Stundenerfassung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_construction"
              label="Konstruktion"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_toolwork"
              label="Werkzeug- / Kalibrierungsbau"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_entry"
              label="Einfahren"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <FormInputSaveField
              name="_runningcard_hourlyrecording_total"
              label="Gesamt"
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_entrystitches"
              label="Einfahrstiche"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_entrydriver_user_id"
              label="Einfahrer"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_hourlyrecording_toolmaker_user_id"
              label="Werkzeugmacher"
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default WorkHoursCard;
