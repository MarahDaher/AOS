import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import PieceLengthPricesTable from "./PieceLengthPricesTable";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapPieceLengthPricesFromOffer } from ".";
import { useFormik } from "formik";

const PieceLengthPricesCard = () => {
  const { offerDetails } = useOfferContext();

  const pieceLengthData = offerDetails
    ? mapPieceLengthPricesFromOffer(offerDetails)
    : [];

  const formik = useFormik({
    initialValues: {
      pricing_piece_length_prices_length1:
        offerDetails?.pricing_piece_length_prices_length1 ?? "",
      pricing_piece_length_prices_length2:
        offerDetails?.pricing_piece_length_prices_length2 ?? "",
      pricing_piece_length_prices_length3:
        offerDetails?.pricing_piece_length_prices_length3 ?? "",
      pricing_piece_length_prices_length4:
        offerDetails?.pricing_piece_length_prices_length4 ?? "",
      pricing_piece_length_prices_length5:
        offerDetails?.pricing_piece_length_prices_length5 ?? "",
    },
    onSubmit: () => {},
  });

  return (
    <CardBox label="Stück-Längen-Preise">
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, md: 10 }}>
          <PieceLengthPricesTable data={pieceLengthData} formik={formik} />
        </Grid>
      </Grid>
    </CardBox>
  );
};
export default PieceLengthPricesCard;
