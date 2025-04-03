import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";

const PackagingSeriesCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();

  const formik = useFormik({
    initialValues: {
      packaging_type: offerDetails?.packaging_type ?? "",
      packaging_variant: offerDetails?.packaging_variant ?? "",
      packaging_length: offerDetails?.packaging_length ?? "",
      packaging_unit: offerDetails?.packaging_unit ?? "",
      packaging_quantity_per_box:
        offerDetails?.packaging_quantity_per_box ?? "",
      packaging_note: offerDetails?.packaging_note ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Verpackung Serie">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="packaging_type" label="Verpackungsart" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="packaging_variant"
              label="Verpackungsvariante"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="packaging_length" label="Länge" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="packaging_unit" label="Packeinheit" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="packaging_quantity_per_box"
              label="Menge / Palette-Box-Karton"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="packaging_note"
              label="Anmerkung"
              multiline
              minRows={3}
              fullWidth
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default PackagingSeriesCard;
