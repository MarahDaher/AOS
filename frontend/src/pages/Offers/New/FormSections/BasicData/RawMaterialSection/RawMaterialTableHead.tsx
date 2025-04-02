import { TableCell, TableRow, TableHead } from "@mui/material";

const RawMaterialTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell width="250px">Rohstoff</TableCell>
      <TableCell width="150px">Typ</TableCell>
      <TableCell width="150px">Lieferant</TableCell>
      <TableCell width="150px">Anteil [%]</TableCell>
      <TableCell>Preisstand</TableCell>
      <TableCell>Preis [€]</TableCell>
      <TableCell>Preis - Sko [€]</TableCell>
      <TableCell>Preis (anteilig) [€]</TableCell>
      <TableCell>Preis - Sko (anteilig) [€]</TableCell>
    </TableRow>
  </TableHead>
);

export default RawMaterialTableHead;
