import { FunctionComponent } from "react";
import Grid from "@mui/material/Grid2";
import QuantityStepsCard from "../FormSections/Calculation/QuantityStepsCard";
import RawMaterialDemandCard from "../FormSections/Calculation/RawMaterialDemandCard";
import ProcessingPerMeterCard from "../FormSections/Calculation/ProcessingPerMeterCard";
import ProcessingPerPieceCard from "../FormSections/Calculation/ProcessingPerPieceCard";
import AdditionalCostsCard from "../FormSections/Calculation/AdditionalCostsCard";
import WorkCalculationCard from "../FormSections/Calculation/WorkCalculationCard";
import { usePermissions } from "@hooks/usePermissions";

interface CalculationTabProps {}

const CalculationTab: FunctionComponent<CalculationTabProps> = () => {
  const { canView } = usePermissions();

  return (
    <>
      {canView("calculation") && (
        <>
          <Grid container spacing={1}>
            {/* Row 1 */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 2 }}>
                  <QuantityStepsCard />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <RawMaterialDemandCard />
                </Grid>
                <Grid size={{ xs: 12, md: 3.5 }}>
                  <ProcessingPerMeterCard />
                </Grid>
                <Grid size={{ xs: 12, md: 3.5 }}>
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
