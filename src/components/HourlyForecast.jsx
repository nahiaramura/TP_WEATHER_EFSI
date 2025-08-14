import { kToUnit, formatTemp, formatTime } from "../utils/format";

export default function HourlyForecast({ list, unit, tz }) {
  const next = list.slice(0, 8);
  return (
    <section className="card hourly">
      <h3>Próximas 24 horas</h3>
      <div className="scroller">
        {next.map((i) => (
          <div key={i.dt} className="hour">
            <div style={{opacity:.8}}>{formatTime(i.dt, tz)}</div>
            <img alt={i.weather[0].description}
              src={`https://openweathermap.org/img/wn/${i.weather[0].icon}.png`} width="36" height="36" />
            <div className="t">{formatTemp(kToUnit(i.main.temp, unit))}°</div>
          </div>
        ))}
      </div>
    </section>
  );
}
