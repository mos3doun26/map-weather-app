const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`)
    const data = await res.json()
    return data
}