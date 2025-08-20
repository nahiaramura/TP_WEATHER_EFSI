import { useState } from "react";
import { useWeatherCtx } from "../context/WeatherContext";
import { fetchByGeolocation } from "../hooks/useWeather";

export default function SearchBar() {
  const { city, setCity } = useWeatherCtx();
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const isGeo = typeof city === "object" && city?.lat != null && city?.lon != null;

  const onSearch = () => { if (q.trim()) setCity(q.trim()); };

  const onRefresh = async () => {
    setRefreshing(true);
    document.body.dataset.refreshing = "1";

    setCity(c => (typeof c === "string" ? (""+c) : ({ ...c })));

    await new Promise(r => setTimeout(r, 600));
    delete document.body.dataset.refreshing;
    setRefreshing(false);
  };

  const onGeo = async () => { await fetchByGeolocation(setCity); };

  return (
    <div className="search-bar">
      <input
        placeholder="Buscar ciudad..."
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && onSearch()}
      />

      <button className={`btn ${!isGeo ? "btn-primary" : ""}`} aria-pressed={!isGeo} onClick={onSearch}>
        Buscar
      </button>

      <button
        className={`btn ${refreshing ? "is-loading" : ""}`}
        onClick={onRefresh}
        disabled={refreshing}
        aria-busy={refreshing}
      >
        {refreshing ? <span className="spinner" aria-hidden="true" /> : "Actualizar"}
      </button>

      <button className={`btn ${isGeo ? "btn-primary" : ""}`} aria-pressed={isGeo} onClick={onGeo}>
        Usar mi ubicación
      </button>
    </div>
  );
}
