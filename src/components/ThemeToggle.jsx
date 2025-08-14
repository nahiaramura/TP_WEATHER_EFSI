import { useWeatherCtx } from "../context/WeatherContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useWeatherCtx();
  return (
    <button className="theme-toggle"
      onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
