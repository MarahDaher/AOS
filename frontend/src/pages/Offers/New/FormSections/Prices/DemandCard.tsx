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
            name="annual_demand_estimated"
            label="Jahresbedarf, geschätzt [m]"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <FormInputSaveField
            name="annual_revenue_estimated"
            label="Jahresumsatz, geschätzt [€]"
            type="number"
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default DemandCard;
