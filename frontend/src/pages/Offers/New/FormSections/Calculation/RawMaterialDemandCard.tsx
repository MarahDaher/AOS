import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";
import { Divider } from "@mui/material";
import { CARD_HEIGHT } from "@utils/constantValue";

const RawMaterialDemandCard: FC = () => {
  return (
    <CardBox label="Flächen - Rohstoffbedarf" height={CARD_HEIGHT}>
      <Grid container spacing={1} size={{ xs: 12, md: 12 }}>
        {[1, 2, 3, 4].map((index) => (
          <Grid container spacing={2} key={index} pt={index !== 1 ? "4px" : 0}>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormInputSaveField
                name={`raw_materials.${index - 1}.absolut_demand`}
                label={`Rohstoff ${index} [mm²]`}
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <FormInputSaveField
                name={`raw_materials.${index - 1}.share`}
                label={`Rohstoff ${index} [%]`}
                type="number"
              />
            </Grid>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 1, borderColor: "black" }} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormInputSaveField
            name="raw_materials_total"
            label="Gesamt [mm²]"
            disabled
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default RawMaterialDemandCard;
