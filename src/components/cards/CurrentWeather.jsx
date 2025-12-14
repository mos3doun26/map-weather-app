import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../../api"

const CurrentWeather = ({ coords }) => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords.lat, coords.lon],
        queryFn: () => getWeather(coords)
    })

    return (
        <Card title="Current Weather" className="flex flex-col gap-6 items-center justify-center overflow-hidden">
            <span className="text-5xl font-medium">{Math.round(data?.current.temp)}°F</span>
            <img className="size-18" src={` https://openweathermap.org/img/wn/${data?.current.weather[0].icon}.png`} />
            <span className="capitalize text-xl">{data?.current.weather[0].description}</span>
            <div className="flex flex-col items-center">
                <span>Local Time:</span>
                <span className="text-3xl font-semibold">
                    {
                        data?.timezone && data?.current?.dt ?
                            new Intl.DateTimeFormat("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: data.timezone,
                            }).format(new Date(data.current.dt * 1000))
                            : "N/A"
                    }
                </span>
            </div>
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Feels Like</span>
                    <sapn>{data?.current.feels_like}°F</sapn>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Humidity</span>
                    <sapn>{data?.current.humidity} %</sapn>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Wind</span>
                    <sapn>{data?.current.wind_speed} mph</sapn>
                </div>
            </div>
        </Card>
    )
}

export default CurrentWeather