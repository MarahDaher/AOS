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
  const mapStaffelpreise = (rawData: any[]): TieredPrice[] => {
    return rawData.map((item) => {
      const staffel = item.staffel;
      const suffix = staffel; // because Staffel "A" => Suffix "A"

      const menge = item[`calculation_quantity${suffix}`];
      const staffel_m =
        item[
          `_pricing_endprices_graduated_prices_without_confection_lfm_quantity${suffix}`
        ];
      const staffel_stk =
        item[
          `_pricing_endprices_graduated_prices_without_confection_stk_quantity${suffix}`
        ];
      const stueck =
        item[`_pricing_endprices_graduated_prices_pieces_quantity${suffix}`];

      return {
        staffel,
        menge,
        staffel_m,
        staffel_stk,
        stueck,
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
            {showFull && <TableCell>Menge</TableCell>}
            <TableCell>Staffel / m</TableCell>
            <TableCell>Staffel / stk</TableCell>
            {showFull && <TableCell>Stück</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              {showFull && (
                <TableCell>{row.menge?.toLocaleString() ?? "-"}</TableCell>
              )}
              <TableCell>{(row.staffel_m ?? 0).toFixed(2)} €</TableCell>
              <TableCell>{(row.staffel_stk ?? 0).toFixed(2)} €</TableCell>
              {showFull && <TableCell>{row.stueck ?? "-"}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
