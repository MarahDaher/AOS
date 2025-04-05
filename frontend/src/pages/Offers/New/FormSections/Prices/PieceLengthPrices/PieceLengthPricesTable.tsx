import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

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
          "& td:first-of-type, & th:first-of-type": { textAlign: "left" },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Menge</TableCell>
            <TableCell>Staffel / m</TableCell>
            <TableCell>Länge 625mm</TableCell>
            <TableCell>Länge 1.000mm</TableCell>
            <TableCell>Länge 1.250mm</TableCell>
            <TableCell>Länge 1.333mm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.menge.toLocaleString()}m</TableCell>
              <TableCell>{row.staffelM?.toFixed(2)} €</TableCell>
              <TableCell>{row.length625mm?.toFixed(2)} € / stk</TableCell>
              <TableCell>{row.length1000mm?.toFixed(2)} € / stk</TableCell>
              <TableCell>{row.length1250mm?.toFixed(2)} € / stk</TableCell>
              <TableCell>{row.length1333mm?.toFixed(2)} € / stk</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
