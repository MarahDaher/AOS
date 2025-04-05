import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";

const DemandCard: FC = () => {
  return (
    <CardBox label="Bedarf">
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 2 }}>
          <FormInputSaveField
            name="calculation_working_annual_requirement_estimated"
            label="Jahresbedarf, geschätzt [m]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <FormInputSaveField
            name="_pricing_requirement_annual_sales"
            label="Jahresumsatz, geschätzt [€]"
            type="number"
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default DemandCard;
