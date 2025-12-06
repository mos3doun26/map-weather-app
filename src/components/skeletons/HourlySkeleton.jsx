import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const HourlySkeleton = () => {
    return (
        <Card title="Hourly Forecast (48 Hours)" className="pt-4">
            <div className="w-full flex gap-2 overflow-x-scroll">
                {
                    Array.from({ length: 48 }).map((_, index) =>
                        <div key={index} className="min-w-20 flex flex-col items-center gap-2">
                            <Skeleton className="w-16 h-6" />
                            <Skeleton className="size-13 rounded-full" />
                            <Skeleton className="w-9 h-6" />
                        </div>
                    )
                }
            </div>
        </Card>
    )
}

export default HourlySkeleton