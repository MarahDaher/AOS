import { TableCell, TableRow, TableHead } from "@mui/material";

const RawMaterialTableHead = () => (
  <TableHead>
    <TableRow>
      {/* id */}
      <TableCell>Rohstoff</TableCell>
      {/* type */}
      <TableCell>Typ</TableCell>
      {/* supplier */}
      <TableCell>Lieferant</TableCell>
      {/* offers_raw_materials.total_demand */}
      <TableCell>Rohstoffbedarf [mm²]</TableCell>
      {/* share */}
      <TableCell>Anteil [%]</TableCell>
      {/* price_date */}
      <TableCell>Preisstand</TableCell>
      {/* price */}
      <TableCell>Preis / kg [€]</TableCell>
      {/* _price_minus_discount */}
      <TableCell>Preis - Sko [€]</TableCell>
      {/* additives */}
      <TableCell>Additive</TableCell>
      {/* _additives_price_sum */}
      <TableCell>Preis Additive [€]</TableCell>
      {/* _price_share */}
      <TableCell>Preis (anteilig) [€]</TableCell>
      {/* _price_minus_discount_share */}
      <TableCell>Preis - Sko (anteilig) [€]</TableCell>

      <TableCell></TableCell>
    </TableRow>
  </TableHead>
);

export default RawMaterialTableHead;
