import AdditionalInfo from "./components/cards/AdditionalInfo"
import CurrentWeather from "./components/cards/CurrentWeather"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import { getGeoCode } from "../api"
import Map from "./components/Map"
import { Suspense, useState } from "react"
import LocationDropDown from "./components/dropdowns/LocationDropDown"
import { useSuspenseQuery } from "@tanstack/react-query"
import MapTypeDropDown from "./components/dropdowns/MapTypeDropDown"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import AddtionalSkeleton from "./components/skeletons/AddtionalSkeleton"
import SidePanel from "./components/SidePanel"
import Menu from "/src/assets/menu.svg?react"
import MobileHeader from "./components/MobileHeader"
import DarkLightModeToggle from "./components/DarkLightModeToggle"


const App = () => {
  const [coordinates, setCoords] = useState({ lat: 31, lon: 31 })
  const [location, setLocation] = useState('custom')
  const [mapType, setMapType] = useState('clouds_new')
  const [isOpenedSidePanel, setSidePanel] = useState(true)

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
    <main className="w-full flex gap-8">
      <div className="flex flex-col gap-6 w-full lg:w-[calc(100%-320px)] p-6 pb-0">

        <div>
          <div className="sm:hidden">
            <MobileHeader setSidePanel={setSidePanel} />
          </div>
          <div className="flex flex-col gap-4 sm:items-center sm:flex-row">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="text-lg font-medium min-w-fit md:text-xl sm:text-center">Location</span>
              <LocationDropDown location={location} setLocation={setLocation} />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="text-lg font-medium min-w-fit md:text-xl sm:text-center">Map Type</span>
              <MapTypeDropDown mapType={mapType} setMapType={setMapType} />
            </div>
            <div className="flex items-center gap-2">
              <DarkLightModeToggle />
              <Menu className="size-8 max-sm:hidden ml-auto lg:hidden" onClick={() => setSidePanel(true)} />
            </div>
          </div>
        </div>

        <div>
          <Map coords={coords} handleMapClick={handleMapClick} mapType={mapType} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-2">
          <div className="md:col-span-1 2xl:col-span-1 2xl:row-span-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="md:col-span-1 2xl:col-span-1 2xl:row-span-2 2xl:order-4">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="md:col-span-2 2xl:order-2 2xl:row-span-1 2xl:col-span-2">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="md:col-span-2 2xl:order-3 2xl:row-span-1 2xl:col-span-2 2xl:col-start-2 2xl:row-start-2">
            <Suspense fallback={<AddtionalSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
        <SidePanel coords={coords} isOpenedSidePanel={isOpenedSidePanel} setSidePanel={setSidePanel} />
      </div>
    </main>
  )
}

export default App