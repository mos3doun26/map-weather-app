import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import { getWeather } from "../api"
import Map from "./components/Map"
import { useState } from "react"

const App = () => {
  const [coords, setCoords] = useState({ lat: 31, lon: 31 })

  function handleMapClick(coords) {
    setCoords(coords)
  }

  return (
    <main className="flex flex-col gap-8 w-full">
      <Map coords={coords} handleMapClick={handleMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </main>
  )
}

export default App