import Menu from "/src/assets/menu.svg?react"

const MobileHeader = ({ setSidePanel }) => {
    return (
        <div className="fixed top-0 left-0 bg-black w-full items-center h-10 flex z-1000 py-6 px-2 border-b border-zinc-400">
            <Menu className="ml-auto size-9 invert" onClick={() => setSidePanel(true)} />
        </div>
    )
}

export default MobileHeader