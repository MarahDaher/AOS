import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";

const WorkHoursCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();

  const formik = useFormik({
    initialValues: {
      hours_construction: offerDetails?.hours_construction ?? "",
      hours_tool_calibration: offerDetails?.hours_tool_calibration ?? "",
      hours_entry: offerDetails?.hours_entry ?? "",
      hours_entry_lines: offerDetails?.hours_entry_lines ?? "",
      hours_driver: offerDetails?.hours_driver ?? "",
      hours_toolmaker: offerDetails?.hours_toolmaker ?? "",
      hours_total: offerDetails?.hours_total ?? "",
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
              name="hours_construction"
              label="Konstruktion"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="hours_tool_calibration"
              label="Werkzeug- / Kalibrierungsbau"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="hours_entry" label="Einfahren" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="hours_total" label="Gesamt" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="hours_entry_lines"
              label="Einfahrstiche"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="hours_driver" label="Einfahrer" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="hours_toolmaker" label="Werkzeugmacher" />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default WorkHoursCard;
