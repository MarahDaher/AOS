import { createContext, ReactNode, useContext, useState } from "react";

type OfferContextType = {
  offerId: number | null;
  offerDetails: any;
  isLoadingOfferDetails: boolean;
  drawingFile: File | null;
  setDrawingFile: (file: File | null) => void;
  setOfferId: (id: number) => void;
  setOfferData: (data: any) => void;
  setIsLoadingOfferDetails: (loading: boolean) => void;
  resetOffer: () => void;
};

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider = ({ children }: { children: ReactNode }) => {
  const [offerId, setOfferId] = useState<number | null>(null);
  const [offerDetails, setOfferData] = useState<any>({});
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [isLoadingOfferDetails, setIsLoadingOfferDetails] =
    useState<boolean>(true);

  const resetOffer = () => {
    setOfferId(null);
    setOfferData({});
    setIsLoadingOfferDetails(true);
  };

  return (
    <OfferContext.Provider
      value={{
        offerId,
        offerDetails,
        isLoadingOfferDetails,
        drawingFile,
        setDrawingFile,
        setOfferData,
        setOfferId,
        setIsLoadingOfferDetails,
        resetOffer,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context)
    throw new Error("useOfferContext must be used within OfferProvider");
  return context;
};
