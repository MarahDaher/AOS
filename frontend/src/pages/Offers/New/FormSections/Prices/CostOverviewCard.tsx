import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import FormInputSaveField from "@components/FormInputSaveField";
import { Box } from "@mui/material";

// Left side fields (Kalkulationsmenge) - 3 columns per row (md=4)
const kalkulationsmengeRows = [
  [
    {
      name: "_pricing_costs_calc_production_time",
      label: "Produktionszeit [h]",
      disabled: true,
    },
    null,
    null,
    {
      name: "_pricing_costs_calc_time_costs_quantity",
      label: "Zeitkosten gesamt [€]",
      disabled: true,
    },
  ],
  [
    {
      name: "_pricing_costs_calc_raw_material_quantity",
      label: "Rohstoffmenge [kg]",
      disabled: true,
    },
    {
      name: "_pricing_costs_calc_raw_material_setup_quantity",
      label: "Einstellmenge [kg]",
      disabled: true,
    },
    {
      name: "_pricing_costs_calc_raw_material_quantity_total",
      label: "Rohstoffmenge gesamt [kg]",
      disabled: true,
    },
    {
      name: "_pricing_costs_calc_raw_material_price_total",
      label: "Rohstoffpreis gesamt [€]",
      disabled: true,
    },
  ],
  [null, null, null],
  [
    {
      name: "_pricing_costs_calc_price_additional_lfm",
      label: "Zusatzpreis / m [€]",
      disabled: true,
    },
    null,
    null,
  ],
];

// Right side fields (Jahresmenge)
const jahresmengeRows = [
  [
    {
      name: "_pricing_costs_yearly_time_costs_quantity",
      label: "Zeiteinsatz [€]",
      disabled: true,
    },
  ],
  [
    {
      name: "_pricing_costs_yearly_raw_material_quantity",
      label: "Rohstoffeinsatz [€]",
      disabled: true,
    },
  ],
  [
    {
      name: "_pricing_costs_yearly_fixcosts",
      label: "Fixkosten [€]",
      disabled: true,
    },
  ],
];

const CostOverviewCard: FC = () => {
  return (
    <CardBox label="Kosten">
      <Grid container spacing={8}>
        {/* Left Column (Kalkulationsmenge) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="subtitle2" gutterBottom textAlign={"center"}>
            Kalkulationsmenge
          </Typography>

          {kalkulationsmengeRows.map((row, rowIndex) => {
            const isEmptyRow = row.every((field) => field === null);
            return (
              <Grid
                container
                spacing={8}
                pt={rowIndex > 0 ? 1 : 0}
                key={rowIndex}
              >
                {isEmptyRow ? (
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ height: 50 }} />
                  </Grid>
                ) : (
                  row.map((field, colIndex) => (
                    <Grid key={colIndex} size={{ xs: 12, md: 3 }}>
                      {field ? (
                        <FormInputSaveField
                          name={field.name}
                          label={field.label}
                          type="number"
                          disabled={field.disabled}
                        />
                      ) : null}
                    </Grid>
                  ))
                )}
              </Grid>
            );
          })}
        </Grid>

        {/* Right Column (Jahresmenge) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle2" gutterBottom textAlign={"center"}>
            Jahresmenge
          </Typography>

          {jahresmengeRows.map((row, rowIndex) => (
            <Grid
              container
              spacing={8}
              pt={rowIndex > 0 ? 1 : 0}
              key={rowIndex}
              justifyContent={"center"}
            >
              {row.map((field, colIndex) => (
                <Grid size={{ xs: 5 }} key={colIndex}>
                  <FormInputSaveField
                    name={field.name}
                    label={field.label}
                    type="number"
                    disabled={field.disabled}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default CostOverviewCard;
