import { useSuspenseQuery } from "@tanstack/react-query"
import Card from './Card'
import { getWeather } from "../../../api"

const DailyForecast = ({ coords }) => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords.lat, coords.lon],
        queryFn: () => getWeather(coords)
    })

    return (
        <Card title="Daily Forecast" className="pt-4 flex flex-col gap-2">
            {
                data?.daily.map((day, index) =>
                    <div key={index} className="flex justify-between items-center">
                        <span className="w-6">
                            {
                                new Intl.DateTimeFormat("en-US",
                                    {
                                        weekday: "short",
                                        timeZone: data.timezone,
                                    }).format(new Date(day.dt * 1000))
                            }
                        </span>
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
                        <span>{day.temp.day}°F</span>
                        <span className="text-zinc-700">{day.temp.min}°F</span>
                        <span className="text-zinc-700">{day.temp.max}°F</span>

                    </div>
                )
            }
        </Card>
    )
}

export default DailyForecast