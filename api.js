const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`)
    const data = await res.json()
    return data
}

export async function getGeoCode(cityName) {
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
    const data = await res.json()
    return data
}

export async function getAirPollution({ lat, lon }) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const data = await res.json()
    return data
}