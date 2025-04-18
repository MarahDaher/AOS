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
import { usePermissions } from "@hooks/usePermissions";

type OfferFormProps = object;

const allTabs = [
  {
    label: "Grunddaten",
    component: <BasicDataTab />,
    permission: { action: "view", subject: "basic_data" },
  },
  {
    label: "Kalkulation",
    component: <CalculationTab />,
    permission: { action: "view", subject: "calculation" },
  },
  {
    label: "Preise",
    component: <PricesTab />,
    permission: { action: "view", subject: "prices" },
  },
  {
    label: "Zeichnung",
    component: <DrawingTab />,
    permission: { action: "view", subject: "drawing" },
  },
  {
    label: "Laufkarte",
    component: <ProcessSheetTab />,
    permission: { action: "view", subject: "process_sheet" },
  },
];

const OfferForm: FunctionComponent<OfferFormProps> = () => {
  // Hooks
  const { id } = useParams();
  const { setOfferId, setOfferData, resetOffer } = useOfferContext();
  const { canView } = usePermissions();
  const tabs = allTabs.filter((tab) => canView(tab.permission.subject));

  // State
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
