import { Box, Divider, Typography } from "@mui/material";

interface Props {
  calculation: Record<string, number>;
}

const LABELS: Record<string, string> = {
  zeitkosten: "Zeitkosten",
  rohstoffpreis: "Rohstoffpreis",
  ruestzeit: "Rüstzeit",
  verpackung: "Verpackung",
  transport: "Transport",
  druck: "Druck",
  konfektion1: "Konfektion 1",
  konfektion2: "Konfektion 2",
  zusatz: "Zusatz",
  provision: "Provision",
  gewinn: "Gewinn",
  zahlungsziel: "Zahlungsziel",
};

export default function CalculationSummary({ calculation }: Props) {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
        Kalkulationsmenge
      </Typography>
      {Object.entries(calculation).map(([key, value]) =>
        key !== "summe" ? (
          <Box display="flex" justifyContent="space-between" key={key} py={1}>
            <Typography>{LABELS[key] || key}:</Typography>
            <Typography>{value.toFixed(2)} €</Typography>
          </Box>
        ) : null
      )}
      <Divider sx={{ my: 1, borderColor: "black" }} />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">Summe:</Typography>
        <Typography fontWeight="bold">
          {calculation.summe.toFixed(2)} €
        </Typography>
      </Box>
    </>
  );
}
