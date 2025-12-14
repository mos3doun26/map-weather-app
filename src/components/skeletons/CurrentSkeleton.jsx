import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const CurrentSkeleton = () => {
    return (
        <Card title="Current Weather" className="flex flex-col gap-7 items-center justify-center overflow-hidden pt-1">
            <Skeleton className="w-24 h-12" />
            <Skeleton className="size-18 rounded-full" />
            <Skeleton className="w-20 h-7" />
            <div className="flex flex-col items-center">
                <span>Local Time:</span>
                <Skeleton className="w-31 h-9" />

            </div>
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Feels Like</span>
                    <Skeleton className="w-13 h-6" />

                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Humidity</span>
                    <Skeleton className="w-13 h-6" />

                </div>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-zinc-500">Wind</span>
                    <Skeleton className="w-13 h-6" />

                </div>
            </div>
        </Card>
    )
}

export default CurrentSkeleton