import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@utils/formatNumbers";

interface TieredPriceInkl {
  staffel: string;
  staffel_m: number;
  staffel_stk: number;
}

interface Props {
  title: string;
  data: TieredPriceInkl[];
}

export default function TieredPriceInklTable({ title, data }: Props) {
  return (
    <>
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Staffel</TableCell>
            <TableCell>Staffel / m</TableCell>
            <TableCell>Staffel / stk</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              <TableCell>{formatCurrency(row.staffel_m)}</TableCell>
              <TableCell>{formatCurrency(row.staffel_stk)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
