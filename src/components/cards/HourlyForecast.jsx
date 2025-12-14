import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import { getWeather } from "../../../api"

const HourlyForecast = ({ coords }) => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords.lat, coords.lon],
        queryFn: () => getWeather(coords)
    })

    return (
        <Card title="Hourly Forecast (48 Hours)" className="pt-3">
            <div className="w-full flex gap-2 overflow-x-scroll">
                {
                    data?.hourly.map((hour, index) =>
                        <div key={index} className="min-w-20 flex flex-col items-center gap-4">
                            <span>
                                {
                                    hour?.dt ?
                                        new Intl.DateTimeFormat("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                            timeZone: data.timezone,
                                        }).format(new Date(hour.dt * 1000))
                                        : "N/A"
                                }
                            </span>
                            <img className="size-12" src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} />
                            <span>{Math.round(hour.temp)}°F</span>
                        </div>
                    )
                }
            </div>
        </Card>
    )
}

export default HourlyForecast