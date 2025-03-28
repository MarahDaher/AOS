import React, { createContext, useContext, useEffect, useState } from "react";
import { createContextualCan } from "@casl/react";
import { useAuth } from "./AuthProvider";
import { AppAbility } from "../casl/ability";
import { defineAbilitiesFor } from "../casl/ability";

const AbilityContext = createContext<AppAbility>(defineAbilitiesFor([]));
export const Can = createContextualCan(AbilityContext.Consumer);

export const CASLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [ability, setAbility] = useState<AppAbility>(defineAbilitiesFor([]));

  useEffect(() => {
    if (user && Array.isArray((user as any).permissions)) {
      setAbility(defineAbilitiesFor((user as any).permissions));
    }
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
