import Card from "./Card"
import { useQuery } from "@tanstack/react-query"
const CurrentWeather = () => {
    const { data } = useQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 50, lon: 50 })
    })
    return (
        <Card title="Current Weather" className="flex flex-col gap-4 items-center justify-center overflow-hidden">
            <span className="text-5xl font-medium">{Math.round(data?.current.temp)}°F</span>
            <img className="size-15" src={` https://openweathermap.org/img/wn/${data?.current.weather[0].icon}.png`} />
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
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-zinc-500">Feels Like</span>
                    <sapn>{data?.current.feels_like}°F</sapn>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-zinc-500">Humidity</span>
                    <sapn>{data?.current.humidity} %</sapn>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <span className="text-zinc-500">Wind</span>
                    <sapn>{data?.current.wind_speed} mph</sapn>
                </div>
            </div>
        </Card>
    )
}

export default CurrentWeather