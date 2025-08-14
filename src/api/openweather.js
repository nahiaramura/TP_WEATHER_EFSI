import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "b87ff2395d4ab24eb197b694d60dec6e";
const BASE = "https://api.openweathermap.org/data/2.5";

const client = axios.create({
  baseURL: BASE,
  params: { appid: API_KEY },
});

export async function getCurrentByCity(city) {
  const { data } = await client.get("/weather", { params: { q: city } });
  return data;
}

export async function getForecastByCity(city) {
  // 5 días / cada 3 horas (40 puntos)
  const { data } = await client.get("/forecast", { params: { q: city } });
  return data;
}

export async function getCurrentByCoords(lat, lon) {
  const { data } = await client.get("/weather", { params: { lat, lon } });
  return data;
}

export async function getForecastByCoords(lat, lon) {
  const { data } = await client.get("/forecast", { params: { lat, lon } });
  return data;
}
