import { FC } from "react";
import { TextField } from "@mui/material";
import { formatNumberToGerman } from "@utils/formatNumbers";
import { useOfferContext } from "@contexts/OfferProvider";

const ToolCostsCustomerView: FC = () => {
  const { offerDetails } = useOfferContext();

  const customerCost = offerDetails.calculation_working_tool_costs_customer;
  const customerRelative =
    offerDetails._calculation_working_tool_costs_customer_relative;

  const format = (val: any) => {
    const num = Number(val);
    return isNaN(num) ? "-" : formatNumberToGerman(num);
  };

  const displayValue = `${format(customerCost)} (${Number(
    customerRelative || 0
  ).toFixed(2)} %)`;

  return (
    <TextField
      label="Werkzeugkosten Kunde [€]"
      value={displayValue}
      variant="filled"
      fullWidth
      disabled
      slotProps={{
        input: {
          readOnly: true,
        },
      }}
      sx={{
        border: "none",
        "& .MuiInputBase-root": {
          backgroundColor: "#0000000f",
        },
      }}
    />
  );
};

export default ToolCostsCustomerView;
