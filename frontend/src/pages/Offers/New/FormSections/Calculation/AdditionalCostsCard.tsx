import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";
import { useTheme, useMediaQuery } from "@mui/material";

const rows = [
  [
    { name: "setup_time", label: "Rüstzeit [h]" },
    { name: "hourly_rate", label: "Stundensatz. [€]" },
    {
      name: "setup_cost_total",
      label: "Rüstkosten gesamt [€]",
      disabled: true,
    },
    {
      name: "setup_cost_per_meter",
      label: "Rüstkosten / m [€]",
      disabled: true,
    },
  ],
  [
    null,
    null,
    { name: "transport", label: "Transport [€]" },
    { name: "transport_per_meter", label: "Transport / m [€]", disabled: true },
  ],
  [
    { name: "carton_count", label: "Anzahl Kartons [Stk]" },
    { name: "carton_price_per_piece", label: "Karton Preis / Stk [€]" },
    { name: "carton_flat_rate", label: "Karton Pauschale [€]" },
    {
      name: "carton_price_per_meter",
      label: "Karton Preis / m [€]",
      disabled: true,
    },
  ],
  [
    { name: "single_print_per_meter", label: "Einzeldruck / m" },
    {
      name: "single_print_price_per_meter",
      label: "Einzeldruck Preis / m [€]",
    },
    null,
    {
      name: "print_price_per_meter",
      label: "Druckpreis / m [€]",
      disabled: true,
    },
  ],
];

const AdditionalCostsCard: FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <CardBox label="Zusätze">
      {rows.map((row, rowIndex) => (
        <Grid
          key={rowIndex}
          container
          spacing={isMdUp ? 2 : 1}
          pt={rowIndex > 0 ? 2 : 0}
          pb={1}
        >
          {row.map((field, colIndex) => (
            <Grid key={colIndex} size={{ xs: 3, md: 2 }} pb={1}>
              {field ? (
                <FormInputSaveField
                  name={field.name}
                  label={field.label}
                  type="number"
                  disabled={field.disabled}
                />
              ) : null}
            </Grid>
          ))}
        </Grid>
      ))}
    </CardBox>
  );
};

export default AdditionalCostsCard;
