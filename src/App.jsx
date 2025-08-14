// src/App.jsx
import "./index.css";
import useWeather, { fetchByGeolocation } from "./hooks/useWeather";
import { useWeatherCtx } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import ThemeToggle from "./components/ThemeToggle";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import CitySummary from "./components/CitySummary";

export default function App() {
  const { unit, setCity, setCoords } = useWeatherCtx();
  const { loading, err, current, forecast } = useWeather();

  return (
    <div className="app">
      <header className="topbar">
        <h1>Weather App</h1>
        <div className="controls">
          <div className="unit-toggle"><UnitToggle /></div>
          <button className="theme-toggle"
            onClick={() =>
              document.documentElement.dataset.theme === "dark"
                ? (document.documentElement.dataset.theme = "light")
                : (document.documentElement.dataset.theme = "dark")
            }
          >
            Modo {document.documentElement.dataset.theme === "dark" ? "claro" : "oscuro"}
          </button>
        </div>
      </header>

      {/* buscador y acciones */}
      <div className="search-bar">
        <SearchBar />

      </div>

      {/* NUEVO ORDEN: izquierda = 3 bloques / derecha = 5 días */}
      <div className="layout">
        <main className="main">
          {loading && <div className="card">Cargando…</div>}
          {err && <div className="card">Error: {err}</div>}
          {current && <CurrentWeather data={current} unit={unit} />}
          {forecast && <HourlyForecast list={forecast.list} unit={unit} tz={forecast.city.timezone || 0} />}
          {/* MOVIDO AQUÍ para rellenar la izquierda */}
          <CitySummary />
        </main>

        <aside className="sidebar">
          {forecast && (
            <DailyForecast list={forecast.list} unit={unit} tz={forecast.city.timezone || 0} />
          )}
        </aside>
      </div>

      <footer className="footer">DevChallenges • OpenWeatherMap</footer>
    </div>
  );
}
