import AddIcon from "@mui/icons-material/Add";
import CardBox from "../../components/CardBox";
import IconAction from "@components/IconAction";
import RoundedIconButton from "@components/RoundedIconButton";
import { Box, CircularProgress } from "@mui/material";
import { ContentCopy, Edit, ShoppingBasket } from "@mui/icons-material";
import { FunctionComponent, useEffect, useState } from "react";
import { MTable } from "@components/MTable";
import { OfferColumns } from "./Columns";
import { OffersApi } from "@api/offers";
import { OffersModel } from "@interfaces/Offers.model";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { useNavigate } from "react-router-dom";
import { useOfferContext } from "@contexts/OfferProvider";

type OffersPageProps = object;

const OffersPage: FunctionComponent<OffersPageProps> = () => {
  // Hooks
  const navigate = useNavigate();
  const { showError } = useApiErrorHandler();
  const { resetOffer } = useOfferContext();

  // State
  const [offers, setOffers] = useState<OffersModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [exportingOfferId, setExportingOfferId] = useState<number | null>(null);

  const handleAdd = () => {
    resetOffer();
    navigate("/angebote/neu");
  };

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await OffersApi.getAllOffers();
      setOffers(res);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (offerId: number) => {
    try {
      await OffersApi.duplicateOffer(offerId);
      await fetchOffers();
      // navigate(`/angebote/${res.offer.id}`);
    } catch (error) {
      showError(error);
    }
  };

  const handleExport = async (offerId: number) => {
    try {
      setExportingOfferId(offerId);
      await OffersApi.export(offerId);

      // ⏳ Wait a little so user can see spinner
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      showError(error);
    } finally {
      setExportingOfferId(null);
    }
  };
  //LifeCycles
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <>
      <Box p={2}>
        <CardBox label="Aufträge und Angebote">
          <MTable
            data={offers}
            searchableField="general_customer"
            columns={OfferColumns}
            loading={loading}
            actions={(row) => (
              <>
                <IconAction
                  tooltip="Als Word exportieren"
                  onClick={() => handleExport(row.id)}
                  disabled={exportingOfferId === row.id}
                >
                  {exportingOfferId === row.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <ShoppingBasket fontSize="small" />
                  )}
                </IconAction>

                <IconAction
                  tooltip="Angebot duplizieren"
                  onClick={() => handleDuplicate(row.id)}
                >
                  <ContentCopy fontSize="small" />
                </IconAction>

                <IconAction
                  tooltip="Bearbeiten"
                  onClick={() => navigate(`/angebote/${row.id}`)}
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
