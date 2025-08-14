import { useState } from "react";
import { useWeatherCtx } from "../context/WeatherContext";
import { fetchByGeolocation } from "../hooks/useWeather";

export default function SearchBar() {
  const { city, setCity } = useWeatherCtx();
  const [q, setQ] = useState("");

  return (
    <div className="search-bar">
      <input
        placeholder="Buscar ciudad..."
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=> e.key === "Enter" && q && setCity(q)}
      />
      <button onClick={()=> q && setCity(q)}>Buscar</button>
      <button onClick={()=> setCity(city)}>Actualizar</button>
      <button onClick={()=> fetchByGeolocation(setCity)}>Usar mi ubicación</button>
    </div>
  );
}
