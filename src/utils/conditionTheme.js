import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FoggyIcon from '@mui/icons-material/Foggy';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

// Maps OpenWeatherMap condition group codes to a gradient + icon,
// so the header visually reflects the searched city's sky.
export function getConditionTheme(weatherId) {
  const id = weatherId ?? 800;

  if (id >= 200 && id < 300) {
    return { gradient: 'linear-gradient(135deg, #2C2A4A 0%, #7B6CC7 100%)', Icon: ThunderstormIcon, label: 'Thunderstorm' };
  }
  if (id >= 300 && id < 400) {
    return { gradient: 'linear-gradient(135deg, #3A5470 0%, #6FA3C7 100%)', Icon: GrainIcon, label: 'Drizzle' };
  }
  if (id >= 500 && id < 600) {
    return { gradient: 'linear-gradient(135deg, #274156 0%, #4E7DA6 100%)', Icon: GrainIcon, label: 'Rain' };
  }
  if (id >= 600 && id < 700) {
    return { gradient: 'linear-gradient(135deg, #3E4C6D 0%, #B8C9E0 100%)', Icon: AcUnitIcon, label: 'Snow' };
  }
  if (id >= 700 && id < 800) {
    return { gradient: 'linear-gradient(135deg, #4A4A45 0%, #8C8C7E 100%)', Icon: FoggyIcon, label: 'Atmosphere' };
  }
  if (id === 800) {
    return { gradient: 'linear-gradient(135deg, #1B3A57 0%, #F5A623 120%)', Icon: WbSunnyIcon, label: 'Clear' };
  }
  if (id > 800 && id < 804) {
    return { gradient: 'linear-gradient(135deg, #2B3B52 0%, #7692AD 100%)', Icon: CloudQueueIcon, label: 'Partly Cloudy' };
  }
  return { gradient: 'linear-gradient(135deg, #33415C 0%, #5C6E8C 100%)', Icon: CloudIcon, label: 'Cloudy' };
}
