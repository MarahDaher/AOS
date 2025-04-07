import { FunctionComponent } from "react";
import OrderProfileProcessingView from "../FormSections/ProcessSheet/OrderProfileProcessingView";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapOfferDetailsToProcessSheetData } from "../FormSections/ProcessSheet";

interface ProcessSheetTabProps {}

const ProcessSheetTab: FunctionComponent<ProcessSheetTabProps> = () => {
  const { offerDetails } = useOfferContext();

  if (!offerDetails) return <p>Loading...</p>;

  const ProcessSheeteData = mapOfferDetailsToProcessSheetData(offerDetails);

  return <OrderProfileProcessingView data={ProcessSheeteData} />;
};

export default ProcessSheetTab;
