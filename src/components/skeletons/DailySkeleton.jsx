import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const DailySkeleton = () => {
    return (
        <Card title="Daily Forecast" className="pt-4 flex flex-col gap-2">
            {
                Array.from({ length: 8 }).map((_, index) =>
                    <div key={index} className="flex justify-between items-center">
                        <Skeleton className="w-10 h-6" />
                        <Skeleton className="size-12 rounded-full" />
                        <Skeleton className="w-10 h-6" />
                        <Skeleton className="w-10 h-6" />
                        <Skeleton className="w-10 h-6" />
                    </div>
                )
            }
        </Card>
    )
}

export default DailySkeleton