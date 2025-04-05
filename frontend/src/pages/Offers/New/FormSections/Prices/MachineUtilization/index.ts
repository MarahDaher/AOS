import { MachineUtilizationRow } from "@interfaces/StaffelPriceRow.model";

export function mapMachineUtilizationData(rawData: any): {
  rows: MachineUtilizationRow[];
  machineCapacity: number;
} {
  const rows: MachineUtilizationRow[] = [];

  // First row: Jahresmenge
  rows.push({
    label: "Jahresmenge",
    hours: rawData._pricing_machine_utilization_hours_quantity_yearly,
    days: rawData._pricing_machine_utilization_days_quantity_yearly,
    weeks: rawData._pricing_machine_utilization_weeks_quantity_yearly,
    months: rawData._pricing_machine_utilization_months_quantity_yearly,
    yearlyRelative: rawData._pricing_machine_utilization_yearly_relative,
  });

  const staffels = ["A", "B", "C", "D", "E"];

  staffels.forEach((suffix) => {
    rows.push({
      label: suffix === "A" ? "A (Kalkulation)" : suffix,
      hours: rawData[`_pricing_machine_utilization_hours_quantity${suffix}`],
      days: rawData[`_pricing_machine_utilization_days_quantity${suffix}`],
      weeks: rawData[`_pricing_machine_utilization_weeks_quantity${suffix}`],
      months: rawData[`_pricing_machine_utilization_months_quantity${suffix}`],
      // yearlyRelative is only available for "Jahresmenge"
    });
  });

  return {
    rows,
    machineCapacity:
      rawData._pricing_machine_utilization_annual_machine_capacity,
  };
}

export const machineUtilizationMock = {
  _pricing_machine_utilization_annual_machine_capacity: 5462, // Maschinenkapazität [Std/Jahr]

  _pricing_machine_utilization_hours_quantity_yearly: 1226.2,
  _pricing_machine_utilization_days_quantity_yearly: 51.1,
  _pricing_machine_utilization_weeks_quantity_yearly: 10.2,
  _pricing_machine_utilization_months_quantity_yearly: 2.6,
  _pricing_machine_utilization_yearly_relative: 23.3, // Maschine/Jahr in %

  // A (Kalkulation)
  _pricing_machine_utilization_hours_quantityA: 4.1,
  _pricing_machine_utilization_days_quantityA: 0.2,
  _pricing_machine_utilization_weeks_quantityA: 0.0,
  _pricing_machine_utilization_months_quantityA: 0.0,

  // B
  _pricing_machine_utilization_hours_quantityB: 8.2,
  _pricing_machine_utilization_days_quantityB: 0.3,
  _pricing_machine_utilization_weeks_quantityB: 0.1,
  _pricing_machine_utilization_months_quantityB: 0.0,

  // C
  _pricing_machine_utilization_hours_quantityC: 20.4,
  _pricing_machine_utilization_days_quantityC: 0.9,
  _pricing_machine_utilization_weeks_quantityC: 0.2,
  _pricing_machine_utilization_months_quantityC: 0.0,

  // D
  _pricing_machine_utilization_hours_quantityD: 40.9,
  _pricing_machine_utilization_days_quantityD: 1.7,
  _pricing_machine_utilization_weeks_quantityD: 0.3,
  _pricing_machine_utilization_months_quantityD: 0.1,

  // E
  _pricing_machine_utilization_hours_quantityE: 0,
  _pricing_machine_utilization_days_quantityE: 0,
  _pricing_machine_utilization_weeks_quantityE: 0,
  _pricing_machine_utilization_months_quantityE: 0,
};
