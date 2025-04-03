import { useQuery } from "@tanstack/react-query";
import finalPriceMock from "./FInalPrice/finalPriceData";
import FinalPriceView from "./FInalPrice/FinalPriceView";

// Define the expected data shape
type FinalPriceData = {
  calculation: Record<string, number>;
  staffelpreise: {
    staffel: string;
    menge: number;
    staffel_m: number;
    staffel_stk: number;
    stueck: number;
  }[];
};

const fetchFinalPrice = async (): Promise<FinalPriceData> => {
  // Simulate API
  return new Promise((resolve) =>
    setTimeout(() => resolve(finalPriceMock), 300)
  );
};

export default function FinalPriceContainer() {
  const { data, isLoading, error } = useQuery<FinalPriceData>({
    queryKey: ["final-price"],
    queryFn: fetchFinalPrice,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading data</p>;

  return <FinalPriceView data={data} />;
}
