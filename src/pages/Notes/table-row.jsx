import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

export default function NotesTableRow({
  selected,
  title,
  note,
  handleClick,
  handleEditNote,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{note}</TableCell>
      <TableCell align="right">
        <Button style={{ textTransform: 'none' }} onClick={handleEditNote}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
