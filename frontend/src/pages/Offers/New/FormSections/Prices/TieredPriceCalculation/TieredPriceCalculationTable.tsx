import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

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
}

interface Props {
  data: StaffelPriceRow[];
}

export default function TieredPriceCalculationTable({ data }: Props) {
  return (
    <>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              <TableCell>{row.menge?.toLocaleString()}</TableCell>
              <TableCell>
                {row.hourlyRateAddition != null
                  ? `${row.hourlyRateAddition} %`
                  : "-"}
              </TableCell>
              <TableCell>
                {row.hourlyRate ? `${row.hourlyRate.toFixed(2)} €` : "-"}
              </TableCell>
              <TableCell>
                {row.timeCostShare ? `${row.timeCostShare} %` : "-"}
              </TableCell>
              <TableCell>
                {row.setupCosts ? `${row.setupCosts.toFixed(2)} €` : "-"}
              </TableCell>
              <TableCell>
                {row.transport ? `${row.transport.toFixed(2)} €` : "-"}
              </TableCell>
              <TableCell>
                {row.productionTime
                  ? `${row.productionTime.toFixed(1)} h`
                  : "-"}
              </TableCell>
              <TableCell>
                {row.rawMaterialQuantity
                  ? `${row.rawMaterialQuantity.toFixed(2)} kg`
                  : "-"}
              </TableCell>
              <TableCell>
                {row.subtotal ? `${row.subtotal.toFixed(2)} €` : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
