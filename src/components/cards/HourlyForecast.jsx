import { useQuery } from "@tanstack/react-query"
import Card from "./Card"
const HourlyForecast = () => {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 })
    })

    return (
        <Card title="Hourly Forecast (48 Hours)" className="pt-4">
            <div className="w-full flex gap-2 overflow-x-scroll">
                {
                    data?.hourly.map((hour, index) =>
                        <div key={index} className="min-w-20 flex flex-col items-center gap-2">
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
                            <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} />
                            <span>{Math.round(hour.temp)}°F</span>
                        </div>
                    )
                }
            </div>
        </Card>
    )
}

export default HourlyForecast