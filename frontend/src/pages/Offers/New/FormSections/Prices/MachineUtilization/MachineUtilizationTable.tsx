import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

interface MachineUtilizationRow {
  label: string;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  yearlyRelative?: number;
}

interface Props {
  data: MachineUtilizationRow[];
}

export default function MachineUtilizationTable({ data }: Props) {
  return (
    <>
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
              <TableCell></TableCell>
              <TableCell>Stunden</TableCell>
              <TableCell>Tage</TableCell>
              <TableCell>Wochen à 5 Tage</TableCell>
              <TableCell>Monate</TableCell>
              <TableCell>Maschine / Jahr</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.label}</TableCell>
                <TableCell>{row.hours?.toLocaleString()}</TableCell>
                <TableCell>{row.days?.toFixed(1)}</TableCell>
                <TableCell>{row.weeks?.toFixed(1)}</TableCell>
                <TableCell>{row.months?.toFixed(1)}</TableCell>
                <TableCell>
                  {row.yearlyRelative != null
                    ? `${row.yearlyRelative.toFixed(1)} %`
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
