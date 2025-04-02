// FormSections/Calculation/QuantityStepsCard.tsx
import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FormikProvider, useFormik } from "formik";
import { FC } from "react";
import {
  mapOfferToQuantityStepsInitialValues,
  QuantityStepsCardInitialValues,
} from "../../Index";
import { useOfferContext } from "@contexts/OfferProvider";

const QuantityStepsCard: FC = () => {
  // Hooks
  const { offerDetails } = useOfferContext();

  const formik = useFormik({
    initialValues: {
      ...QuantityStepsCardInitialValues,
      ...(offerDetails
        ? mapOfferToQuantityStepsInitialValues(offerDetails)
        : {}),
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Staffelmengen" height={CARD_HEIGHT}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="calculation_quantityA"
              label="Menge A (Kalkulation) [m]"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="calculation_quantityB"
              label="Menge B [m]"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="calculation_quantityC"
              label="Menge C [m]"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="calculation_quantityD"
              label="Menge D [m]"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormInputSaveField
              name="calculation_quantityE"
              label="Menge E [m]"
              type="number"
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default QuantityStepsCard;
