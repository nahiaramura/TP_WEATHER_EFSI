import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  // unit: 'metric' (°C) | 'imperial' (°F)
  const [unit, setUnit] = useState(() => localStorage.getItem("unit") || "metric");
  // selected city
  const [city, setCity] = useState(() => localStorage.getItem("city") || "Helsinki");
  // simple cache del último payload de clima { current, forecast, city, ts }
  const [cache, setCache] = useState(() => {
    const raw = localStorage.getItem("weather_cache");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => localStorage.setItem("unit", unit), [unit]);
  useEffect(() => localStorage.setItem("city", city), [city]);
  useEffect(() => {
    if (cache) localStorage.setItem("weather_cache", JSON.stringify(cache));
  }, [cache]);

  const value = useMemo(
    () => ({ theme, setTheme, unit, setUnit, city, setCity, cache, setCache }),
    [theme, unit, city, cache]
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeatherCtx() {
  return useContext(WeatherContext);
}
