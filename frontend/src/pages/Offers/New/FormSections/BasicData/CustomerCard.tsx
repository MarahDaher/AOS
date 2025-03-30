import CardBox from "@components/CardBox";
import FormDatePicker from "@components/FormDatePicker";
import FormInputSaveField from "@components/FormInputSaveField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { CustomerCardInitialValues } from "../../Index";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent } from "react";
import { useOfferContext } from "@contexts/OfferProvider";

const CustomerCard: FunctionComponent = () => {
  // Hooks
  const { offerDetails } = useOfferContext();

  const mapOfferToCustomerInitialValues = (offer: any) => ({
    general_customer: offer.general_customer ?? "",
    general_customer_contact_person:
      offer.general_customer_contact_person ?? "",
    general_customer_article_number:
      offer.general_customer_article_number ?? "",
    general_request_date: offer.general_request_date ?? "",
    general_request_number: offer.general_request_number ?? "",
  });

  const formik = useFormik({
    initialValues: {
      ...CustomerCardInitialValues,
      ...(offerDetails ? mapOfferToCustomerInitialValues(offerDetails) : {}),
    },
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Kunde" height={CARD_HEIGHT}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 6 }}>
            <FormInputSaveField name="general_customer" label="Kunde" />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <FormDatePicker
              name="general_request_date"
              label="Anfrage vom"
              required
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <FormInputSaveField
              name="general_customer_contact_person"
              label="Ansprechpartner"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <FormInputSaveField
              name="general_request_number"
              label="Anfragenummer"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <FormInputSaveField
              name="general_customer_article_number"
              label="Artikelnummer Kunde"
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default CustomerCard;
