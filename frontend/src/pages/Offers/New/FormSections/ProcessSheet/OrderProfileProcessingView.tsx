import Grid from "@mui/material/Grid2";
import InfoCard from "./InfoCard";
import SamplingCard from "./SamplingCard";
import PackagingSeriesCard from "./PackagingSeriesCard";
import WorkHoursCard from "./WorkHoursCard";
import ToolingCard from "./ToolingCard";
import ProcessingCard from "./ProcessingCard";

type Props = {
  data: any;
};

export default function OrderProfileProcessingView({ data }: Props) {
  const { order, profile, processing } = data;

  return (
    <>
      <Grid container spacing={10} px={0.5}>
        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard
            title="Auftrag"
            rows={[
              { label: "Angebotsnummer", value: order.offer_number },
              { label: "Auftragsnummer", value: order.order_number },
              { label: "Kunde", value: order.customer },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard
            title="Profil"
            rows={[
              { label: "Bezeichnung", value: profile.name },
              { label: "Werkzeugnummer", value: profile.tool_number },
              { label: "Artikelnr. Kunde", value: profile.customer_article },
              { label: "Artikelnr. AOS", value: profile.aos_article },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} alignContent="center">
          <InfoCard
            title="Verarbeitungsvorgaben"
            rows={[
              {
                label: "Geschwindigkeit Kalkulation",
                value: processing.speed_calc,
              },
              {
                label: "Metergewicht Kalkulation",
                value: processing.weight_calc,
              },
            ]}
          />
        </Grid>
      </Grid>

      {/* <RawMaterialTable materials={raw_materials} /> */}

      <Grid size={{ xs: 12, md: 12 }}>
        <ProcessingCard />
      </Grid>

      <Grid size={{ xs: 12, md: 12 }}>
        <SamplingCard />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <PackagingSeriesCard />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <WorkHoursCard />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <ToolingCard />
      </Grid>
    </>
  );
}
