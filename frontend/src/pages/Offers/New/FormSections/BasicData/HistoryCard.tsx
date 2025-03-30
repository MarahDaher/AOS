import CardBox from "@components/CardBox";
import { Box, Typography } from "@mui/material";
import { CARD_HEIGHT } from "@utils/constantValue";
import { formatGermanDate } from "@utils/formatGermanDate";
import { FunctionComponent } from "react";
import { useOfferContext } from "@contexts/OfferProvider";

const HistoryCard: FunctionComponent = () => {
  const { offerDetails } = useOfferContext();
  const formattedDate = formatGermanDate(offerDetails.general_creation_date);

  return (
    <>
      {offerDetails && (
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
                {offerDetails.created_by_user?.name}
              </Typography>
            </Box>
          </Box>
        </CardBox>
      )}
    </>
  );
};

export default HistoryCard;
