// src/components/CurrentWeather.jsx
import { kToUnit, formatTemp, windToUnit, formatDate } from "../utils/format";
import dayjs from "dayjs";

export default function CurrentWeather({ data, unit }) {
  const temp = formatTemp(kToUnit(data.main.temp, unit));
  const hi = formatTemp(kToUnit(data.main.temp_max, unit));
  const lo = formatTemp(kToUnit(data.main.temp_min, unit));
  const wind = windToUnit(data.wind.speed, unit).toFixed(1);
  const tz = data.timezone || 0;

  return (
    <section className="card current">
      <div className="head">
        <div>
          <h2>{data.name}</h2>
          <span style={{ color: "var(--muted)" }}>
            {formatDate(dayjs().unix(), tz)} — {data.weather[0].main}
          </span>
        </div>
        {/* <div className="badge">°</div>  <-- eliminado */}
      </div>

      <div className="row">
        <div className="temp">{temp}°</div>
        <img
          alt={data.weather[0].description}
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width="90"
          height="90"
          style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,.35))" }}
        />
      </div>

      <div className="meta">
        <span>Viento: {wind} {unit === "imperial" ? "mph" : "m/s"}</span>
        <span>Máx: {hi}° — Mín: {lo}°</span>
      </div>
    </section>
  );
}
