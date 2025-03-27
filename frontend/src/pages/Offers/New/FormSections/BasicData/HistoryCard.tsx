import CardBox from "@components/CardBox";
import { Box, Typography } from "@mui/material";
import { CARD_HEIGHT } from "@utils/constantValue";
import { formatGermanDate } from "@utils/formatGermanDate";
import { FunctionComponent } from "react";
import { useFormikContext } from "formik";

const HistoryCard: FunctionComponent = () => {
  const { values } = useFormikContext<any>();
  const formattedDate = formatGermanDate(values.general_creation_date);

  return (
    <CardBox label="Historie" height={CARD_HEIGHT}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="caption" sx={{ color: "gray" }}>
            erstellt am
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {formattedDate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: "gray" }}>
            erstellt von
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {values.created_by_user_name || "Michael Diebner"}
          </Typography>
        </Box>
      </Box>
    </CardBox>
  );
};

export default HistoryCard;
