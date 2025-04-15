import { FunctionComponent, useEffect, useState } from "react";
import CardBox from "../../../components/CardBox";
import BasicDataTab from "./Tabs/BasicData";
import CalculationTab from "./Tabs/Calculation";
import PricesTab from "./Tabs/Prices";
import DrawingTab from "./Tabs/Drawing";
import ProcessSheetTab from "./Tabs/ProcessSheet";
import { Box, Tab, Tabs } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { initialValues } from "./Index";
import { useParams } from "react-router-dom";
import { useOfferContext } from "@contexts/OfferProvider";
import { OffersApi } from "@api/offers";

type OfferFormProps = object;

const tabs = [
  { label: "Grunddaten", component: <BasicDataTab /> },
  { label: "Kalkulation", component: <CalculationTab /> },
  { label: "Preise", component: <PricesTab /> },
  { label: "Zeichnung", component: <DrawingTab /> },
  { label: "Laufkarte", component: <ProcessSheetTab /> },
];

const OfferForm: FunctionComponent<OfferFormProps> = () => {
  const { id } = useParams();
  const { setOfferId, setOfferData, resetOffer } = useOfferContext();

  const [selectedTab, setSelectedTab] = useState(() => {
    const saved = localStorage.getItem("offer_form_selected_tab");
    return saved !== null ? Number(saved) : 0;
  });

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  // Functions
  const loadOffer = async () => {
    try {
      if (id) {
        const res = await OffersApi.getOfferById(Number(id));
        setOfferId(res.id);
        setOfferData(res);
      } else {
        resetOffer();
      }
    } catch (err) {
      console.error("Failed to load offer", err);
    }
  };

  useEffect(() => {
    loadOffer();
    return () => localStorage.removeItem("offer_form_selected_tab");
  }, [id]);

  return (
    <FormikProvider value={formik}>
      <CardBox label="Aufträge und Angebote" margin="20px">
        <Box>
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={(_, newValue) => {
              setSelectedTab(newValue);
              localStorage.setItem(
                "offer_form_selected_tab",
                newValue.toString()
              );
            }}
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

export default OfferForm;
