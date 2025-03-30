import Grid from "@mui/material/Grid2";
import { FunctionComponent } from "react";

import OfferCard from "../FormSections/BasicData/OfferCard";
import CustomerCard from "../FormSections/BasicData/CustomerCard";
import HistoryCard from "../FormSections/BasicData/HistoryCard";
import RawMaterialPricesTable from "../FormSections/BasicData/RawMaterialPrices";
import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";
import { useCalculatedValues } from "@hooks/useCalculatedValues";
import { useOfferContext } from "@contexts/OfferProvider";

type BasicDataTabProps = object;

const BasicDataTab: FunctionComponent<BasicDataTabProps> = () => {
  useCalculatedValues();

  const { offerDetails } = useOfferContext();

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 5 }}>
          <OfferCard />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <CustomerCard />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          {offerDetails.general_creation_date &&
            offerDetails.created_by_user && <HistoryCard />}
        </Grid>
      </Grid>

      {/* Raw Materials */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <RawMaterialPricesTable />
        </Grid>
      </Grid>

      {/* Bemerkungen */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <CardBox label="">
            <FormInputField
              name="general_comments"
              label="Bemerkungen"
              multiline
              rows={5}
            />
          </CardBox>
        </Grid>
      </Grid>
    </>
  );
};

export default BasicDataTab;
