import CardBox from "@components/CardBox";
import FormDatePicker from "@components/FormDatePicker";
import FormInputField from "@components/FormInputField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { FunctionComponent } from "react";

const CustomerCard: FunctionComponent = () => {
  return (
    <CardBox label="Kunde" height={CARD_HEIGHT}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_customer" label="Kunde" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormDatePicker
            name="general_request_date"
            label="Anfrage vom"
            required
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField
            name="general_customer_contact_person"
            label="Ansprechpartner"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField
            name="general_request_number"
            label="Anfragenummer"
            type="number"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField
            name="general_customer_article_number"
            label="Artikelnummer Kunde"
          />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default CustomerCard;
