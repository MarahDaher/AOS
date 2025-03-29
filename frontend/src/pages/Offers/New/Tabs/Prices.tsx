import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";
import DemandCard from "../FormSections/Prices/DemandCard";
import CostOverviewCard from "../FormSections/Prices/CostOverviewCard";

interface PricesTabProps {}

const PricesTab: FunctionComponent<PricesTabProps> = () => {
  return (
    <>
      <Grid container spacing={1}>
        {/* Row 1 */}
        <Grid size={{ xs: 12, md: 12 }}>
          <DemandCard />
        </Grid>
      </Grid>

      {/* Row 2 */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <CostOverviewCard />
        </Grid>
      </Grid>
    </>
  );
};

export default PricesTab;
