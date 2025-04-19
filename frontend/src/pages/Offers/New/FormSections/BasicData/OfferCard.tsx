import CardBox from "@components/CardBox";
import FormInputSaveField from "@components/FormInputSaveField";
import FormSelectSaveField from "@components/FormSelectSaveField";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "@utils/constantValue";
import { DeliveryTypeLabels, GeneralStatusLabels } from "@enums/GeneralEnums";
import { formatNumberToGerman } from "@utils/formatNumbers";
import { FormikProvider, useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { OfferCardInitialValues } from "../../Index";
import { useEditableFields } from "@hooks/useEditableFields";
import { useOfferContext } from "@contexts/OfferProvider";

const OfferCard: FunctionComponent = () => {
  // Hooks
  const { offerDetails, offerId } = useOfferContext();
  // Permissions
  const { data: editableFields = [], refetch: refetchEditableFields } =
    useEditableFields(offerId!);

  const isFieldEditable = (fieldName: string) =>
    editableFields.includes(fieldName);

  // Dropdowns
  const statusOptions = Object.entries(GeneralStatusLabels).map(
    ([value, label]) => ({ value, label })
  );

  const deliveryOptions = Object.entries(DeliveryTypeLabels).map(
    ([value, label]) => ({ value, label })
  );

  const mapOfferToOfferCardInitialValues = (offer: any) => ({
    general_offer_number: offer.general_offer_number ?? "",
    general_status: offer.general_status ?? "",
    general_profile_crosssection: formatNumberToGerman(
      offer.general_profile_crosssection
    ),
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

  // Watch for changes to general_status
  useEffect(() => {
    if (
      offerId &&
      formik.values.general_status !== offerDetails?.general_status
    ) {
      refetchEditableFields();
    }
  }, [formik.values.general_status]);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Angebot" height={CARD_HEIGHT}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_offer_number"
              label="Angebotsnummer"
              disabled={!isFieldEditable("general_offer_number")}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_order_number"
              label="Auftragsnummer"
              disabled={!isFieldEditable("general_order_number")}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_profile_description"
              label="Profilbezeichnung"
              disabled={!isFieldEditable("general_profile_description")}
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_article_number"
              label="Artikelnummer"
              disabled={!isFieldEditable("general_article_number")}
            />
          </Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormSelectSaveField
              name="general_status"
              label="Status"
              disabled={!isFieldEditable("general_status")}
              options={statusOptions}
              onSaved={refetchEditableFields}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_profile_crosssection"
              label="Profilquerschnitt [mm²]"
              disabled={!isFieldEditable("general_profile_crosssection")}
            />
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_tool_number"
              label="Werkzeugnummer"
              disabled={!isFieldEditable("general_tool_number")}
            />
          </Grid>

          <Grid size={{ xs: 4, md: 4 }}></Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_packaging"
              label="Aufmachung [mm]"
              disabled={!isFieldEditable("general_packaging")}
            />
          </Grid>

          {/*  */}
          <Grid size={{ xs: 4, md: 4 }}>
            <FormSelectSaveField
              name="general_delivery_type"
              label="Lieferart"
              options={deliveryOptions}
              disabled={!isFieldEditable("general_delivery_type")}
            />
          </Grid>
          <Grid size={{ xs: 4, md: 4 }}></Grid>

          <Grid size={{ xs: 4, md: 4 }}>
            <FormInputSaveField
              name="general_color"
              label="Farbe"
              disabled={!isFieldEditable("general_color")}
            />
          </Grid>
        </Grid>
      </CardBox>
    </FormikProvider>
  );
};

export default OfferCard;
