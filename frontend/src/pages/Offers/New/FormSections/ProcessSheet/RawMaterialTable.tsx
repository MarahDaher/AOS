import { OfferRawMaterialCalculatedApi } from "@api/offer-raw-material";
import CardBox from "@components/CardBox";
import { useOfferContext } from "@contexts/OfferProvider";
import { useApiErrorHandler } from "@hooks/useApiErrorHandler";
import { RawMaterialRow } from "@interfaces/RawMaterial.model";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function RawMaterialTable() {
  // Hooks
  const { showError } = useApiErrorHandler();
  const { offerId } = useOfferContext();

  // State
  const [materials, setMaterials] = useState<RawMaterialRow[]>([]);

  const fetchMaterials = async () => {
    try {
      const res =
        await OfferRawMaterialCalculatedApi.getRawMaterialCalculatedByOfferId(
          offerId!
        );
      setMaterials(res);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <CardBox label="Rohstoffe">
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            "& td, & th": {
              textAlign: "right",
            },
            "& td:first-of-type, & th:first-of-type": {
              textAlign: "right",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Rohstoff</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Lieferant</TableCell>
              <TableCell>Rohstoffbedarf [mm²]</TableCell>
              <TableCell>Anteil</TableCell>
              <TableCell>Additives</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((mat, idx) => (
              <TableRow key={idx}>
                <TableCell>{mat.name}</TableCell>
                <TableCell>{mat.type}</TableCell>
                <TableCell>{mat.supplier}</TableCell>
                <TableCell>{mat.absolut_demand}</TableCell>
                <TableCell>{mat.share}</TableCell>
                <TableCell>
                  {mat._additives_concatenated
                    ? mat._additives_concatenated
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardBox>
  );
}
