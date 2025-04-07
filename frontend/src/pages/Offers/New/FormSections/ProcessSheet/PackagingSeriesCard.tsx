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
      runningcard_packing_type: offerDetails?.runningcard_packing_type ?? "",
      runningcard_packing_variant:
        offerDetails?.runningcard_packing_variant ?? "",
      runningcard_packing_length:
        offerDetails?.runningcard_packing_length ?? "",
      runningcard_packing_packing_unit:
        offerDetails?.runningcard_packing_packing_unit ?? "",
      runningcard_packing_quantity:
        offerDetails?.runningcard_packing_quantity ?? "",
      runningcard_packing_description:
        offerDetails?.runningcard_packing_description ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Verpackung Serie">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_type"
              label="Verpackungsart"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_variant"
              label="Verpackungsvariante"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_length"
              label="Länge"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_packing_unit"
              label="Packeinheit"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_quantity"
              label="Menge / Palette-Box-Karton"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="runningcard_packing_description"
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
