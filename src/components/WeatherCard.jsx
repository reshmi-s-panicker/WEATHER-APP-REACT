import { Box, Paper, Typography, Stack, Chip, Grid } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import { getConditionTheme } from '../utils/conditionTheme';
import { colors } from '../theme';

function StatTile({ icon, label, value }) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        flex: 1,
        minWidth: 100,
        py: 2,
        px: 1,
        borderRadius: 2,
        backgroundColor: colors.surfaceRaised,
      }}
    >
      {icon}
      <Typography variant="h6" component="div">
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  );
}

export default function WeatherCard({ data }) {
  const weather = data.weather?.[0];
  const theme = getConditionTheme(weather?.id);
  const { Icon } = theme;

  return (
    <Paper elevation={0} sx={{ overflow: 'hidden', border: `1px solid ${colors.surfaceRaised}` }}>
      <Box
        sx={{
          background: theme.gradient,
          p: 4,
          color: '#fff',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h4" component="h2">
              {data.name}{data.sys?.country ? `, ${data.sys.country}` : ''}
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize', opacity: 0.9 }}>
              {weather?.description}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 56, opacity: 0.9 }} />
        </Stack>
        <Typography variant="h1" sx={{ fontSize: '4rem', mt: 2 }}>
          {Math.round(data.main.temp)}°C
        </Typography>
        <Chip
          size="small"
          label={`Feels like ${Math.round(data.main.feels_like)}°C`}
          sx={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}
        />
      </Box>

      <Grid container spacing={1.5} sx={{ p: 2.5 }}>
        <Grid item xs={6} sm={3}>
          <StatTile icon={<ThermostatIcon sx={{ color: colors.amber }} />} label="High / Low" value={`${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatTile icon={<WaterDropIcon sx={{ color: colors.teal }} />} label="Humidity" value={`${data.main.humidity}%`} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatTile icon={<AirIcon sx={{ color: colors.teal }} />} label="Wind Speed" value={`${data.wind.speed} m/s`} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatTile icon={<CompressIcon sx={{ color: colors.amber }} />} label="Pressure" value={`${data.main.pressure} hPa`} />
        </Grid>
      </Grid>
    </Paper>
  );
}
