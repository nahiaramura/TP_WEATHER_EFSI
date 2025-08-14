import { groupDaily, kToUnit, formatTemp, formatDate } from "../utils/format";

export default function DailyForecast({ list, unit, tz }) {
  const days = groupDaily(list, tz);
  const allMin = Math.min(...days.map(d => d.minK));
  const allMax = Math.max(...days.map(d => d.maxK));

  const pct = (k) => {
    const span = (allMax - allMin) || 1;
    return ((k - allMin) / span) * 100;
  };

  return (
    <section className="card daily">
      <h3>Próximos 5 días</h3>
      <div className="grid">
        {days.map(d => {
          const from = pct(d.minK);
          const to = pct(d.maxK);
          return (
            <div key={d.dateKey} className="day" style={{"--from":from, "--to":to}}>
              <div className="top">
                <div style={{opacity:.85}}>{formatDate(Date.parse(d.dateKey)/1000, 0)}</div>
                <img alt="" src={`https://openweathermap.org/img/wn/${d.icon}.png`} width="28" height="28" />
              </div>
              <div className="temps">
                <span>{formatTemp(kToUnit(d.maxK, unit))}°</span>
                <span style={{color:"var(--muted)"}}>{formatTemp(kToUnit(d.minK, unit))}°</span>
              </div>
              <div className="bar" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
