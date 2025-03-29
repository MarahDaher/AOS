import { FC } from "react";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import { CARD_HEIGHT } from "@utils/constantValue";
import FormInputSaveField from "@components/FormInputSaveField";
import { Divider } from "@mui/material";

const ProcessingPerPieceCard: FC = () => {
  return (
    <CardBox label="Konfektion (pro Stück)" height={CARD_HEIGHT}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_piece_hourly_rate"
            label="Stundensatz [€] / h"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_piece_runtime"
            label="Laufzeit / Stk [sek]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <FormInputSaveField
            name="piece_runtime_factor"
            label="Faktor"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="calculation_processing_piece_packaging"
            label="Verpackungszeit / Stk [sek]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 4 }}>
          <FormInputSaveField
            name="piece_packaging_factor"
            label="Faktor"
            type="number"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1, borderColor: "black" }} />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="piece_effort"
            label="Aufwand / Stk [sek]"
            disabled
          />
        </Grid>

        <Grid size={{ xs: 8 }}>
          <FormInputSaveField
            name="piece_cost"
            label="Kosten / Stk [€]"
            disabled
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default ProcessingPerPieceCard;
