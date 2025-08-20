// src/App.jsx
import "./index.css";
import useWeather from "./hooks/useWeather";
import { useWeatherCtx } from "./context/WeatherContext";

import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import ThemeToggle from "./components/ThemeToggle";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import CitySummary from "./components/CitySummary";

export default function App() {
  const { unit, theme, setTheme } = useWeatherCtx();
  const { loading, err, current, forecast } = useWeather();
  const tz = forecast?.city?.timezone ?? 0;

  return (
    <div className="app">
      {/* Topbar */}
      <header className="toolbar">
        <h1>Weather App</h1>
        <div className="toolbar-right">
          <UnitToggle />
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Modo {theme === "dark" ? "claro" : "oscuro"}
          </button>
        </div>
      </header>

      {/* Búsqueda */}
      <div className="search-row">
        <SearchBar />
      </div>

      {/* Disposición por áreas (sin .card externas) */}
      <main className="grid-areas">
        <section className="area-current">
          {loading && <div className="card">Cargando…</div>}
          {err && <div className="card" style={{ color: "#ff8a8a" }}>Error: {err}</div>}
          {!loading && current && <CurrentWeather data={current} unit={unit} />}
        </section>

        <aside className="area-daily">
          {forecast && (
            <>
              <h3>Próximos 5 días</h3>
              <DailyForecast list={forecast.list} unit={unit} tz={tz} />
            </>
          )}
        </aside>

        <section className="area-hourly">
          {forecast && (
            <>
              <h3>Próximas 24 horas</h3>
              <HourlyForecast list={forecast.list} unit={unit} tz={tz} />
            </>
          )}
        </section>

        <section className="area-cities">
          <h3>Otras ciudades</h3>
          <CitySummary />
        </section>
      </main>

      <footer className="footer">DevChallenges • OpenWeatherMap</footer>
    </div>
  );
}
