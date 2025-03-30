import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData } from '../types/weather';
import { fetchWeatherData } from '../lib/api';
import { saveWidgets, loadWidgets } from '../lib/localStorage';
import { toast } from 'sonner';

interface WeatherContextType {
  widgets: WeatherData[];
  loading: boolean;
  addWidget: (city: string) => Promise<void>;
  removeWidget: (id: string) => void;
  refreshWidget: (id: string) => Promise<void>;
  refreshAllWidgets: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load saved widgets on initial mount
  useEffect(() => {
    setWidgets(loadWidgets());
    setLoading(false);
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveWidgets(widgets);
    }
  }, [widgets, loading]);

  const addWidget = async (city: string) => {
    try {
      setLoading(true);
      // Check if widget for this city already exists
      if (widgets.some(widget => widget.city.toLowerCase() === city.toLowerCase())) {
        const error = new Error(`Weather widget for ${city} already exists!`);
        toast.error(error.message);
        throw error;
      }

      const weatherData = await fetchWeatherData(city);
      
      setWidgets(prev => [...prev, weatherData]);
      toast.success(`Added weather for ${weatherData.city}, ${weatherData.country}`);
    } catch (error) {
      console.error('Error fetching weather:', error);
      
      // Make sure we throw the error after logging it
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        const genericError = new Error('Failed to add weather widget');
        toast.error(genericError.message);
        throw genericError;
      }
    } finally {
      setLoading(false);
    }
  };

  const removeWidget = (id: string) => {
    try {
      setWidgets(prev => {
        const filtered = prev.filter(widget => widget.id !== id);
        return filtered;
      });
      toast.success('Weather widget removed');
    } catch (error) {
      console.error('Error removing widget:', error);
      toast.error('Failed to remove weather widget');
    }
  };

  const refreshWidget = async (id: string) => {
    try {
      setLoading(true);
      const widgetToRefresh = widgets.find(widget => widget.id === id);
      
      if (!widgetToRefresh) {
        const error = new Error('Widget not found');
        toast.error(error.message);
        throw error;
      }

      const refreshedData = await fetchWeatherData(widgetToRefresh.city);
      
      setWidgets(prev => 
        prev.map(widget => 
          widget.id === id ? { ...refreshedData, id } : widget
        )
      );
      
      toast.success(`Updated weather for ${refreshedData.city}`);
    } catch (error) {
      console.error('Error refreshing widget:', error);
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        const genericError = new Error('Failed to refresh weather data');
        toast.error(genericError.message);
        throw genericError;
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAllWidgets = async () => {
    if (widgets.length === 0) {
      toast.info('No widgets to refresh');
      return;
    }

    setLoading(true);
    toast.info('Refreshing all weather data...');

    try {
      const refreshPromises = widgets.map(async (widget) => {
        try {
          const refreshedData = await fetchWeatherData(widget.city);
          return { ...refreshedData, id: widget.id };
        } catch (error) {
          console.error(`Failed to refresh ${widget.city}:`, error);
          toast.error(`Failed to refresh ${widget.city}`);
          return widget; // Keep the old data if refresh fails
        }
      });

      const refreshedWidgets = await Promise.all(refreshPromises);
      setWidgets(refreshedWidgets);
      toast.success('All weather data refreshed');
    } catch (error) {
      console.error('Error refreshing all widgets:', error);
      toast.error('Something went wrong while refreshing data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider 
      value={{ 
        widgets, 
        loading, 
        addWidget, 
        removeWidget, 
        refreshWidget,
        refreshAllWidgets
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
