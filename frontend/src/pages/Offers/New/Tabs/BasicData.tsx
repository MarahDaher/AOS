import Grid from "@mui/material/Grid2";
import { FunctionComponent, useEffect, useState } from "react";

import OfferCard from "../FormSections/BasicData/OfferCard";
import CustomerCard from "../FormSections/BasicData/CustomerCard";
import HistoryCard from "../FormSections/BasicData/HistoryCard";
import RawMaterialPricesTable from "../FormSections/BasicData/RawMaterialPrices";
import CardBox from "@components/CardBox";
import FormInputField from "@components/FormInputField";

type BasicDataTabProps = object;

const BasicDataTab: FunctionComponent<BasicDataTabProps> = () => {
  const [rawMaterials, setRawMaterials] = useState([]);

  // LifeCycle
  useEffect(() => {
    // axios.get("/api/raw-materials").then((res) => {
    //   setRawMaterials(res.data);
    // });
  }, []);

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
          <HistoryCard />
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
