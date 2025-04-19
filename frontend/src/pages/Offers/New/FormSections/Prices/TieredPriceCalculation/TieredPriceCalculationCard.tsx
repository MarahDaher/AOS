import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import TieredPriceCalculationTable from "./TieredPriceCalculationTable";
import { FormikProvider, useFormik } from "formik";
import FormInputSaveField from "@components/FormInputSaveField";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapStaffelPricedataFromOffer } from ".";
import { usePermissions } from "@hooks/usePermissions";

const TieredPriceCalculationCard = () => {
  const { offerDetails } = useOfferContext();
  // Permissions
  const { canEdit } = usePermissions();
  const isEditable = canEdit("prices");

  const mappedData = offerDetails
    ? mapStaffelPricedataFromOffer(offerDetails)
    : [];

  const formik = useFormik({
    initialValues: {
      pricing_graduated_calculation_additional_setup_quantity: offerDetails
        ? offerDetails?.pricing_graduated_calculation_additional_setup_quantity
        : 0,
    },
    onSubmit: () => {},
  });

  return (
    <>
      <CardBox label="Staffelpreisberechnung">
        <Grid container spacing={5} display="flex" justifyContent="end">
          <Grid size={{ xs: 12, md: 2 }}>
            <FormikProvider value={formik}>
              <FormInputSaveField
                name="pricing_graduated_calculation_additional_setup_quantity"
                label="zus. Einstellmenge [%]"
                disabled={!isEditable}
              />
            </FormikProvider>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TieredPriceCalculationTable data={mappedData} />
          </Grid>
        </Grid>
      </CardBox>
    </>
  );
};

export default TieredPriceCalculationCard;
