import { TableCell, TableRow, TableHead } from "@mui/material";

const RawMaterialTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell>Rohstoff</TableCell>
      <TableCell>Typ</TableCell>
      <TableCell>Lieferant</TableCell>
      <TableCell>Anteil [%]</TableCell>
      <TableCell>Preisstand</TableCell>
      <TableCell>Preis Rohstoff [€]</TableCell>
      <TableCell>Additive</TableCell>
      <TableCell>Preis Additive [€]</TableCell>
      <TableCell>Preis gesamt [€]</TableCell>
      <TableCell>Preis - Sko [€]</TableCell>
      <TableCell>Preis (anteilig) [€]</TableCell>
      <TableCell>Preis - Sko (anteilig) [€]</TableCell>

      <TableCell></TableCell>
    </TableRow>
  </TableHead>
);

export default RawMaterialTableHead;
