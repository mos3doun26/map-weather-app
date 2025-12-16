import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import Cloud from "/src/assets/cloud.svg?react"
import Sunrise from "/src/assets/sunrise.svg?react"
import Sunset from "/src/assets/sunset.svg?react"
import Wind from "/src/assets/wind.svg?react"
import Uv from "/src/assets/uv.svg?react"
import Pressure from "/src/assets/pressure.svg?react"
import Humidity from "/src/assets/humidity.svg?react"
import ArrowUp from "/src/assets/arrow-up.svg?react"
import { getWeather } from "../../../api"

const AdditionalInfo = ({ coords }) => {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords.lat, coords.lon],
        queryFn: () => getWeather(coords)
    })

    const FormatedComponent = ({ value, number }) => {
        if (value === "sunrise" || value === "sunset") {
            return data?.timezone && data?.current?.dt ?
                new Intl.DateTimeFormat("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: data.timezone,
                }).format(new Date(data.current[value] * 1000))
                : "N/A"
        }

        if (value === "wind_deg") {
            return <ArrowUp className="size-8 " style={{ transform: `rotate(${number}deg)` }} />
        }

        return number

    }

    return (
        <Card title="Additional Weather Info" className="pt-4">
            <div className="flex flex-col 2xl:grid gap-3 grid-cols-2">
                {
                    rows.map(({ label, value, Icon }, index) =>
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <span className="text-lg text-zinc-500 font-medium">{label}</span>
                                <Icon className="size-9 " />
                            </div>
                            <span>
                                <FormatedComponent value={value} number={data?.current[value]} />
                            </span>
                        </div>
                    )
                }
            </div>
        </Card>
    )
}


const rows = [
    { label: "Cloudiness (%)", value: "clouds", Icon: Cloud },
    { label: "Wind Direction", value: "wind_deg", Icon: Wind },
    { label: "Sunrise", value: "sunrise", Icon: Sunrise },
    { label: "Sunset", value: "sunset", Icon: Sunset },
    { label: "Pressure (hPa)", value: "pressure", Icon: Pressure },
    { label: "UV Index", value: "uvi", Icon: Uv },
];

export default AdditionalInfo