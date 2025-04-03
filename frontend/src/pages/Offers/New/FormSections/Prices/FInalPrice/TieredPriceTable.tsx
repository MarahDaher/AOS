import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

interface TieredPrice {
  staffel: string;
  menge?: number;
  staffel_m: number;
  staffel_stk: number;
  stueck?: number;
}

interface Props {
  title: string;
  data: TieredPrice[];
  showFull?: boolean;
}

export default function TieredPriceTable({
  title,
  data,
  showFull = false,
}: Props) {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Staffel</TableCell>
            {showFull && <TableCell>Menge</TableCell>}
            <TableCell>Staffel / m</TableCell>
            <TableCell>Staffel / stk</TableCell>
            {showFull && <TableCell>Stück</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              {showFull && <TableCell>{row.menge?.toLocaleString()}</TableCell>}
              <TableCell>{row.staffel_m.toFixed(2)} €</TableCell>
              <TableCell>{row.staffel_stk.toFixed(2)} €</TableCell>
              {showFull && <TableCell>{row.stueck}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
