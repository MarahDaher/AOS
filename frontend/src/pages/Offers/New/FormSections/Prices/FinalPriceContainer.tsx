import { useQuery } from "@tanstack/react-query";
import finalPriceMock from "./FInalPrice/finalPriceData";
import FinalPriceView from "./FInalPrice/FinalPriceView";

const fetchFinalPrice = async (): Promise<any> => {
  // Simulate API
  return new Promise((resolve) =>
    setTimeout(() => resolve(finalPriceMock), 300)
  );
};

export default function FinalPriceContainer() {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["final-price"],
    queryFn: fetchFinalPrice,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading data</p>;

  return <FinalPriceView data={data} />;
}
