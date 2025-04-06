import { useOfferContext } from "@contexts/OfferProvider";
import FinalPriceView from "./FInalPrice/FinalPriceView";
import { mapOfferDetailsToFinalPriceData } from "./FInalPrice";

export default function FinalPriceContainer() {
  const { offerDetails } = useOfferContext();

  if (!offerDetails) return <p>Loading...</p>;

  const finalPriceData = mapOfferDetailsToFinalPriceData(offerDetails);

  return <FinalPriceView data={finalPriceData} />;
}
