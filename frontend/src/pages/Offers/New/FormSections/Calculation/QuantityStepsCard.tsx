// FormSections/Calculation/QuantityStepsCard.tsx
import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FC } from "react";

const QuantityStepsCard: FC = () => {
  return (
    <CardBox label="Staffelmengen" height={CARD_HEIGHT}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="calculation_quantityA"
            label="Menge A (Kalkulation) [m]"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="calculation_quantityB"
            label="Menge B [m]"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="calculation_quantityC"
            label="Menge C [m]"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="calculation_quantityD"
            label="Menge D [m]"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="calculation_quantityE"
            label="Menge E [m]"
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default QuantityStepsCard;
