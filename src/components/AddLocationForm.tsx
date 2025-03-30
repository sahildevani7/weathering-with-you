import { useState } from "react";
import { useWeather } from "@/contexts/WeatherContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const AddLocationForm = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { addWidget, loading } = useWeather();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!city.trim()) {
      setError("Please enter a city name");
      toast.error("Please enter a city name");
      return;
    }
    
    try {
      await addWidget(city.trim());
      setCity("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add weather widget";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
      <div className="flex shadow-md rounded-lg overflow-hidden">
        <Input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError(null);
          }}
          placeholder="Enter city name..."
          className="rounded-r-none bg-white/90 border-purple-100 focus-visible:ring-purple-400 placeholder:text-indigo-300 text-indigo-800"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading || !city.trim()}
          className="rounded-l-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
      )}
    </form>
  );
};

export default AddLocationForm;
