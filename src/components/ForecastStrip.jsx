import { Paper, Stack, Typography, Box } from '@mui/material';
import { getConditionTheme } from '../utils/conditionTheme';
import { colors } from '../theme';

export default function ForecastStrip({ days }) {
  if (!days?.length) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        5-Day Forecast
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1 }}>
        {days.map((day) => {
          const weather = day.weather?.[0];
          const theme = getConditionTheme(weather?.id);
          const { Icon } = theme;
          const date = new Date(day.dt * 1000);

          return (
            <Paper
              key={day.dt}
              elevation={0}
              sx={{
                minWidth: 110,
                textAlign: 'center',
                p: 2,
                border: `1px solid ${colors.surfaceRaised}`,
                flexShrink: 0,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </Typography>
              <Icon sx={{ fontSize: 32, color: colors.amber, display: 'block', mx: 'auto', my: 1 }} />
              <Typography variant="body1" fontWeight={600}>
                {Math.round(day.main.temp)}°C
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {weather?.main}
              </Typography>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}
