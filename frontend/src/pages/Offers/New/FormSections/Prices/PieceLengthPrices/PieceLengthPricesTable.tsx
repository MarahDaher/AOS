import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { formatCurrency } from "@utils/formatNumbers";

export interface PieceLengthPriceRow {
  menge: number;
  staffelM: number;
  length625mm: number;
  length1000mm: number;
  length1250mm: number;
  length1333mm: number;
}

interface Props {
  data: PieceLengthPriceRow[];
}

export default function PieceLengthPricesTable({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{
          "& td, & th": { textAlign: "right" },
          "& td:first-of-type, & th:first-of-type": { textAlign: "right" },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width={125}>Menge</TableCell>
            <TableCell width={125}>Staffel / m</TableCell>
            <TableCell width={125}>Länge 625mm</TableCell>
            <TableCell width={125}>Länge 1.000mm</TableCell>
            <TableCell width={125}>Länge 1.250mm</TableCell>
            <TableCell width={125}>Länge 1.333mm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.menge != null ? `${row.menge}` : "-"}m</TableCell>
              <TableCell>{formatCurrency(row.staffelM)}</TableCell>
              <TableCell>{formatCurrency(row.length625mm)} / stk</TableCell>
              <TableCell>{formatCurrency(row.length1000mm)} / stk</TableCell>
              <TableCell>{formatCurrency(row.length1250mm)} / stk</TableCell>
              <TableCell>{formatCurrency(row.length1333mm)} / stk</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
