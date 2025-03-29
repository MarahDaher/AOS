import { FC } from "react";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import { CARD_HEIGHT } from "@utils/constantValue";
import { Divider } from "@mui/material";

const ProcessingPerMeterCard: FC = () => {
  return (
    <CardBox label="Konfektion (pro Laufmeter)" height={CARD_HEIGHT}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_lfm_hourly_rate"
            label="Stundensatz [€] / h"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_lfm_runtime"
            label="Laufzeit / m [sek]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <FormInputSaveField
            name="lfm_runtime_factor"
            label="Faktor"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_lfm_packaging"
            label="Verpackungszeit / m [sek]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <FormInputSaveField
            name="lfm_packaging_factor"
            label="Faktor"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1, borderColor: "black" }} />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="lfm_effort"
            label="Aufwand / m [sek]"
            disabled
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField name="lfm_cost" label="Kosten / m [€]" disabled />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default ProcessingPerMeterCard;
