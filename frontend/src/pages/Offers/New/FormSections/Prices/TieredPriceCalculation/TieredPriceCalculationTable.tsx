import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { formatNumber, formatCurrency } from "@utils/formatNumbers";

interface StaffelPriceRow {
  staffel: string;
  menge?: number;
  hourlyRateAddition?: number;
  hourlyRate?: number;
  timeCostShare?: number;
  setupCosts?: number;
  transport?: number;
  productionTime?: number;
  rawMaterialQuantity?: number;
  subtotal?: number;
  subtotalM?: number;
}

interface Props {
  data: StaffelPriceRow[];
}

export default function TieredPriceCalculationTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{
          "& td, & th": {
            textAlign: "right",
          },
          "& td:first-of-type, & th:first-of-type": {
            textAlign: "left",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Staffel</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell>Aufschlag Stundensatz</TableCell>
            <TableCell>Stundensatz</TableCell>
            <TableCell>Zeitkostenanteil</TableCell>
            <TableCell>Rüstkosten</TableCell>
            <TableCell>Transport</TableCell>
            <TableCell>Produktionszeit</TableCell>
            <TableCell>Rohstoffmenge</TableCell>
            <TableCell>Zwischensumme</TableCell>
            <TableCell>Zwischensumme / m</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              <TableCell>{row.menge?.toLocaleString() ?? "-"}</TableCell>
              <TableCell>
                {row.hourlyRateAddition != null
                  ? `${formatNumber(row.hourlyRateAddition)} %`
                  : "-"}
              </TableCell>
              <TableCell>{formatCurrency(row.hourlyRate)}</TableCell>
              <TableCell>
                {row.timeCostShare != null
                  ? `${formatNumber(row.timeCostShare)} %`
                  : "-"}
              </TableCell>
              <TableCell>{formatCurrency(row.setupCosts)}</TableCell>
              <TableCell>{formatCurrency(row.transport)}</TableCell>
              <TableCell>
                {row.productionTime != null
                  ? `${formatNumber(row.productionTime, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} h`
                  : "-"}
              </TableCell>
              <TableCell>{formatNumber(row.rawMaterialQuantity)} kg</TableCell>
              <TableCell>{formatCurrency(row.subtotal)}</TableCell>
              <TableCell>{formatCurrency(row.subtotalM)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
