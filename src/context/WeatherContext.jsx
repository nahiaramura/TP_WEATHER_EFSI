import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const [unit, setUnit] = useState(() => localStorage.getItem("unit") || "metric");

  const [city, setCity] = useState(() => {
    const raw = localStorage.getItem("city");
    if (!raw) return "Helsinki";
    try { return JSON.parse(raw); } catch { return raw; }
  });

  const [cache, setCache] = useState(() => {
    const raw = localStorage.getItem("weather_cache");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => localStorage.setItem("unit", unit), [unit]);

  useEffect(() => {
    localStorage.setItem("city", JSON.stringify(city));
  }, [city]);

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
