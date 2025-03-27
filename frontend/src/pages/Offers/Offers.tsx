import AddIcon from "@mui/icons-material/Add";
import CardBox from "../../components/CardBox";
import IconAction from "@components/IconAction";
import RoundedIconButton from "@components/RoundedIconButton";
import { Box } from "@mui/material";
import { ContentCopy, Edit, ShoppingBasket } from "@mui/icons-material";
import { FunctionComponent } from "react";
import { MTable } from "@components/MTable";
import { OfferColumns, tableData } from "./Columns";
import { useNavigate } from "react-router-dom";

type OffersPageProps = object;

const OffersPage: FunctionComponent<OffersPageProps> = () => {
  // Hooks
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/angebote/neu");
  };

  return (
    <>
      <Box p={2}>
        <CardBox label="Aufträge und Angebote">
          <MTable
            data={tableData}
            searchableField="profilbezeichnung"
            columns={OfferColumns}
            actions={(row) => (
              <>
                <IconAction
                  tooltip="Als Word exportieren"
                  onClick={() => console.log("Export as Word")}
                >
                  <ShoppingBasket fontSize="small" />
                </IconAction>

                <IconAction
                  tooltip="Angebot duplizieren"
                  onClick={() => console.log("Duplicate Offer")}
                >
                  <ContentCopy fontSize="small" />
                </IconAction>

                <IconAction
                  tooltip="Bearbeiten"
                  onClick={() => console.log("Edit")}
                >
                  <Edit fontSize="small" />
                </IconAction>
                {/* <IconAction tooltip="Löschen" onClick={() => handleDelete(row)}>
                         <Delete fontSize="small" />
                       </IconAction> */}
              </>
            )}
          />

          {/* Add Button */}
          <RoundedIconButton
            icon={<AddIcon fontSize="small" />}
            label="NEU"
            onClick={handleAdd}
          />
        </CardBox>
      </Box>
    </>
  );
};

export default OffersPage;
