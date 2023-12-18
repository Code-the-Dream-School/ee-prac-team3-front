import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from './tableNoData';
import NotesTableRow from './tableRow';
import NotesTableHead from './tableHead';
import TableEmptyRows from './tableEmptyRows';
import NotesTableToolbar from './tableToolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import NewNoteForm from './NoteForm';
import fetchNotes from 'functions/fetchNotes';
import { message } from 'antd';
import Loading from 'components/Loading';

export default function Notes() {
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [page, setPage] = useState(0);
  const [notes, setNotes] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('title');

  const [filterQuestion, setFilterQuestion] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPopup, setOpenPopup] = useState(false);
  const [editNote, setEditNote] = useState('');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = notes.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleEditNote = (event, noteId) => {
    const selectedNote = notes.filter((note) => note._id === noteId);
    setEditNote(selectedNote[0]);
    setOpenPopup(true);
  };

  const handleClick = (event, notesid) => {
    const selectedIndex = selected.indexOf(notesid);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, notesid);
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

  const notFound = !dataFiltered?.length && !!filterQuestion;

  useEffect(() => {
    setLoadingNotes(true);
    fetchNotes()
      .then((data) => {
        setNotes(data);
        setLoadingNotes(false);
      })
      .catch((err) => {
        setLoadingNotes(false);
        message.error('Something went wrong, please try again later!');
      });
  }, []);

  return (
    <div style={{ background: '#F5F5F5' }}>
      <Container>
        <Box minHeight="100vh">
          {loadingNotes && <Loading />}
          <Button
            variant="contained"
            style={{ background: '#243153', textTransform: 'none' }}
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
              setEditNote([{ title: '', note: '' }]);
            }}
            sx={{ mt: 4, borderRadius: 35 }}
          >
            New Note
          </Button>
          <NewNoteForm
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            editNote={editNote}
            notes={notes}
            setNotes={setNotes}
          />
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <NotesTableToolbar
              selected={selected}
              numSelected={selected.length}
              filterQuestion={filterQuestion}
              onFilterQuestion={handleFilterByQuestion}
              notes={notes}
              setNotes={setNotes}
            />

            <Table sx={{ minWidth: 800 }}>
              <NotesTableHead
                order={order}
                orderBy={orderBy}
                rowCount={notes?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: 'Title' },
                  { id: 'note', label: 'Content' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((notes) => (
                    <NotesTableRow
                      key={notes._id}
                      title={notes.title}
                      note={notes.note}
                      selected={selected.indexOf(notes._id) !== -1}
                      handleClick={(event) => handleClick(event, notes._id)}
                      handleEditNote={(event) =>
                        handleEditNote(event, notes._id)
                      }
                      setSelected={setSelected}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, notes?.length)}
                />

                {notFound && <TableNoData query={filterQuestion} />}
              </TableBody>
            </Table>

            <TablePagination
              page={page}
              component="div"
              count={notes?.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}