import { CloudSun } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-purple-50/90 to-indigo-50/80 backdrop-blur-lg rounded-2xl max-w-md mx-auto border border-white/40 shadow-xl animate-fade-in">
      <CloudSun size={64} className="text-indigo-500 mb-4 animate-pulse-slow" />
      <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2">No Weather Widgets Yet</h3>
      <p className="text-indigo-700/70 text-center mb-6 font-medium">
        Add a location to start tracking the weather.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-xs text-left">
        <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-xl shadow-md">
          <p className="text-sm font-medium text-purple-700">Try these popular cities:</p>
          <ul className="mt-2 text-sm text-indigo-700/80 space-y-2 pl-5 list-disc">
            <li>London</li>
            <li>Tokyo</li>
            <li>New York</li>
            <li>Sydney</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
