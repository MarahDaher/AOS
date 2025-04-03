import { FC } from "react";
import { useFormikContext } from "formik";
import { TextField } from "@mui/material";

const ProfileWeightTripleDisplay: FC = () => {
  const { values } = useFormikContext<any>();
  const a = values._calculation_working_profile_weight_lowerborder;
  const b = values._calculation_working_profile_weight_average;
  const c = values._calculation_working_profile_weight_upperborder;

  const displayValue = `(${a?.toFixed(1)}) ${b?.toFixed(1)} (${c?.toFixed(1)})`;

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
