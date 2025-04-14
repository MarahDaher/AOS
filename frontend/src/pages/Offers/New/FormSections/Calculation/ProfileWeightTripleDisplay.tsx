import { FC } from "react";
import { useFormikContext } from "formik";
import { TextField } from "@mui/material";

const ProfileWeightTripleDisplay: FC = () => {
  const { values } = useFormikContext<any>();
  const a = values._calculation_working_profile_weight_lowerborder;
  const b = values.runningcard_profile_weight_IST;
  const c = values._calculation_working_profile_weight_upperborder;

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
