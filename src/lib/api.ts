import { WeatherData, WeatherResponse } from "../types/weather";

// OpenWeatherMap API key from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    // Check if API key is available
    if (!API_KEY) {
      throw new Error("API key is missing. Please check your environment variables.");
    }
    
    // Encode the city name to handle spaces and special characters
    const encodedCity = encodeURIComponent(city);
    
    // Create the URL with proper parameter ordering and format
    const url = `${BASE_URL}/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;
    
    console.log(`Fetching weather data for: ${city}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your environment variables and try again.");
      } else {
        throw new Error(`Failed to fetch weather data: ${errorData.message || 'Unknown error'}`);
      }
    }
    
    const data: WeatherResponse = await response.json();
    
    return {
      id: `${data.id}-${Date.now()}`,
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      last_updated: data.dt,
    };
  } catch (error) {
    console.error('Error in fetchWeatherData:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching weather data.");
  }
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getWeatherConditionClass(iconCode: string): string {
  // Map OpenWeatherMap icon codes to our tailwind classes
  const code = iconCode.substring(0, 2);
  
  if (code === "01") return "bg-weather-sunny";
  if (code === "02" || code === "03" || code === "04") return "bg-weather-cloudy";
  if (code === "09" || code === "10") return "bg-weather-rainy";
  if (code === "11") return "bg-weather-stormy";
  if (code === "13") return "bg-weather-snowy";
  
  return "bg-blue-50";
}
