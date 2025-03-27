import { FunctionComponent, useEffect, useState } from "react";
import CardBox from "../../../components/CardBox";
import BasicDataTab from "./Tabs/BasicData";
import CalculationTab from "./Tabs/Calculation";
import PricesTab from "./Tabs/Prices";
import DrawingTab from "./Tabs/Drawing";
import ProcessSheetTab from "./Tabs/ProcessSheet";
import { Box, debounce, Tab, Tabs } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { initialValues } from "./Index";

type NewOfferProps = object;

const tabs = [
  { label: "Grunddaten", component: <BasicDataTab /> },
  { label: "Kalkulation", component: <CalculationTab /> },
  { label: "Preise", component: <PricesTab /> },
  { label: "Zeichnung", component: <DrawingTab /> },
  { label: "Laufkarte", component: <ProcessSheetTab /> },
];

const NewOffer: FunctionComponent<NewOfferProps> = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  // Debounced save function
  const debouncedSave = debounce(async (values: typeof initialValues) => {
    try {
      console.log(values);
    } catch (err) {
      console.error("Auto-save error", err);
    }
  }, 800);

  // Auto-sync when form values change
  useEffect(() => {
    debouncedSave(formik.values);
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Aufträge und Angebote" margin="20px">
        <Box>
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>

          <Box mt={2}>{tabs[selectedTab].component}</Box>
        </Box>
      </CardBox>
    </FormikProvider>
  );
};

export default NewOffer;
