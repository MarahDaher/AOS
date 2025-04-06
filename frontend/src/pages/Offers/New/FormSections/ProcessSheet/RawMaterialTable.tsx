import CardBox from "@components/CardBox";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

interface Props {
  materials: {
    name: string;
    color: string;
    type: string;
    supplier: string;
  }[];
}

export default function RawMaterialTable({ materials }: Props) {
  return (
    <CardBox label="Rohstoffe">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bezeichnung</TableCell>
              <TableCell>Farbe</TableCell>
              <TableCell>Typ</TableCell>
              <TableCell>Lieferant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((mat, idx) => (
              <TableRow key={idx}>
                <TableCell>{mat.name}</TableCell>
                <TableCell>{mat.color}</TableCell>
                <TableCell>{mat.type}</TableCell>
                <TableCell>{mat.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardBox>
  );
}
