import CardBox from "@components/CardBox";
import Grid from "@mui/material/Grid2";
import TieredPriceCalculationTable from "./TieredPriceCalculationTable";
import finalPriceMock from "../FInalPrice/finalPriceData";
import { mapStaffelPricedata } from ".";
import { FormikProvider, useFormik } from "formik";
import FormInputSaveField from "@components/FormInputSaveField";

const TieredPriceCalculationCard = () => {
  const { StaffelPricedata } = finalPriceMock;

  const mappedData = mapStaffelPricedata(StaffelPricedata);

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
