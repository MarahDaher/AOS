import CardBox from "@components/CardBox";
import FormDatePicker from "@components/FormDatePicker";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import NoteCard from "@components/NoteCard";

const SamplingCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();

  const mapInitialValues = (offer: any) => ({
    sampling_date: offer.sampling_date ?? "",
    sampling_quantity: offer.sampling_quantity ?? "",
    sampling_length: offer.sampling_length ?? "",
    sampling_packaging: offer.sampling_packaging ?? "",
    sampling_note: offer.sampling_note ?? "",
  });

  const formik = useFormik({
    initialValues: offerDetails
      ? mapInitialValues(offerDetails)
      : {
          sampling_date: "",
          sampling_quantity: "",
          sampling_length: "",
          sampling_packaging: "",
          sampling_note: "",
          quality_note: "",
          printing_note: "",
        },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Bemusterung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormDatePicker name="sampling_date" label="Termin Bemusterung" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="sampling_quantity" label="Menge" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="sampling_length" label="Länge" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="sampling_packaging" label="Verpackung" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="sampling_note" label="Hinweis" />
          </Grid>
        </Grid>
      </CardBox>

      <NoteCard field="quality_note" label="Qualitätshinweis" />

      <NoteCard field="printing_note" label="Bedruckung" />
    </FormikProvider>
  );
};

export default SamplingCard;
