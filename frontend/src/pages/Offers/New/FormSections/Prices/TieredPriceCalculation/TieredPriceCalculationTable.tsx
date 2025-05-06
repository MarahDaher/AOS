import FormIntField from "@components/FormInputs/FormIntField";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { formatNumber, formatCurrency } from "@utils/formatNumbers";

interface StaffelPriceRow {
  staffel: string;
  Menge?: number;
  AufschlagStundensatz?: number;
  Stundensatz?: number;
  Zeitkostenanteil?: number;
  Rüstkosten?: number;
  Transport?: number;
  Produktionszeit?: number;
  Rohstoffmenge?: number;
  Zwischensumme?: number;
  Zeitkosten?: number;
  Rohstoffpreis?: number;
  Zwischensumme2?: number;
  Zwischensumme2m?: number;
}

interface Props {
  data: StaffelPriceRow[];
  isEditable: boolean;
}

export default function TieredPriceCalculationTable({
  data,
  isEditable,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        sx={{
          "& td, & th": {
            textAlign: "right",
          },
          "& td:first-of-type, & th:first-of-type": {
            textAlign: "left",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Staffel</TableCell>
            <TableCell align="right">Menge</TableCell>
            <TableCell>Aufschlag Stundensatz</TableCell>
            <TableCell>Stundensatz</TableCell>
            <TableCell>Zeitkostenanteil</TableCell>
            <TableCell>Rüstkosten</TableCell>
            <TableCell>Transport</TableCell>
            <TableCell>Produktionszeit</TableCell>
            <TableCell>Rohstoffmenge</TableCell>
            <TableCell>Zwischensumme</TableCell>
            <TableCell>Zeitkosten</TableCell>
            <TableCell>Rohstoffpreis</TableCell>
            <TableCell>Zwischensumme 2</TableCell>
            <TableCell>Zwischensumme 2 / m</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.staffel}</TableCell>
              <TableCell>
                {row.Menge != null ? `${formatNumber(row.Menge)}` : "-"}
              </TableCell>

              <TableCell>
                {row.staffel !== "A" && isEditable ? (
                  <FormIntField
                    variant={"standard"}
                    name={`pricing_grad_qty${row.staffel}_add_hourlyrate`}
                    fullWidth
                    hiddenLabel={true}
                    alignText="right"
                  />
                ) : row.AufschlagStundensatz != null ? (
                  `${formatNumber(row.AufschlagStundensatz)} %`
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{formatCurrency(row.Stundensatz)}</TableCell>

              <TableCell>
                {row.Zeitkostenanteil != null
                  ? `${formatNumber(row.Zeitkostenanteil)} %`
                  : "-"}
              </TableCell>

              <TableCell>
                {row.staffel !== "A" && isEditable ? (
                  <FormIntField
                    name={`pricing_grad_qty${row.staffel}_add_setupcosts`}
                    variant={"standard"}
                    fullWidth
                    hiddenLabel={true}
                    alignText="right"
                  />
                ) : row.Rüstkosten != null ? (
                  `${formatCurrency(row.Rüstkosten)}`
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {row.staffel !== "A" && isEditable ? (
                  <FormIntField
                    name={`pricing_grad_qty${row.staffel}_add_transport`}
                    fullWidth
                    variant={"standard"}
                    hiddenLabel={true}
                    alignText="right"
                  />
                ) : row.Transport != null ? (
                  `${formatCurrency(row.Transport)}`
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {row.Produktionszeit != null
                  ? `${formatNumber(row.Produktionszeit, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} h`
                  : "-"}
              </TableCell>
              <TableCell>{formatNumber(row.Rohstoffmenge)} kg</TableCell>
              <TableCell>{formatCurrency(row.Zwischensumme)}</TableCell>
              <TableCell>{formatCurrency(row.Zeitkosten)}</TableCell>
              <TableCell>{formatCurrency(row.Rohstoffpreis)}</TableCell>
              <TableCell>{formatCurrency(row.Zwischensumme2)}</TableCell>

              <TableCell>{formatCurrency(row.Zwischensumme2m)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
