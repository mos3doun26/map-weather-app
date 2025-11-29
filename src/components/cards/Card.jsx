const Card = ({ title, children, className }) => {
    return (
        <div className="p-4 bg-zinc-900 rounded-xl w-screen">
            <h1 className="text-3xl font-medium">{title}</h1>
            <div className={className}>{children}</div>
        </div>
    )
}

export default Card