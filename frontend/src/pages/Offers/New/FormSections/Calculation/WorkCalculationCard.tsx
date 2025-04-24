import { FC } from "react";
import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import FormInputSaveField from "@components/FormInputSaveField";
// import { useTheme, useMediaQuery } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { useOfferContext } from "@contexts/OfferProvider";
import {
  mapWorkCalculationInitialValues,
  WorkCalculationInitialValues,
} from "../../Index";
import ProfileWeightTripleDisplay from "./ProfileWeightTripleDisplay";
import { usePermissions } from "@hooks/usePermissions";

type FieldConfig = {
  name: string;
  label: string;
  disabled?: boolean;
  numeric?: boolean;
};

const rows: Array<FieldConfig | null>[] = [
  [
    {
      name: "calculation_working_setup_quantity_relative",
      label: "Einstellmenge [%]",
    },
    {
      name: "calculation_working_extrusion_speed",
      label: "Extrusionsgeschw. [m/min]",
      numeric: true,
    },
    {
      name: "_calculation_working_setup_quantity_lfm",
      label: "Einstellmenge [m]",
      disabled: true,
      numeric: true,
    },
    {
      name: "_calculation_working_setup_time",
      label: "Einstellzeit [min]",
      disabled: true,
      numeric: true,
    },
    {
      name: "calculation_working_annual_requirement_estimated",
      label: "Jahresbedarf (schätz) [m]",
      numeric: true,
    },
    null,
  ],
  [
    {
      name: "calculation_working_tool_costs_total",
      label: "Werkzeugkosten gesamt [€]",
      numeric: true,
    },
    {
      name: "calculation_working_tool_costs_customer",
      label: "Werkzeugkosten Kunde [€]",
      numeric: true,
    },
    {
      name: "calculation_working_allocation_costs_additional",
      label: "Umlagekosten zzgl. [€]",
    },
    {
      name: "calculation_working_tool_costs_amortization_years",
      label: "Werkzeugumlager auf Jahre",
    },
    {
      name: "_calculation_working_allocation_costs_lfm",
      label: "Umlage / m [€]",
      disabled: true,
      numeric: true,
    },
    null,
  ],
  [
    {
      name: "general_profile_crosssection",
      label: "Profilquerschnitt [mm²]",
      disabled: true,
      numeric: true,
    },
    {
      name: "calculation_working_profile_cross_section_deviation_lower",
      label: "Abweichung nach unten [%]",
    },
    {
      name: "calculation_working_profile_cross_section_deviation_upper",
      label: "Abweichung nach oben [%]",
    },
    {
      name: "_calculation_working_density_total",
      label: "Rohstoffdichte gesamt [gr/cm³]",
      disabled: true,
      numeric: true,
    },
    null,
    null,
  ],
  [
    // {
    //   name: "calculation_working_setup_quantity_additional",
    //   label: "Einstellmenge Zusatz [%]",
    // },
    { name: "calculation_working_hourly_rate", label: "Stundensatz [€]" },
    {
      name: "calculation_working_additional_costs",
      label: "Zusatzkosten / m [€]",
      numeric: true,
    },
    null,
  ],
  [
    {
      name: "calculation_working_commission",
      label: "Provision [%]",
      numeric: true,
    },
    { name: "calculation_working_profit", label: "Gewinn [%]", numeric: true },
    {
      name: "calculation_working_discount",
      label: "Skonto [%]",
      numeric: true,
    },
  ],
];

const WorkCalculationCard: FC = () => {
  const { offerDetails } = useOfferContext();
  const { canEdit } = usePermissions();
  const isEditable = canEdit("calculation");
  // const theme = useTheme();
  // const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const formik = useFormik({
    initialValues: {
      ...WorkCalculationInitialValues,
      ...(offerDetails ? mapWorkCalculationInitialValues(offerDetails) : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Arbeiten">
        {rows.map((row, rowIndex) => (
          <Grid key={rowIndex} container spacing={1} pt={rowIndex > 0 ? 2 : 0}>
            {row.map((field, colIndex) => (
              <Grid key={colIndex} size={{ xs: 2.3, md: 2.3 }} pb={1}>
                {field ? (
                  <FormInputSaveField
                    name={field.name}
                    label={field.label}
                    disabled={field.disabled || !isEditable}
                    numeric={field.numeric}
                  />
                ) : rowIndex === 2 && colIndex === 4 ? (
                  <ProfileWeightTripleDisplay />
                ) : null}
              </Grid>
            ))}
          </Grid>
        ))}
      </CardBox>
    </FormikProvider>
  );
};

export default WorkCalculationCard;
