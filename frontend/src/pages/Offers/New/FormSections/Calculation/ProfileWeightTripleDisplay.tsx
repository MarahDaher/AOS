import { FC } from "react";
import { TextField } from "@mui/material";
import { useOfferContext } from "@contexts/OfferProvider";

const ProfileWeightTripleDisplay: FC = () => {
  const { offerDetails } = useOfferContext();
  const a = offerDetails._calculation_working_profile_weight_lowerborder;
  const b = offerDetails._calculation_working_profile_weight_average;
  const c = offerDetails._calculation_working_profile_weight_upperborder;

  const formatNumber = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? "-" : num.toFixed(1);
  };

  const displayValue = `(${formatNumber(a)}) ${formatNumber(b)} (${formatNumber(
    c
  )})`;

  return (
    <TextField
      label="Profilgewicht [gr./m]"
      value={displayValue}
      slotProps={{
        input: {
          readOnly: true,
        },
      }}
      variant="filled"
      fullWidth
      disabled
      sx={{
        border: "none",
        "& .MuiInputBase-root": {
          backgroundColor: "#0000000f",
        },
      }}
    />
  );
};

export default ProfileWeightTripleDisplay;
