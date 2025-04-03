import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import { Typography } from "@mui/material";

const ToolingCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();

  const formik = useFormik({
    initialValues: {
      tool_cost: offerDetails?.tool_cost ?? "",
      tool_cost_type: offerDetails?.tool_cost_type ?? "anteilig",
      general_note: offerDetails?.general_note ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Werkzeug">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField name="tool_cost" label="Kosten" />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <Typography sx={{ mt: 3, fontWeight: "bold" }}>
              Kostenart: {formik.values.tool_cost_type}
            </Typography>
          </Grid>
        </Grid>
      </CardBox>

      <CardBox label="Bemerkung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="general_note"
              label=""
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

export default ToolingCard;
