import { Skeleton } from "../ui/skeleton"
import Card from "../cards/Card"

const AddtionalSkeleton = () => {
    return (
        <Card title="Additional Weather Info" className="pt-4 flex flex-col gap-4">
            {
                Array.from({ length: 7 }).map((_, index) =>
                    <div key={index} className="flex justify-between items-center">
                        <Skeleton className="w-18 h-7" />
                        <Skeleton className="w-15 h-6" />
                    </div>
                )
            }
        </Card>
    )
}

export default AddtionalSkeleton