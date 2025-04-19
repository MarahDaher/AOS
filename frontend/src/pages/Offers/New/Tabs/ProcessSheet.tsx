import { FunctionComponent } from "react";
import OrderProfileProcessingView from "../FormSections/ProcessSheet/OrderProfileProcessingView";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapOfferDetailsToProcessSheetData } from "../FormSections/ProcessSheet";
import { usePermissions } from "@hooks/usePermissions";

interface ProcessSheetTabProps {}

const ProcessSheetTab: FunctionComponent<ProcessSheetTabProps> = () => {
  const { offerDetails } = useOfferContext();
  const { canView } = usePermissions();

  if (!offerDetails) return <p>Loading...</p>;

  const ProcessSheeteData = mapOfferDetailsToProcessSheetData(offerDetails);

  return (
    <>
      {canView("process_sheet") && (
        <OrderProfileProcessingView data={ProcessSheeteData} />
      )}
    </>
  );
};

export default ProcessSheetTab;
