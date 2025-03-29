import React, { createContext, ReactNode, useContext, useState } from "react";

type OfferContextType = {
  offerId: number | null;
  setOfferId: (id: number) => void;
};

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider = ({ children }: { children: ReactNode }) => {
  const [offerId, setOfferId] = useState<number | null>(null);

  return (
    <OfferContext.Provider value={{ offerId, setOfferId }}>
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
