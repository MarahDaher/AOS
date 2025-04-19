import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { FunctionComponent } from "react";
import { usePermissions } from "@hooks/usePermissions";

const ToolingCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");

  const formik = useFormik({
    initialValues: {
      runningcard_tool_costs: offerDetails?.runningcard_tool_costs ?? "",
      runningcard_tool_cost_type:
        offerDetails?.runningcard_tool_cost_type ?? "anteilig",
      runningcard_tool_hint: offerDetails?.runningcard_tool_hint ?? "",
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Werkzeug">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_tool_costs"
              label="Kosten"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2.4 }}>
            <FormInputSaveField
              name="runningcard_tool_cost_type"
              label="Kostenart"
              disabled
            />
          </Grid>
        </Grid>
      </CardBox>

      <CardBox label="Bemerkung">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="runningcard_tool_hint"
              label=""
              multiline
              disabled={!isEditable}
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
