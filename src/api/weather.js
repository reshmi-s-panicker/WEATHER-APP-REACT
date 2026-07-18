const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

class WeatherApiError extends Error {}

async function request(path, params) {
  if (!API_KEY) {
    throw new WeatherApiError(
      'Missing API key. Add VITE_WEATHER_API_KEY to your .env file and restart the dev server.'
    );
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString());

  if (!response.ok) {
    if (response.status === 404) {
      throw new WeatherApiError(`City "${params.q}" was not found. Check the spelling and try again.`);
    }
    if (response.status === 401) {
      throw new WeatherApiError('Weather API key is invalid or not yet active.');
    }
    if (response.status === 429) {
      throw new WeatherApiError('Too many requests. Please wait a moment and try again.');
    }
    throw new WeatherApiError('Unable to fetch weather data right now. Please try again later.');
  }

  return response.json();
}

export function getCurrentWeather(city) {
  return request('/weather', { q: city });
}

export function getForecast(city) {
  return request('/forecast', { q: city });
}

// Collapse the 3-hour forecast entries into ~5 daily summaries,
// preferring the reading closest to midday for each date.
export function toDailyForecast(forecastData) {
  const daily = {};
  for (const entry of forecastData.list ?? []) {
    const date = new Date(entry.dt * 1000).toISOString().slice(0, 10);
    const hour = new Date(entry.dt * 1000).getUTCHours();
    if (!daily[date] || Math.abs(hour - 12) < Math.abs(new Date(daily[date].dt * 1000).getUTCHours() - 12)) {
      daily[date] = entry;
    }
  }
  return Object.values(daily).slice(0, 5);
}

export { WeatherApiError };
