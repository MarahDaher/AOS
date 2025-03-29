import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import axios from "axios";
import debounce from "lodash/debounce";

const FIELDS_THAT_TRIGGER_CALCULATION = [
  "raw_material_price",
  // Add more trigger fields
];

export const useCalculatedValues = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const previousValues = useRef<any>({});

  const triggerCalculation = debounce(async (payload: any) => {
    try {
      const response = await axios.post("/api/offer/calculate", payload);
      const calculated = response.data;

      // update calculated fields
      setFieldValue("total_price", calculated.total_price);
      setFieldValue("total_weight", calculated.total_weight);
      // ... add any other updates
    } catch (err) {
      console.error("Calculation error:", err);
    }
  }, 800);

  useEffect(() => {
    const changed = FIELDS_THAT_TRIGGER_CALCULATION.some((field) => {
      return values[field] !== previousValues.current[field];
    });

    if (changed) {
      const payload = FIELDS_THAT_TRIGGER_CALCULATION.reduce((acc, key) => {
        acc[key] = values[key];
        return acc;
      }, {} as Record<string, any>);

      triggerCalculation(payload);
      previousValues.current = { ...values };
    }
  }, [values]);
};
