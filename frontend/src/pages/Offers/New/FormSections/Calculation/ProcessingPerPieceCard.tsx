import CardBox from "@components/CardBox";
import FormFloatField from "@components/FormInputs/FormFloatField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { Divider } from "@mui/material";
import { FC } from "react";
import { FormikProvider, useFormik } from "formik";
import {
  mapPerPieceInitialValuesInitialValues,
  ProcessingPerPieceInitialValues,
} from "../../Index";
import { useOfferContext } from "@contexts/OfferProvider";
import { usePermissions } from "@hooks/usePermissions";

const ProcessingPerPieceCard: FC = () => {
  // Hooks
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("calculation");

  const formik = useFormik({
    initialValues: {
      ...ProcessingPerPieceInitialValues,
      ...(offerDetails
        ? mapPerPieceInitialValuesInitialValues(offerDetails)
        : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Konfektion (pro Stück)" height={CARD_HEIGHT}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 8 }}>
            <FormFloatField
              name="calculation_processing_piece_hourly_rate"
              label="Stundensatz [€] / h"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormFloatField
              name="calculation_processing_piece_runtime"
              label="Laufzeit / Stk [sek]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormFloatField
              name="calculation_processing_piece_runtime_factor"
              label="Faktor"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormFloatField
              name="calculation_processing_piece_packing_time"
              label="Verpackungszeit / Stk [sek]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <FormFloatField
              name="calculation_processing_piece_packing_time_factor"
              label="Faktor"
              disabled={!isEditable}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1, borderColor: "black" }} />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormFloatField
              name="_calculation_processing_piece_expense"
              label="Aufwand / Stk [sek]"
              disabled
            />
          </Grid>

          <Grid size={{ xs: 8 }}>
            <FormFloatField
              name="_calculation_processing_piece_costs"
              label="Kosten / Stk [€]"
              disabled
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default ProcessingPerPieceCard;
