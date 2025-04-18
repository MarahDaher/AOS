import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import FormInputSaveField from "@components/FormInputSaveField";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import { formatNumberToGerman } from "@utils/formatNumbers";

// Left side fields (Kalkulationsmenge)
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
      name: "pricing_costs_calc_price_additional_lfm",
      label: "Zusatzpreis / m [€]",
      disabled: false,
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
  const { offerDetails } = useOfferContext();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const formik = useFormik({
    initialValues: {
      _pricing_costs_calc_production_time:
        offerDetails?._pricing_costs_calc_production_time ?? 0.0,

      _pricing_costs_calc_time_costs_quantity:
        offerDetails?._pricing_costs_calc_time_costs_quantity ?? 0.0,

      _pricing_costs_calc_raw_material_quantity:
        offerDetails?._pricing_costs_calc_raw_material_quantity ?? 0.0,

      _pricing_costs_calc_raw_material_setup_quantity:
        offerDetails?._pricing_costs_calc_raw_material_setup_quantity ?? 0.0,

      _pricing_costs_calc_raw_material_quantity_total:
        offerDetails?._pricing_costs_calc_raw_material_quantity_total ?? 0.0,

      _pricing_costs_calc_raw_material_price_total:
        offerDetails?._pricing_costs_calc_raw_material_price_total ?? 0.0,

      pricing_costs_calc_price_additional_lfm:
        formatNumberToGerman(
          offerDetails?.pricing_costs_calc_price_additional_lfm
        ) || "",

      _pricing_costs_yearly_time_costs_quantity:
        offerDetails?._pricing_costs_yearly_time_costs_quantity ?? 0.0,

      _pricing_costs_yearly_raw_material_quantity:
        offerDetails?._pricing_costs_yearly_raw_material_quantity ?? 0.0,

      _pricing_costs_yearly_fixcosts:
        offerDetails?._pricing_costs_yearly_fixcosts ?? 0.0,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Kosten">
        <Grid container spacing={8}>
          {/* Left Column (Kalkulationsmenge) */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              mb={4}
            >
              Kalkulationsmenge
            </Typography>

            {kalkulationsmengeRows.map((row, rowIndex) => {
              const isEmptyRow = row.every((field) => field === null);

              if (isMdDown) {
                return (
                  <Grid container spacing={2} key={rowIndex}>
                    {row
                      .filter((field) => field !== null)
                      .map((field, colIndex) => (
                        <Grid size={12} key={colIndex}>
                          <Box mb={2}>
                            <FormInputSaveField
                              name={field!.name}
                              label={field!.label}
                              disabled={field!.disabled}
                            />
                          </Box>
                        </Grid>
                      ))}
                  </Grid>
                );
              }

              return (
                <Grid
                  container
                  spacing={8}
                  pt={rowIndex > 0 ? 1 : 0}
                  key={rowIndex}
                >
                  {isEmptyRow ? (
                    <Grid size={12}>
                      <Box sx={{ height: 50 }} />
                    </Grid>
                  ) : (
                    row.map((field, colIndex) => (
                      <Grid key={colIndex} size={{ xs: 12, md: 3 }}>
                        {field ? (
                          <FormInputSaveField
                            name={field.name}
                            label={field.label}
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
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              mb={4}
            >
              Jahresmenge
            </Typography>

            {jahresmengeRows.map((row, rowIndex) => (
              <Grid
                container
                spacing={8}
                pt={rowIndex > 0 ? 1 : 0}
                key={rowIndex}
                justifyContent="center"
              >
                {row.map((field, colIndex) => (
                  <Grid size={isMdDown ? 12 : 5} key={colIndex}>
                    <Box mb={isMdDown ? 2 : 0}>
                      <FormInputSaveField
                        name={field.name}
                        label={field.label}
                        disabled={field.disabled}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default CostOverviewCard;
