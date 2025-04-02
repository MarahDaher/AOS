export enum GeneralStatus {
  VORKALKULATION = "Vorkalkulation",
  ANGEBOT = "Angebot",
  AUFTRAG = "Auftrag",
  PRODUZIERT = "Produziert",
  VERSANDT = "Versandt",
}

export enum DeliveryType {
  FREI = "frei",
  UNFREI = "unfrei",
}

// Status
export const GeneralStatusLabels = {
  [GeneralStatus.VORKALKULATION]: "Vorkalkulation",
  [GeneralStatus.ANGEBOT]: "Angebot",
  [GeneralStatus.AUFTRAG]: "Auftrag",
  [GeneralStatus.PRODUZIERT]: "Produziert",
  [GeneralStatus.VERSANDT]: "Versandt",
};

export const DeliveryTypeLabels = {
  [DeliveryType.FREI]: "Frei",
  [DeliveryType.UNFREI]: "Unfrei",
};
