
export interface WeatherData {
  id: string;
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  last_updated: number;
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
