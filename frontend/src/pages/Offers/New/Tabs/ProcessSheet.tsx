import { FunctionComponent } from "react";
import OrderProfileProcessingView from "../FormSections/ProcessSheet/OrderProfileProcessingView";
import { useQuery } from "@tanstack/react-query";
import { ProcessSheetModel } from "@interfaces/ProcessSheet.model";
import mockData from "../FormSections/ProcessSheet/mockOrderData";

interface ProcessSheetTabProps {}

const fetchData = async (): Promise<ProcessSheetModel> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockData), 300));
};

const ProcessSheetTab: FunctionComponent<ProcessSheetTabProps> = () => {
  const { data, isLoading, error } = useQuery<ProcessSheetModel>({
    queryKey: ["order-profile-processing"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error fetching data</p>;

  return <OrderProfileProcessingView data={data} />;
};

export default ProcessSheetTab;
