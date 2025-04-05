import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";
import DemandCard from "../FormSections/Prices/DemandCard";
import CostOverviewCard from "../FormSections/Prices/CostOverviewCard";
import FinalPriceContainer from "../FormSections/Prices/FinalPriceContainer";
import TieredPriceCalculationCard from "../FormSections/Prices/TieredPriceCalculation/TieredPriceCalculationCard";
import MachineUtilizationCard from "../FormSections/Prices/MachineUtilization/MachineUtilizationCard";
import PieceLengthPricesCard from "../FormSections/Prices/PieceLengthPrices/PieceLengthPricesCard";

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

      {/* Row 3 */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <FinalPriceContainer />
        </Grid>
      </Grid>

      {/* Row 4 */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <TieredPriceCalculationCard />
        </Grid>
      </Grid>

      {/* Row 5 */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <MachineUtilizationCard />
        </Grid>
      </Grid>

      {/* Row 6 */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <PieceLengthPricesCard />
        </Grid>
      </Grid>
    </>
  );
};

export default PricesTab;
