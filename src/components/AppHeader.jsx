import { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Stack, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { colors } from '../theme';

export default function AppHeader({ onSearch, userEmail, onLogout }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: colors.surface, borderBottom: `1px solid ${colors.surfaceRaised}` }}
    >
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
          <WbTwilightIcon sx={{ color: colors.amber }} />
          <Typography variant="h6" component="div">
            Skyline
          </Typography>
        </Stack>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            minWidth: 200,
            backgroundColor: colors.surfaceRaised,
            borderRadius: 2,
            px: 1.5,
          }}
        >
          <SearchIcon sx={{ color: colors.muted, mr: 1 }} fontSize="small" />
          <InputBase
            placeholder="Search for a city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ py: 1, color: colors.text }}
          />
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexShrink: 0 }}>
          <Chip label={userEmail} size="small" variant="outlined" sx={{ display: { xs: 'none', sm: 'flex' } }} />
          <IconButton onClick={onLogout} title="Log out" size="small">
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
