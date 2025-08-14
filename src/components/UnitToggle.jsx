import { useWeatherCtx } from "../context/WeatherContext";

export default function UnitToggle() {
  const { unit, setUnit } = useWeatherCtx();
  return (
    <div className="unit-toggle">
      <button
        className={unit === "metric" ? "active": ""}
        onClick={()=>setUnit("metric")}
      >°C</button>
      <button
        className={unit === "imperial" ? "active": ""}
        onClick={()=>setUnit("imperial")}
      >°F</button>
    </div>
  );
}
