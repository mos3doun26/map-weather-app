import { useQuery } from "@tanstack/react-query"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import { getWeather } from "../api"

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 })
  })

  return (
    <main>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </main>
  )
}

export default App