import Info from "/src/assets/information.svg?react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Skeleton } from "../ui/skeleton"

const SidePanelSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-medium">Air Pollution</h2>
            <Skeleton className="h-9 w-12" />
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
            <div className="flex flex-col gap-2">
                {
                    Array.from({ length: 8 }).map((_, index) => {
                        return (
                            <Skeleton key={index} className="h-30.5 w-68 bg-linear-to-tr from-sidebar to-sidebar-accent" />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SidePanelSkeleton