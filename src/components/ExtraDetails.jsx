import { kToUnit, formatTemp } from "../utils/format";

export default function ExtraDetails({ current, unit }) {
  if (!current) return null;

  const sunrise = new Date((current.sys.sunrise + current.timezone) * 1000)
    .toUTCString().slice(17, 22);
  const sunset = new Date((current.sys.sunset + current.timezone) * 1000)
    .toUTCString().slice(17, 22);
  const feels = formatTemp(kToUnit(current.main.feels_like, unit));

  return (
    <section className="card extra">
      <h3>Detalles adicionales</h3>
      <div className="extras-grid">
        <div>
          <strong>Amanecer:</strong>
          <span>{sunrise}</span>
        </div>
        <div>
          <strong>Atardecer:</strong>
          <span>{sunset}</span>
        </div>
        <div>
          <strong>Humedad:</strong>
          <span>{current.main.humidity}%</span>
        </div>
        <div>
          <strong>Sensación:</strong>
          <span>{feels}°</span>
        </div>
      </div>
    </section>
  );
}
