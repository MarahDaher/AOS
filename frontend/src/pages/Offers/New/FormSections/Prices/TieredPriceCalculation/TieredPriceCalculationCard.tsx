import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import TieredPriceCalculationTable from "./TieredPriceCalculationTable";
import { FormikProvider, useFormik } from "formik";
import FormInputSaveField from "@components/FormInputSaveField";
import { useOfferContext } from "@contexts/OfferProvider";
import { mapStaffelPricedataFromOffer } from ".";

const TieredPriceCalculationCard = () => {
  const { offerDetails } = useOfferContext();

  const mappedData = offerDetails
    ? mapStaffelPricedataFromOffer(offerDetails)
    : [];

  const formik = useFormik({
    initialValues: {
      pricing_graduated_calculation_additional_setup_quantity: 0,
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
                type="number"
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
