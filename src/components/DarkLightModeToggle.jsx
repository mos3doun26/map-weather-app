import { Switch } from "./ui/switch"
import Sun from "/src/assets/sun.svg?react"
import Moon from "/src/assets/moon.svg?react"
import { useTheme } from "./ThemeProvider"

const DarkLightModeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex gap-1 items-center">
            <Sun className="size-6" />
            <Switch checked={theme === 'dark'} onCheckedChange={() => toggleTheme()} />
            <Moon className="size-6" />
        </div>
    )
}

export default DarkLightModeToggle