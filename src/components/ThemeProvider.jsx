import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        const root = document.documentElement
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark')
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider


export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("should use theme context under theme provider.");
    }
    return context
}