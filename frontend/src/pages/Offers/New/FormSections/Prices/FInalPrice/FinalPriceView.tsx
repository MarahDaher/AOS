import CalculationSummary from "./CalculationSummary";
import TieredPriceTable from "./TieredPriceTable";
import Grid from "@mui/material/Grid2";
import CardBox from "@components/CardBox";
import TieredPriceInklTable from "./TieredPriceInklTable";
import { useMediaQuery, useTheme } from "@mui/material";
interface Props {
  data: {
    calculation: Record<string, number>;
    staffelpreise: {
      staffel: string;
      menge: number;
      staffel_m: number;
      staffel_stk: number;
      stueck: number;
    }[];
    StaffelpreiseInkl: any;
    StaffelPricedata: any;
  };
}

export default function FinalPriceView({ data }: Props) {
  const { calculation, staffelpreise, StaffelpreiseInkl } = data;
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <CardBox label="Endpreise">
      <Grid container spacing={isMdDown ? 5 : 15}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CalculationSummary calculation={calculation} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TieredPriceTable
            title="Staffelpreise exkl. Konfektion"
            data={staffelpreise}
            showFull
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TieredPriceInklTable
            title="Staffelpreise inkl. Konfektion"
            data={StaffelpreiseInkl}
          />
        </Grid>
      </Grid>
    </CardBox>
  );
}
