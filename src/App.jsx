import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"

const App = () => {
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