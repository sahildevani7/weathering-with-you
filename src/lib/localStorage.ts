
import { WeatherData } from "../types/weather";

const STORAGE_KEY = "weathering-with-you-widgets";

export function saveWidgets(widgets: WeatherData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  } catch (error) {
    console.error("Failed to save widgets to local storage:", error);
  }
}

export function loadWidgets(): WeatherData[] {
  try {
    const storedWidgets = localStorage.getItem(STORAGE_KEY);
    if (!storedWidgets) return [];
    return JSON.parse(storedWidgets);
  } catch (error) {
    console.error("Failed to load widgets from local storage:", error);
    return [];
  }
}
