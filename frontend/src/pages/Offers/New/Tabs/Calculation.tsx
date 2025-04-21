import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";
import QuantityStepsCard from "../FormSections/Calculation/QuantityStepsCard";
import ProcessingPerMeterCard from "../FormSections/Calculation/ProcessingPerMeterCard";
import ProcessingPerPieceCard from "../FormSections/Calculation/ProcessingPerPieceCard";
import AdditionalCostsCard from "../FormSections/Calculation/AdditionalCostsCard";
import WorkCalculationCard from "../FormSections/Calculation/WorkCalculationCard";
import { usePermissions } from "@hooks/usePermissions";
import { useTheme, useMediaQuery } from "@mui/material";

interface CalculationTabProps {}

const CalculationTab: FunctionComponent<CalculationTabProps> = () => {
  const { canView } = usePermissions();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {canView("calculation") && (
        <>
          <Grid container spacing={1}>
            {/* Row 1 */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Grid container spacing={isMdUp ? 10 : 2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <QuantityStepsCard />
                </Grid>
                {/* <Grid size={{ xs: 12, md: 3 }}>
                  <RawMaterialDemandCard />
                </Grid> */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <ProcessingPerMeterCard />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <ProcessingPerPieceCard />
                </Grid>
              </Grid>
            </Grid>

            {/* Row 2 */}
            <Grid size={{ xs: 12, md: 12 }}>
              <AdditionalCostsCard />
            </Grid>
          </Grid>

          {/* Row 3 */}
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 12 }}>
              <WorkCalculationCard />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CalculationTab;
