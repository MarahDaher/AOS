export function mapMachineUtilizationData(rawData: any): {
  rows: any[];
  machineCapacity: number;
} {
  const rows: any[] = [];

  if (!rawData) {
    return { rows: [], machineCapacity: 0 };
  }

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
    });
  });

  return {
    rows,
    machineCapacity:
      rawData._pricing_machine_utilization_annual_machine_capacity ?? 0,
  };
}
