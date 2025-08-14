import { useEffect, useState } from "react";
import { useWeatherCtx } from "../context/WeatherContext";
import {
  getCurrentByCity, getForecastByCity,
  getCurrentByCoords
} from "../api/openweather";

export default function useWeather() {
  const { city, setCache, cache } = useWeatherCtx();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setErr(null);
        setLoading(true);

        // si hay cache reciente de esta city (5 min), usarlo
        if (cache && cache.city?.toLowerCase() === city.toLowerCase() && Date.now() - cache.ts < 5*60*1000) {
          if (!cancelled) {
            setCurrent(cache.current);
            setForecast(cache.forecast);
            setLoading(false);
          }
          return;
        }

        const [c, f] = await Promise.all([
          getCurrentByCity(city),
          getForecastByCity(city),
        ]);

        if (!cancelled) {
          setCurrent(c);
          setForecast(f);
          setCache({ city, current: c, forecast: f, ts: Date.now() });
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) { setErr(e.message || "Error"); setLoading(false); }
      }
    }
    run();
    return () => { cancelled = true; };
  }, [city]);

  return { loading, err, current, forecast };
}

// geolocalización (opcional)
export async function fetchByGeolocation(setCity) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocalización no soportada");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const cur = await getCurrentByCoords(latitude, longitude);
          setCity(cur.name);
          resolve(cur.name);
        } catch (e) { reject(e); }
      },
      (e) => reject(e.message || "No autorizado")
    );
  });
}
