import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import PieceLengthPricesTable from "./PieceLengthPricesTable";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapPieceLengthPricesFromOffer } from ".";

const PieceLengthPricesCard = () => {
  const { offerDetails } = useOfferContext();

  const pieceLengthData = offerDetails
    ? mapPieceLengthPricesFromOffer(offerDetails)
    : [];
  return (
    <>
      <CardBox label="Stück-Längen-Preise">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 8 }}>
            <PieceLengthPricesTable data={pieceLengthData} />
          </Grid>
        </Grid>
      </CardBox>
    </>
  );
};
export default PieceLengthPricesCard;
