import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const AddtionalSkeleton = () => {
    return (
        <Card title="Additional Weather Info" className="pt-4">
            <div className="flex flex-col 2xl:grid gap-3 grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) =>
                    <div key={index} className="flex justify-between items-center">
                        <Skeleton className="w-18 h-9" />
                        <Skeleton className="w-15 h-6" />
                    </div>
                )
                }
            </div>
        </Card>
    )
}

export default AddtionalSkeleton