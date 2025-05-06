import CardBox from "@components/CardBox";
import FormIntField from "@components/FormInputs/FormIntField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FC } from "react";
import { FormikProvider, useFormik } from "formik";
import {
  mapOfferToQuantityStepsInitialValues,
  QuantityStepsCardInitialValues,
} from "../../Index";
import { useOfferContext } from "@contexts/OfferProvider";
import { usePermissions } from "@hooks/usePermissions";

const QuantityStepsCard: FC = () => {
  // Hooks
  const { offerDetails } = useOfferContext();
  const { canEdit } = usePermissions();
  const isEditable = canEdit("calculation");

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
            <FormIntField
              name="calculation_quantityA"
              label="Menge A (Kalkulation) [m]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormIntField
              name="calculation_quantityB"
              label="Menge B [m]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormIntField
              name="calculation_quantityC"
              label="Menge C [m]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormIntField
              name="calculation_quantityD"
              label="Menge D [m]"
              disabled={!isEditable}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormIntField
              name="calculation_quantityE"
              label="Menge E [m]"
              disabled={!isEditable}
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default QuantityStepsCard;
