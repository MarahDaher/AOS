import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";
import { useTheme, useMediaQuery } from "@mui/material";

const rows = [
  [
    { name: "setup_percentage", label: "Einstellmenge [%]" },
    { name: "extrusion_speed", label: "Extrusionsgeschw. [m/min]" },
    { name: "setup_length", label: "Einstellmenge [m]" },
    { name: "setup_time", label: "Einstellzeit [min]", disabled: true },
    { name: "annual_demand", label: "Jahresbedarf (schätz) [m]" },
    null,
  ],
  [
    { name: "tool_cost_total", label: "Werkzeugkosten gesamt [€]" },
    { name: "tool_cost_customer", label: "Werkzeugkosten Kunde [€]" },
    { name: "tool_cost_additional", label: "Umlagekosten zzgl. [€]" },
    { name: "tool_lifetime_years", label: "Werkzeugumlager auf Jahre" },
    {
      name: "cost_allocation_per_meter",
      label: "Umlage / m [€]",
      disabled: true,
    },
    null,
  ],
  [
    { name: "profile_cross_section", label: "Profilquerschnitt [mm²]" },
    { name: "deviation_down", label: "Abweichung nach unten [%]" },
    { name: "deviation_up", label: "Abweichung nach oben [%]" },
    {
      name: "material_density",
      label: "Rohstoffdichte [gr./cm³]",
      disabled: true,
    },
    { name: "profile_weight", label: "Profilgewicht [gr./m]", disabled: true },
    null,
  ],
  [
    { name: "setup_percentage_add", label: "Einstellmenge Zusatz [%]" },
    { name: "hourly_rate", label: "Stundensatz [€]" },
    { name: "additional_costs_per_meter", label: "Zusatzkosten / m [€]" },
    null,
  ],
  [
    { name: "commission", label: "Provision [%]" },
    { name: "profit", label: "Gewinn [%]" },
    { name: "discount", label: "Skonto [%]" },
  ],
];

const WorkCalculationCard: FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <CardBox label="Arbeiten">
      {rows.map((row, rowIndex) => (
        <Grid
          key={rowIndex}
          container
          spacing={isMdUp ? 2 : 1}
          pt={rowIndex > 0 ? 2 : 0}
        >
          {row.map((field, colIndex) => (
            <Grid key={colIndex} size={{ xs: 2.3, md: 2 }} pb={1}>
              {field ? (
                <FormInputSaveField
                  name={field.name}
                  label={field.label}
                  disabled={field.disabled}
                  type="number"
                />
              ) : null}
            </Grid>
          ))}
        </Grid>
      ))}
    </CardBox>
  );
};

export default WorkCalculationCard;
