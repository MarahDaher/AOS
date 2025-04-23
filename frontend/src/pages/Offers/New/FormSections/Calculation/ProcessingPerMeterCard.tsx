import { FC } from "react";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import { CARD_HEIGHT } from "@utils/constantValue";
import { Divider } from "@mui/material";
import { useOfferContext } from "@contexts/OfferProvider";
import { FormikProvider, useFormik } from "formik";
import { mapInitialValues, ProcessingPerMeterInitialValues } from "../../Index";
import { usePermissions } from "@hooks/usePermissions";

const ProcessingPerMeterCard: FC = () => {
  // Hooks
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("calculation");

  const formik = useFormik({
    initialValues: {
      ...ProcessingPerMeterInitialValues,
      ...(offerDetails ? mapInitialValues(offerDetails) : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Konfektion (pro Laufmeter)" height={CARD_HEIGHT}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 8 }}>
            <FormInputSaveField
              name="calculation_processing_lfm_hourly_rate"
              label="Stundensatz [€] / h"
              numeric
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormInputSaveField
              name="calculation_processing_lfm_runtime"
              label="Laufzeit / m [sek]"
              numeric
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormInputSaveField
              name="calculation_processing_lfm_runtime_factor"
              label="Faktor"
              type="number"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormInputSaveField
              name="calculation_processing_lfm_packing_time"
              label="Verpackungszeit / m [sek]"
              numeric
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormInputSaveField
              name="calculation_processing_lfm_packing_time_factor"
              label="Faktor"
              type="number"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1, borderColor: "black" }} />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormInputSaveField
              name="_calculation_processing_lfm_expense"
              label="Aufwand / m [sek]"
              disabled
              numeric
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormInputSaveField
              name="_calculation_processing_lfm_costs"
              label="Kosten / m [€]"
              disabled
              numeric
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default ProcessingPerMeterCard;
