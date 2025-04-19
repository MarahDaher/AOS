import CardBox from "@components/CardBox";
import FormDatePicker from "@components/FormDatePicker";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import NoteCard from "@components/NoteCard";
import { usePermissions } from "@hooks/usePermissions";

const SamplingCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");

  const mapInitialValues = (offer: any) => ({
    runningcard_sampling_date: offer.runningcard_sampling_date ?? "",
    runningcard_sampling_quantity: offer.runningcard_sampling_quantity ?? "",
    runningcard_sampling_length: offer.runningcard_sampling_length ?? "",
    runningcard_sampling_packing: offer.runningcard_sampling_packing ?? "",
    runningcard_sampling_indication:
      offer.runningcard_sampling_indication ?? "",
    runningcard_qualitity_indication:
      offer.runningcard_qualitity_indication ?? "",
    runningcard_printing: offer.runningcard_printing ?? "",
  });

  const formik = useFormik({
    initialValues: offerDetails
      ? mapInitialValues(offerDetails)
      : {
          runningcard_sampling_date: "",
          runningcard_sampling_quantity: "",
          runningcard_sampling_length: "",
          runningcard_sampling_packing: "",
          runningcard_sampling_indication: "",
          runningcard_qualitity_indication: "",
          runningcard_printing: "",
        },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Bemusterung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormDatePicker
              name="runningcard_sampling_date"
              label="Termin Bemusterung"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_sampling_quantity"
              label="Menge"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_sampling_length"
              label="Länge"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_sampling_packing"
              label="Verpackung"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_sampling_indication"
              label="Hinweis"
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
      </CardBox>

      <NoteCard
        field="runningcard_qualitity_indication"
        label="Qualitätshinweis"
      />

      <NoteCard field="runningcard_printing" label="Bedruckung" />
    </FormikProvider>
  );
};

export default SamplingCard;
