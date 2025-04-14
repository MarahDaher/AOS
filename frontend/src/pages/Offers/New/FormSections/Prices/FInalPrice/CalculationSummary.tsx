import { Box, Divider, Typography } from "@mui/material";
import { formatCurrency } from "@utils/formatNumbers";

interface Props {
  calculation: Record<string, number>;
}

const LABELS: Record<string, string> = {
  _pricing_costs_calc_time_costs_quantity: "Zeitkosten",
  _pricing_costs_calc_raw_material_price_total: "Rohstoffpreis",
  _calculation_additional_setup_costs_total: "Rüstzeit",
  _pricing_endprices_calc_packing_costs: "Verpackung",
  _pricing_endprices_calc_transport_costs: "Transport",
  _pricing_endprices_calc_print_costs: "Druck",
  _pricing_endprices_calc_confection_lfm_costs: "Konfektion / m",
  _pricing_endprices_calc_confection_stk_costs: "Konfektion / Stk",
  _pricing_endprices_calc_price_additional_lfm_total: "Zusatz",
  calculation_working_commission: "Provision",
  calculation_working_profit: "Gewinn",
  calculation_working_discount: "Zahlungsziel",
};

export default function CalculationSummary({ calculation }: Props) {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
        Kalkulationsmenge
      </Typography>
      {Object.entries(calculation).map(([key, value]) =>
        key !== "_pricing_endprices_calc_sum" ? (
          <Box display="flex" justifyContent="space-between" key={key} py={1}>
            <Typography>{LABELS[key] || key}:</Typography>
            <Typography>{formatCurrency(value)}</Typography>
          </Box>
        ) : null
      )}
      <Divider sx={{ my: 1, borderColor: "black" }} />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Summe:</Typography>
        <Typography fontWeight="bold">
          {formatCurrency(calculation._pricing_endprices_calc_sum)}
        </Typography>
      </Box>
    </>
  );
}
