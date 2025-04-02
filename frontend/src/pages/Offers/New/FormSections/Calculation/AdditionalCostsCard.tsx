import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";
import { useTheme, useMediaQuery } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import {
  AdditionalCostInitialValues,
  mapAdditionalCostsInitialValues,
} from "../../Index";
import { useOfferContext } from "@contexts/OfferProvider";

const rows = [
  [
    { name: "calculation_additional_setup_time", label: "Rüstzeit [h]" },
    { name: "calculation_additional_hourly_rate", label: "Stundensatz. [€]" },
    {
      name: "_calculation_additional_setup_costs_total",
      label: "Rüstkosten gesamt [€]",
      disabled: true,
    },
    {
      name: "_calculation_additional_setup_costs_lfm",
      label: "Rüstkosten / m [€]",
      disabled: true,
    },
  ],
  [
    null,
    null,
    {
      name: "calculation_additional_transport_costs_total",
      label: "Transport [€]",
    },
    {
      name: "_calculation_additional_transport_costs_lfm",
      label: "Transport / m [€]",
      disabled: true,
    },
  ],
  [
    { name: "calculation_additional_box_count", label: "Anzahl Kartons [Stk]" },
    {
      name: "calculation_additional_box_price_per_piece",
      label: "Karton Preis / Stk [€]",
    },
    {
      name: "calculation_additional_box_price_flat_additional",
      label: "Karton Pauschale [€]",
    },
    {
      name: "_calculation_additional_box_costs_lfm",
      label: "Karton Preis / m [€]",
      disabled: true,
    },
  ],
  [
    { name: "calculation_additional_single_print", label: "Einzeldruck / m" },
    {
      name: "calculation_additional_single_print_price",
      label: "Einzeldruck Preis / m [€]",
    },
    null,
    {
      name: "_calculation_additional_single_print_lfm",
      label: "Druckpreis / m [€]",
      disabled: true,
    },
  ],
];

const AdditionalCostsCard: FC = () => {
  const { offerDetails } = useOfferContext();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const formik = useFormik({
    initialValues: {
      ...AdditionalCostInitialValues,
      ...(offerDetails ? mapAdditionalCostsInitialValues(offerDetails) : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
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
    </FormikProvider>
  );
};

export default AdditionalCostsCard;
