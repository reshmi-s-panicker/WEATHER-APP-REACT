import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineRounded';
import { colors } from '../theme';

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function SearchHistory({ history, onSelect, onClear }) {
  return (
    <Paper elevation={0} sx={{ border: `1px solid ${colors.surfaceRaised}`, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, pb: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <HistoryIcon sx={{ color: colors.teal }} fontSize="small" />
          <Typography variant="subtitle1">Search History</Typography>
        </Stack>
        {history.length > 0 && (
          <Tooltip title="Clear history">
            <IconButton size="small" onClick={onClear}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {history.length === 0 ? (
        <Box sx={{ p: 2, pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            Cities you search will show up here.
          </Typography>
        </Box>
      ) : (
        <List dense disablePadding>
          {history.map((item) => (
            <ListItemButton key={item.city + item.searchedAt} onClick={() => onSelect(item.city)}>
              <ListItemText
                primary={item.city}
                secondary={`${item.summary ?? ''} · ${timeAgo(item.searchedAt)}`}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}
