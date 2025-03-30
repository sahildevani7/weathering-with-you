import { format } from "date-fns";
import { useState } from "react";
import { WeatherData } from "@/types/weather";
import { getWeatherIcon } from "@/lib/api";
import { useWeather } from "@/contexts/WeatherContext";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  X, 
  Thermometer, 
  Droplets, 
  Wind, 
  Calendar, 
  Clock, 
  Map, 
  ArrowUpRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { refreshWidget, removeWidget } = useWeather();
  const [showDetails, setShowDetails] = useState(false);
  
  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    refreshWidget(weather.id);
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeWidget(weather.id);
  };

  // Format the current date and time
  const formattedDate = format(new Date(weather.last_updated * 1000), "EEEE HH:mm");
  const formattedFullDate = format(new Date(weather.last_updated * 1000), "MMMM do, yyyy");
  const formattedTime = format(new Date(weather.last_updated * 1000), "HH:mm:ss");

  const getWeatherBackgroundClass = () => {
    // Determine a gradient based on temperature
    if (weather.temperature >= 30) {
      return "from-orange-50 to-red-50"; // Hot
    } else if (weather.temperature >= 20) {
      return "from-yellow-50 to-orange-50"; // Warm
    } else if (weather.temperature >= 10) {
      return "from-blue-50 to-indigo-50"; // Mild
    } else if (weather.temperature >= 0) {
      return "from-blue-50 to-cyan-50"; // Cool
    } else {
      return "from-slate-50 to-blue-50"; // Cold
    }
  };

  const getTemperatureClass = () => {
    if (weather.temperature >= 30) {
      return "from-orange-600 to-red-600"; // Hot
    } else if (weather.temperature >= 20) {
      return "from-yellow-600 to-orange-600"; // Warm
    } else if (weather.temperature >= 10) {
      return "from-blue-600 to-indigo-600"; // Mild
    } else if (weather.temperature >= 0) {
      return "from-blue-600 to-cyan-600"; // Cool
    } else {
      return "from-slate-600 to-blue-600"; // Cold
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-purple-50/90 to-indigo-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl relative border border-white/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        {/* City name and action buttons */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">{weather.city}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleRefresh}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-colors"
              aria-label="Refresh weather"
            >
              <RefreshCw size={16} />
            </button>
            <button 
              onClick={handleRemove}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-red-400 to-pink-400 text-white flex items-center justify-center hover:from-red-500 hover:to-pink-500 transition-colors"
              aria-label="Remove widget"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* Date and weather description */}
        <div className="text-left text-indigo-800/80 mb-6">
          <p className="text-sm font-medium">{formattedDate}</p>
          <p className="capitalize text-sm font-medium mt-1">{weather.description}</p>
        </div>
        
        {/* Temperature and weather icon */}
        <div className="flex justify-between items-center">
          <div className="text-6xl font-light bg-gradient-to-r from-purple-700 to-indigo-700 text-transparent bg-clip-text text-left">
            {weather.temperature}°
          </div>
          <div className="w-24 h-24 drop-shadow-lg">
            <img 
              src={getWeatherIcon(weather.icon)} 
              alt={weather.description} 
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Details button */}
        <div className="mt-6 text-left">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowDetails(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            See details
          </Button>
        </div>
      </div>

      {/* Weather Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className={`bg-gradient-to-br ${getWeatherBackgroundClass()} border-purple-200 max-w-xl`}>
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold bg-gradient-to-r ${getTemperatureClass()} text-transparent bg-clip-text flex items-center`}>
              <span className="flex-1">{weather.city}, {weather.country}</span>
              <button 
                onClick={handleRefresh}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-colors ml-2"
                aria-label="Refresh weather"
              >
                <RefreshCw size={16} />
              </button>
            </DialogTitle>
            <DialogDescription className="text-indigo-700/80">
              Current weather conditions
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Weather condition overview */}
            <div className="flex items-center justify-between bg-white/30 p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <img 
                  src={getWeatherIcon(weather.icon)} 
                  alt={weather.description} 
                  className="w-20 h-20"
                />
                <div>
                  <p className={`text-4xl font-semibold bg-gradient-to-r ${getTemperatureClass()} text-transparent bg-clip-text`}>
                    {weather.temperature}°C
                  </p>
                  <p className="capitalize text-indigo-600 font-medium text-lg">{weather.description}</p>
                </div>
              </div>
            </div>

            {/* Date and time information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/40 p-3 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-indigo-800/70">Date</p>
                  <p className="text-sm font-medium text-indigo-800">{formattedFullDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/40 p-3 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-indigo-800/70">Time</p>
                  <p className="text-sm font-medium text-indigo-800">{formattedTime}</p>
                </div>
              </div>
            </div>

            {/* Weather metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-indigo-200/40">
              <div className="flex flex-col items-center p-4 bg-white/40 rounded-lg">
                <Thermometer className="h-6 w-6 text-indigo-600 mb-2" />
                <p className="text-xs text-indigo-800/70">Feels like</p>
                <p className="text-lg font-medium text-indigo-800">{weather.feels_like}°C</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white/40 rounded-lg">
                <Droplets className="h-6 w-6 text-indigo-600 mb-2" />
                <p className="text-xs text-indigo-800/70">Humidity</p>
                <p className="text-lg font-medium text-indigo-800">{weather.humidity}%</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-white/40 rounded-lg">
                <Wind className="h-6 w-6 text-indigo-600 mb-2" />
                <p className="text-xs text-indigo-800/70">Wind speed</p>
                <p className="text-lg font-medium text-indigo-800">{weather.wind_speed} m/s</p>
              </div>
            </div>

            {/* External weather links */}
            <div className="mt-4 text-right">
              <a 
                href={`https://www.openweathermap.org/find?q=${encodeURIComponent(weather.city)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View on OpenWeatherMap
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WeatherCard;
