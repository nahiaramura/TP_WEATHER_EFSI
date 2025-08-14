import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";   // <-- NUEVO
dayjs.extend(utc); 
export function kelvinToC(k) { return k - 273.15; }
export function kelvinToF(k) { return (k - 273.15) * 9/5 + 32; }
export function kToUnit(k, unit) {
  return unit === "imperial" ? kelvinToF(k) : kelvinToC(k);
}
export function formatTemp(n) {
  return Math.round(n);
}
export function windToUnit(ms, unit) {
  // OpenWeather usa m/s; para imperial lo pasamos a mph
  return unit === "imperial" ? ms * 2.23694 : ms; // m/s
}
export function formatTime(ts, tzOffsetSec) {
  return dayjs.unix(ts + tzOffsetSec).utc().format("HH:mm");
}
export function formatDate(ts, tzOffsetSec) {
  return dayjs.unix(ts + tzOffsetSec).utc().format("ddd D");
}

// Agrupa el forecast 3h por día -> { dateKey, min, max, icon }
export function groupDaily(forecastList, tzOffsetSec) {
  const byDay = {};
  for (const item of forecastList) {
    const dateKey = dayjs.unix(item.dt + tzOffsetSec).utc().format("YYYY-MM-DD");
    const k = item.main.temp;
    const icon = item.weather?.[0]?.icon;
    if (!byDay[dateKey]) byDay[dateKey] = { temps: [], icons: [] };
    byDay[dateKey].temps.push(k);
    byDay[dateKey].icons.push(icon);
  }
  // quedarnos con próximos 5 días (incluyendo hoy)
  return Object.entries(byDay).slice(0, 5).map(([dateKey, v]) => ({
    dateKey,
    minK: Math.min(...v.temps),
    maxK: Math.max(...v.temps),
    icon: mode(v.icons),
  }));
}

function mode(arr) {
  const m = {};
  arr.forEach(x => m[x] = (m[x] || 0) + 1);
  return Object.entries(m).sort((a,b)=>b[1]-a[1])[0][0];
}
