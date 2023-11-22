import { useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableNoData from "./table-no-data";
import NotesTableRow from "./table-row";
import NotesTableHead from "./table-head";
import TableEmptyRows from "./table-empty-rows";
import NotesTableToolbar from "./table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./utils";
import { notes } from "helpers/fetch-notes-data";
import { Box } from "@mui/material";

// import Scrollbar from "src/components/scrollbar";

// ----------------------------------------------------------------------

export default function NotesPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("title");

  const [filterQuestion, setFilterQuestion] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notes.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByQuestion = (event) => {
    setPage(0);
    setFilterQuestion(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: notes,
    comparator: getComparator(order, orderBy),
    filterQuestion,
  });

  const notFound = !dataFiltered.length && !!filterQuestion;

  return (
    <Container>
      <Box minHeight="100vh">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Notes</Typography>
        </Stack>

        <Card>
          <NotesTableToolbar
            numSelected={selected.length}
            filterQuestion={filterQuestion}
            onFilterQuestion={handleFilterByQuestion}
          />

          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <NotesTableHead
                order={order}
                orderBy={orderBy}
                rowCount={notes.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "title", label: "Question" },
                  { id: "note", label: "Answer" },
                  // { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <NotesTableRow
                      key={row.id}
                      title={row.title}
                      note={row.note}
                      selected={selected.indexOf(row.title) !== -1}
                      handleClick={(event) => handleClick(event, row.title)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, notes.length)}
                />

                {notFound && <TableNoData query={filterQuestion} />}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            page={page}
            component="div"
            count={notes.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Box>
    </Container>
  );
}
