import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

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
  const mapStaffelpreise = (rawData: any[]): TieredPriceInkl[] => {
    return rawData.map((item) => {
      const staffel = item.staffel;
      const suffix = staffel; // because Staffel "A" => Suffix "A"

      const staffel_m =
        item[
          `_pricing_endprices_graduated_with_confection_lfm_quantity${suffix}`
        ];
      const staffel_stk =
        item[
          `_pricing_endprices_graduated_with_confection_stk_quantity${suffix}`
        ];

      return {
        staffel,
        staffel_m,
        staffel_stk,
      };
    });
  };

  const mappedData = mapStaffelpreise(data);

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
          {mappedData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              <TableCell>{row.staffel_m.toFixed(2)} €</TableCell>
              <TableCell>{row.staffel_stk.toFixed(2)} €</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
