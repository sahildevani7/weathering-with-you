import { useWeather } from "@/contexts/WeatherContext";
import AddLocationForm from "./AddLocationForm";
import WeatherCard from "./WeatherCard";
import EmptyState from "./EmptyState";

const WeatherWidget = () => {
  const { widgets, loading } = useWeather();

  return (
    <div className="container mx-auto px-4 pt-4">
      <AddLocationForm />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-4">
        {widgets.map((weather) => (
          <WeatherCard key={weather.id} weather={weather} />
        ))}
      </div>
      
      {widgets.length === 0 && !loading ? (
        <div className="mt-6">
          <EmptyState />
        </div>
      ) : null}
    </div>
  );
};

export default WeatherWidget;
