import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
  TextField,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { Props } from "../shared/models/types/Table";

export function MTable<T>({
  data,
  columns,
  rowsPerPageOptions = [10, 14, 20],
  actions,
  searchableField,
  loading = false,
}: Props<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [search, setSearch] = useState("");

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = searchableField
    ? data.filter((row) =>
        String(row[searchableField])
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : data;

  const paginated = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={0}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          size="small"
          placeholder="Suchen"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <GridSearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box p={0} minHeight={0}>
        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col, i) => (
                  <TableCell key={i}>{col.label}</TableCell>
                ))}
                {actions && <TableCell align="right"></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    align="center"
                  >
                    <Box py={3}>
                      <CircularProgress size={28} />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    align="center"
                  >
                    Keine Daten vorhanden
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((col, j) => (
                      <TableCell key={j}>{col.render(row)}</TableCell>
                    ))}
                    {actions && (
                      <TableCell align="right">{actions(row)}</TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
