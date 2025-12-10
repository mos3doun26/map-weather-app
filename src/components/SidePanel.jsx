import { getAirPollution } from "../../api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Slider } from "./ui/slider"

const SidePanel = (props) => {
    return (
        <div className="h-screen w-80 fixed top-0 right-0 z-1001 bg-sidebar overflow-y-scroll p-4">
            <AirPollution {...props} />
        </div>

    )
}


function AirPollution({ coords }) {
    const { data } = useSuspenseQuery({
        queryKey: ["pollution", coords],
        queryFn: () => getAirPollution(coords)
    })

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium">Air Pollution</h2>
            <span className="text-3xl font-bold">{data?.list[0].main.aqi}</span>
            <span className="text-2xl font-bold">AQI</span>
            {
                Object.entries(data?.list[0]?.components).map(([key, value]) => {
                    const polluent = pollutantLevels[key]

                    const maxValue = (() => {
                        const minMax = pollutantLevels[key]?.very_poor.min
                        if (minMax) {
                            return value > minMax ? value : minMax
                        }
                        return value > 1 ? value : 1
                    })

                    const currentLevel = (() => {
                        switch (true) {
                            case value >= polluent?.good.min && value <= polluent?.good.max:
                                return "Good";
                            case value >= polluent?.fair.min && value <= polluent?.fair.max:
                                return "Fair";
                            case value >= polluent?.moderate.min && value <= polluent?.moderate.max:
                                return "Moderate";
                            case value >= polluent?.poor.min && value <= polluent?.poor.max:
                                return "Poor";
                            case value >= polluent?.very_poor.min && value <= maxValue():
                                return "Very Poor";
                            default:
                                return "Very Poor";
                        }
                    })
                    console.log(currentLevel())

                    return (
                        <div className="rounded-lg bg-linear-to-tr from-sidebar to-sidebar-accent p-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="capitalize font-medium text-lg">{key}</span>
                                <span className="font-medium text-lg">{value}</span>
                            </div>
                            <Slider value={[value || 0]} max={maxValue()} disabled />
                            <div className="flex items-center justify-between">
                                <span>{pollutantLevels[key]?.good.min || 0}</span>
                                <span>{maxValue()}</span>
                            </div>
                            {/* levels */}
                            <div className="flex items-center justify-between">
                                {
                                    levels.map((level, index) => {
                                        return <span
                                            key={index}
                                            className={`font-medium text-xs text-muted-foreground rounded-sm p-1 ${currentLevel() === level ? levelClasses[currentLevel()] : null}`}
                                        >{level}</span>
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


const pollutantLevels = {
    so2: {
        good: { min: 0, max: 20 },
        fair: { min: 20, max: 80 },
        moderate: { min: 80, max: 250 },
        poor: { min: 250, max: 350 },
        very_poor: { min: 350, max: null }
    },
    no2: {
        good: { min: 0, max: 40 },
        fair: { min: 40, max: 70 },
        moderate: { min: 70, max: 150 },
        poor: { min: 150, max: 200 },
        very_poor: { min: 200, max: null }
    },
    pm10: {
        good: { min: 0, max: 20 },
        fair: { min: 20, max: 50 },
        moderate: { min: 50, max: 100 },
        poor: { min: 100, max: 200 },
        very_poor: { min: 200, max: null }
    },
    pm2_5: {
        good: { min: 0, max: 10 },
        fair: { min: 10, max: 25 },
        moderate: { min: 25, max: 50 },
        poor: { min: 50, max: 75 },
        very_poor: { min: 75, max: null }
    },
    o3: {
        good: { min: 0, max: 60 },
        fair: { min: 60, max: 100 },
        moderate: { min: 100, max: 140 },
        poor: { min: 140, max: 180 },
        very_poor: { min: 180, max: null }
    },
    co: {
        good: { min: 0, max: 4400 },
        fair: { min: 4400, max: 9400 },
        moderate: { min: 9400, max: 12400 },
        poor: { min: 12400, max: 15400 },
        very_poor: { min: 15400, max: null }
    }
};

const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]

const levelClasses = {
    Good: "bg-green-500 text-white",
    Fair: "bg-yellow-500 text-white",
    Moderate: "bg-orange-400 text-white",
    Poor: "bg-red-600 text-white",
    "Very Poor": "bg-purple-600 text-white"
}

export default SidePanel