import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import { usePermissions } from "@hooks/usePermissions";

const PackagingSeriesCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");

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
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_variant"
              label="Verpackungsvariante"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_length"
              label="Länge"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_packing_unit"
              label="Packeinheit"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_packing_quantity"
              label="Menge / Palette-Box-Karton"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="runningcard_packing_description"
              label="Anmerkung"
              disabled={!isEditable}
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
