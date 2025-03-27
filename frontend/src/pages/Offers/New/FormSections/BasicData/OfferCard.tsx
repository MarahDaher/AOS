import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import FormSelectField from "@components/FormSelectField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import {
  DeliveryType,
  GeneralStatusLabels,
  MaterialOptionsLabels,
} from "@enums/GeneralEnums";
import { FunctionComponent } from "react";

const OfferCard: FunctionComponent = () => {
  const statusOptions = Object.entries(GeneralStatusLabels).map(
    ([value, label]) => ({ value, label })
  );
  const materialOptions = Object.entries(MaterialOptionsLabels).map(
    ([value, label]) => ({ value, label })
  );
  const deliveryOptions = Object.entries(DeliveryType).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <CardBox label="Angebot" height={CARD_HEIGHT}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_offer_number" label="Angebotsnummer" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormSelectField
            name="general_status"
            label="Status"
            options={statusOptions}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField
            name="general_profile_description"
            label="Profilbezeichnung"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_color" label="Farbe" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormSelectField
            name="general_material"
            label="Werkstoff"
            options={materialOptions}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_packaging" label="Aufmachung [mm]" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_article_number" label="Artikelnummer" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_tool_number" label="Werkzeugnummer" />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormSelectField
            name="general_delivery_type"
            label="Lieferart"
            options={deliveryOptions}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
          <FormInputField name="general_order_number" label="Auftragsnummer" />
        </Grid>
      </Grid>
    </CardBox>
  );
};

export default OfferCard;
