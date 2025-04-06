export interface StaffelPriceRow {
  staffel: string;
  menge?: number;
  hourlyRateAddition?: number;
  hourlyRate?: number;
  timeCostShare?: number;
  setupCosts?: number;
  transport?: number;
  productionTime?: number;
  rawMaterialQuantity?: number;
  subtotal?: number;
  subtotalM?: number;
}

export interface MachineUtilizationRow {
  label: string;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  yearlyRelative?: number;
}
