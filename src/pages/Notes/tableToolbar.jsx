import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import fetchNotes from 'functions/fetchNotes';
import { message } from 'antd';
import useDelete from 'functions/deleteNotes';
import { CircularProgress } from '@mui/material';

export default function NotesTableToolbar({
  selected,
  numSelected,
  filterQuestion,
  onFilterQuestion,
  notes,
  setNotes,
  setSelected,
}) {
  const { isLoading, response, deleteNotes } = useDelete();
  const handleDeleteNotes = async () => {
    await deleteNotes(selected);
    selected.length = 0;
    fetchNotes()
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        message.error(response.message);
      });
  };

  useEffect(() => {
    if (response) {
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    }
  }, [response]);

  return (
    <Toolbar
        disableGutters
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
          m: 0,
       pl: 3,
          pr: 3,
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
            size={'small'}
          value={filterQuestion}
          onChange={onFilterQuestion}
          placeholder="Type to search..."
          sx={{pl: 2}}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteNotes} disabled={isLoading}>
            {isLoading && <CircularProgress />}
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
