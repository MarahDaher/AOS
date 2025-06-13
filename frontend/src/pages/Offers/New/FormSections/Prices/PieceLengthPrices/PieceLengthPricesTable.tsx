import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import { FormikProvider, FormikContextType } from "formik";
import { formatCurrency } from "@utils/formatNumbers";
import FormIntField from "@components/FormInputs/FormIntField";
import { usePermissions } from "@hooks/usePermissions";

export interface PieceLengthPriceRow {
  menge: number;
  staffelM: number;
  length1: number;
  length2: number;
  length3: number;
  length4: number;
  length5: number;
}

interface Props {
  data: PieceLengthPriceRow[];
  formik: FormikContextType<any>;
}

export default function PieceLengthPricesTable({ data, formik }: Props) {
  const { canEdit } = usePermissions();
  const isEditable = canEdit("prices");

  const lengthKeys = [
    "pricing_piece_length_prices_length1",
    "pricing_piece_length_prices_length2",
    "pricing_piece_length_prices_length3",
    "pricing_piece_length_prices_length4",
    "pricing_piece_length_prices_length5",
  ];

  return (
    <FormikProvider value={formik}>
      <Box>
        <TableContainer component={Paper}>
          <Table
            size="small"
            sx={{
              "& td, & th": { textAlign: "right" },
              "& td:first-of-type, & th:first-of-type": { textAlign: "right" },
            }}
          >
            <TableHead>
              {/* First row: inputs */}
              <TableRow>
                <TableCell />
                <TableCell />
                {lengthKeys.map((key, idx) => (
                  <TableCell key={key}>
                    <FormIntField
                      name={key}
                      label={`Länge ${idx + 1} [mm]`}
                      alignText="right"
                      disabled={!isEditable}
                    />
                  </TableCell>
                ))}
              </TableRow>

              {/* Second row: dynamic headers */}
              <TableRow>
                <TableCell width={125}>Menge</TableCell>
                <TableCell width={125}>Staffel / m</TableCell>
                {lengthKeys.map((key, idx) => (
                  <TableCell key={key} width={125}>
                    {formik.values?.[key]
                      ? `Länge ${formik.values[key]} [mm]`
                      : `Länge ${idx + 1} [mm]`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {row.menge != null ? `${row.menge}` : "-"}m
                  </TableCell>
                  <TableCell>{formatCurrency(row.staffelM)}</TableCell>
                  <TableCell>{formatCurrency(row.length1)} / stk</TableCell>
                  <TableCell>{formatCurrency(row.length2)} / stk</TableCell>
                  <TableCell>{formatCurrency(row.length3)} / stk</TableCell>
                  <TableCell>{formatCurrency(row.length4)} / stk</TableCell>
                  <TableCell>{formatCurrency(row.length5)} / stk</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FormikProvider>
  );
}
