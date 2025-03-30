import { WeatherProvider } from "@/contexts/WeatherContext";
import WeatherWidget from "@/components/WeatherWidget";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <WeatherProvider>
        <main className="min-h-screen">
          <WeatherWidget />
          <Toaster position="top-right" closeButton />
        </main>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
