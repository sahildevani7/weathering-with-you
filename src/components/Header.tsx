import { RefreshCw } from "lucide-react";
import { useWeather } from "@/contexts/WeatherContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { refreshAllWidgets, loading } = useWeather();
  
  return (
    <header className="flex flex-col items-center justify-center py-8 px-4 md:py-12">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-transparent bg-clip-text">
              Weather Galaxy
            </h1>
            <p className="text-indigo-700/70 mt-2 font-medium">
              Your personalized weather dashboard
            </p>
          </div>
          <Button 
            onClick={refreshAllWidgets}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh All
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
