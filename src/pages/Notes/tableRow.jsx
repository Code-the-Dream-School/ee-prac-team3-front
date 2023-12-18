import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export default function NotesTableRow({
  selected,
  title,
  note,
  handleClick,
  handleEditNote,
}) {
  return (
    <TableRow
      hover
      tabIndex={-1}
      role="checkbox"
      selected={selected}
      onDoubleClick={() => handleEditNote(null)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          disableRipple
          checked={selected}
          onChange={handleClick}
          sx={{ ml: 1 }}
        />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" style={{ wordBreak: 'break-word' }}>
            {title}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" style={{ wordBreak: 'break-word' }}>
          {note}
        </Typography>
      </TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  );
}
