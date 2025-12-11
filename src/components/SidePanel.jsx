import { getAirPollution } from "../../api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Slider } from "./ui/slider"
import Chevron from "/src/assets/chevron.svg?react"
import clsx from "clsx"
import Info from "/src/assets/information.svg?react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Suspense } from "react"
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton"

const SidePanel = (props) => {
    const { coords, isOpenedSidePanel, setSidePanel } = props

    return (
        <div
            className={clsx(
                `h-screen w-80 fixed top-0 right-0 z-1001 bg-sidebar overflow-y-scroll p-4 transition-transform duration-300`,
                isOpenedSidePanel ? "translate-x-0" : "translate-x-full"
            )}
        >
            <Chevron className="size-8 -ml-2 invert" onClick={() => setSidePanel(false)} />
            <Suspense fallback={<SidePanelSkeleton />}>
                <AirPollution {...props} />
            </Suspense>
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
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">AQI</span>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Info className="size-4 invert" />
                    </TooltipTrigger>
                    <TooltipContent className="z-1500">
                        <p className="max-w-xs">
                            Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good,2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {
                Object.entries(data?.list[0]?.components).map(([key, value]) => {
                    const pollutant = pollutantLevels[key]

                    const maxValue = (() => {
                        const minMax = pollutant["Very Poor"].min
                        return value > minMax ? value : minMax
                    })

                    const currentLevel = (() => {
                        switch (true) {
                            case value >= pollutant?.Good.min && value <= pollutant?.Good.max:
                                return "Good";
                            case value >= pollutant?.Fair.min && value <= pollutant?.Fair.max:
                                return "Fair";
                            case value >= pollutant?.Moderate.min && value <= pollutant?.Moderate.max:
                                return "Moderate";
                            case value >= pollutant?.Poor.min && value <= pollutant?.Poor.max:
                                return "Poor";
                            case value >= pollutant["Very Poor"].min && value <= maxValue():
                                return "Very Poor";
                            default:
                                return "Very Poor";
                        }
                    })

                    return (
                        <div key={key} className="rounded-lg bg-linear-to-tr from-sidebar to-sidebar-accent p-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="capitalize font-medium text-lg">{key}</span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="size-4 invert" />
                                        </TooltipTrigger>
                                        <TooltipContent className="z-1500">
                                            <p className="max-w-xs">{pollutantNames[key]}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <span className="font-medium text-lg">{value}</span>
                            </div>
                            <Slider value={[value]} max={maxValue()} disabled />
                            <div className="flex items-center justify-between">
                                <span>{pollutant?.Good.min}</span>
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
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 80 },
        Moderate: { min: 80, max: 250 },
        Poor: { min: 250, max: 350 },
        "Very Poor": { min: 350, max: null }
    },
    no2: {
        Good: { min: 0, max: 40 },
        Fair: { min: 40, max: 70 },
        Moderate: { min: 70, max: 150 },
        Poor: { min: 150, max: 200 },
        "Very Poor": { min: 200, max: null }
    },
    pm10: {
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 50 },
        Moderate: { min: 50, max: 100 },
        Poor: { min: 100, max: 200 },
        "Very Poor": { min: 200, max: null }
    },
    pm2_5: {
        Good: { min: 0, max: 10 },
        Fair: { min: 10, max: 25 },
        Moderate: { min: 25, max: 50 },
        Poor: { min: 50, max: 75 },
        "Very Poor": { min: 75, max: null }
    },
    o3: {
        Good: { min: 0, max: 60 },
        Fair: { min: 60, max: 100 },
        Moderate: { min: 100, max: 140 },
        Poor: { min: 140, max: 180 },
        "Very Poor": { min: 180, max: null }
    },
    co: {
        Good: { min: 0, max: 4400 },
        Fair: { min: 4400, max: 9400 },
        Moderate: { min: 9400, max: 12400 },
        Poor: { min: 12400, max: 15400 },
        "Very Poor": { min: 15400, max: null }
    },
    no: {
        Good: { min: 0, max: 20 },
        Fair: { min: 20, max: 40 },
        Moderate: { min: 40, max: 60 },
        Poor: { min: 60, max: 80 },
        "Very Poor": { min: 80, max: null },
    },
    nh3: {
        Good: { min: 0, max: 40 },
        Fair: { min: 40, max: 70 },
        Moderate: { min: 70, max: 150 },
        Poor: { min: 150, max: 200 },
        "Very Poor": { min: 200, max: null },
    },
};

const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]

const levelClasses = {
    Good: "bg-green-500 text-white",
    Fair: "bg-yellow-500 text-white",
    Moderate: "bg-orange-400 text-white",
    Poor: "bg-red-600 text-white",
    "Very Poor": "bg-purple-600 text-white"
}

const pollutantNames = {
    co: "Carbon Monoxide",
    no: "Nitric Oxide",
    no2: "Nitrogen Dioxide",
    o3: "Ozone",
    so2: "Sulfur Dioxide",
    pm2_5: "Fine Particulate Matter (PM2.5)",
    pm10: "Coarse Particulate Matter (PM10)",
    nh3: "Ammonia"
}


export default SidePanel