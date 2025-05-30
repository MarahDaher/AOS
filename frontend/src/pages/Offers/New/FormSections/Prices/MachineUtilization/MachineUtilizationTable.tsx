import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { formatNumber } from "@utils/formatNumbers";

interface Props {
  data: any[];
}

export default function MachineUtilizationTable({ data }: Props) {
  return (
    <>
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
              <TableCell width={125}></TableCell>
              <TableCell width={125}>Stunden</TableCell>
              <TableCell width={125}>Tage</TableCell>
              <TableCell width={125}>Wochen à 5 Tage</TableCell>
              <TableCell width={125}>Monate</TableCell>
              <TableCell width={125}>Maschine / Jahr</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{formatNumber(row.hours)}</TableCell>
                <TableCell>{formatNumber(row.days)}</TableCell>
                <TableCell>{formatNumber(row.weeks)}</TableCell>
                <TableCell>{formatNumber(row.months)}</TableCell>
                <TableCell>
                  {row.yearlyRelative != null
                    ? `${formatNumber(row.yearlyRelative)} %`
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
