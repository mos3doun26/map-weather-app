import clsx from "clsx"

const Card = ({ title, children, className }) => {
    return (
        <div className="p-4 bg-linear-to-br from-card to-card/60 rounded-xl shadow-md">
            <h1 className="text-3xl font-medium">{title}</h1>
            <div
                className={clsx(className, "animate-[fade-in_2s_ease-in-out_forwards]")}
            >{children}</div>
        </div>
    )
}

export default Card