import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import { getGeoCode } from "../api"
import Map from "./components/Map"
import { useState } from "react"
import LocationDropDown from "./components/dropdowns/LocationDropDown"
import { useSuspenseQuery } from "@tanstack/react-query"

const App = () => {
  const [coordinates, setCoords] = useState({ lat: 31, lon: 31 })
  const [location, setLocation] = useState('custom')

  const { data } = useSuspenseQuery({
    queryKey: ["location", location],
    queryFn: () => getGeoCode(location)
  })

  const coords = location === 'custom' ? coordinates : { lat: data[0].lat, lon: data[0].lon }

  function handleMapClick(coords) {
    setCoords(coords)
    setLocation('custom')
  }

  return (
    <main className="flex flex-col gap-8 w-full">
      <LocationDropDown location={location} setLocation={setLocation} />
      <Map coords={coords} handleMapClick={handleMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </main>
  )
}

export default App