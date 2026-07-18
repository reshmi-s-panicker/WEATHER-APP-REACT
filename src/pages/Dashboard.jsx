import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Alert, Skeleton, Stack, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useSearchHistory } from '../context/useSearchHistory';
import { getCurrentWeather, getForecast, toDailyForecast, WeatherApiError } from '../api/weather';
import AppHeader from '../components/AppHeader';
import WeatherCard from '../components/WeatherCard';
import ForecastStrip from '../components/ForecastStrip';
import SearchHistory from '../components/SearchHistory';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { history, addToHistory, clearHistory } = useSearchHistory();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (city) => {
      setLoading(true);
      setError('');
      try {
        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city),
        ]);
        setCurrent(currentData);
        setForecast(toDailyForecast(forecastData));
        addToHistory(currentData.name, `${Math.round(currentData.main.temp)}°C, ${currentData.weather[0].description}`);
      } catch (err) {
        setCurrent(null);
        setForecast([]);
        setError(err instanceof WeatherApiError ? err.message : 'Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppHeader onSearch={handleSearch} userEmail={user?.email} onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {loading && (
              <Stack spacing={1.5}>
                <Skeleton variant="rounded" height={220} />
                <Skeleton variant="rounded" height={140} />
              </Stack>
            )}

            {!loading && !current && !error && (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" gutterBottom>
                  Search for a city to see the sky
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Temperature, conditions, humidity, and wind — all in one glance.
                </Typography>
              </Box>
            )}

            {!loading && current && (
              <>
                <WeatherCard data={current} />
                <ForecastStrip days={forecast} />
              </>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <SearchHistory history={history} onSelect={handleSearch} onClear={clearHistory} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
