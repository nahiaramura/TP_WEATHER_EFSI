import { useEffect, useState } from "react";
import { getCurrentByCity } from "../api/openweather";
import { kToUnit, formatTemp } from "../utils/format";
import { useWeatherCtx } from "../context/WeatherContext";

const DEFAULTS = ["New York", "Copenhagen", "Ho Chi Minh City"];

export default function CitySummary({ cities = DEFAULTS }) {
  const { unit, setCity } = useWeatherCtx();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.allSettled(cities.map(c => getCurrentByCity(c)));
      if (!cancelled) {
        setItems(results
          .filter(r => r.status === "fulfilled")
          .map(r => r.value));
      }
    })();
    return () => { cancelled = true; };
  }, [cities]);

  return (
    <section className="card cities">
      <h3>Otras ciudades</h3>
      <div className="grid">
        {items.map(c => (
          <button className="city" key={c.id} onClick={()=> setCity(c.name)}>
            <div className="name">{c.name}</div>
            <img alt={c.weather[0].description}
                 src={`https://openweathermap.org/img/wn/${c.weather[0].icon}.png`} />
            <div className="t">{formatTemp(kToUnit(c.main.temp, unit))}°</div>
          </button>
        ))}
      </div>
    </section>
  );
  
}
