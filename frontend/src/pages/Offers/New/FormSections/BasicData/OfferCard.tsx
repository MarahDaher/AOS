import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import FormSelectSaveField from "@components/FormSelectSaveField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { DeliveryTypeLabels, GeneralStatusLabels } from "@enums/GeneralEnums";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent } from "react";
import { OfferCardInitialValues } from "../../Index";
import { useOfferContext } from "@contexts/OfferProvider";

const OfferCard: FunctionComponent = () => {
  // Hooks
  const { offerDetails } = useOfferContext();

  const statusOptions = Object.entries(GeneralStatusLabels).map(
    ([value, label]) => ({ value, label })
  );

  const deliveryOptions = Object.entries(DeliveryTypeLabels).map(
    ([value, label]) => ({ value, label })
  );

  const mapOfferToOfferCardInitialValues = (offer: any) => ({
    general_offer_number: offer.general_offer_number ?? "",
    general_status: offer.general_status ?? "",
    general_profile_crosssection: offer.general_profile_crosssection ?? "",
    general_profile_description: offer.general_profile_description ?? "",
    general_color: offer.general_color ?? "",
    general_packaging: offer.general_packaging ?? "",
    general_article_number: offer.general_article_number ?? "",
    general_tool_number: offer.general_tool_number ?? "",
    general_delivery_type: offer.general_delivery_type ?? "",
    general_order_number: offer.general_order_number ?? "",
  });

  const formik = useFormik({
    initialValues: {
      ...OfferCardInitialValues,
      ...(offerDetails ? mapOfferToOfferCardInitialValues(offerDetails) : {}),
    },
    enableReinitialize: true, //
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={formik}>
      <CardBox label="Angebot" height={CARD_HEIGHT}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_offer_number"
              label="Angebotsnummer"
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_order_number"
              label="Auftragsnummer"
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_profile_description"
              label="Profilbezeichnung"
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_article_number"
              label="Artikelnummer"
            />
          </Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormSelectSaveField
              name="general_status"
              label="Status"
              options={statusOptions}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_profile_crosssection"
              label="Profilquerschnitt [mm²]"
            />
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_tool_number"
              label="Werkzeugnummer"
            />
          </Grid>

          <Grid size={{ xs: 4, md: 4 }}></Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_packaging"
              label="Aufmachung [mm]"
            />
          </Grid>

          {/*  */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormSelectSaveField
              name="general_delivery_type"
              label="Lieferart"
              options={deliveryOptions}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}></Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField name="general_color" label="Farbe" />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default OfferCard;
