import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 20% 20%, ${colors.surfaceRaised} 0%, ${colors.night} 60%)`,
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          border: `1px solid ${colors.surfaceRaised}`,
          borderRadius: 3,
        }}
      >
        <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <WbTwilightIcon sx={{ fontSize: 40, color: colors.amber }} />
          <Typography variant="h4" component="h1">
            Skyline
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Sign in to search the sky over any city.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign in
            </Button>
          </Stack>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center' }}>
          Demo login — any email and password will work.
        </Typography>
      </Paper>
    </Box>
  );
}
