import CardBox from "@components/CardBox";
import FormFloatField from "@components/FormInputs/FormFloatField";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent } from "react";
import { useFieldEditable } from "@hooks/useFieldEditable";
import { useOfferContext } from "@contexts/OfferProvider";
import { usePermissions } from "@hooks/usePermissions";

const ToolingCard: FunctionComponent = () => {
  const { offerDetails, offerId } = useOfferContext();
  // Permissions
  const { isFieldEditable } = useFieldEditable(offerId!);
  const { canEdit } = usePermissions();
  const isEditable = canEdit("process_sheet");
  const formik = useFormik({
    initialValues: {
      calculation_working_tool_costs_customer:
        offerDetails?.calculation_working_tool_costs_customer ?? "",
      runningcard_tool_cost_type:
        offerDetails?.runningcard_tool_cost_type ?? "Anteilig",
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
            <FormFloatField
              name="calculation_working_tool_costs_customer"
              label="Kosten [€]"
              disabled
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
              disabled={
                !isFieldEditable("runningcard_tool_hint") || !isEditable
              }
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
