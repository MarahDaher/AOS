import React, { createContext, ReactNode, useContext, useState } from "react";

type OfferContextType = {
  offerId: number | null;
  offerDetails: any;
  setOfferId: (id: number) => void;
  setOfferData: (data: any) => void;
  resetOffer: () => void;
};

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider = ({ children }: { children: ReactNode }) => {
  const [offerId, setOfferId] = useState<number | null>(null);
  const [offerDetails, setOfferData] = useState<any>({});

  const resetOffer = () => {
    setOfferId(null);
    setOfferData({});
  };

  return (
    <OfferContext.Provider
      value={{ offerId, offerDetails, setOfferData, setOfferId, resetOffer }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context)
    throw new Error("useOfferContext must be used within OfferProvider");
  return context;
};
