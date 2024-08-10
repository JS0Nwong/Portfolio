import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function useTheme() { return useContext(ThemeContext) }

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const toggleTheme = () => { setDarkMode((prev) => !prev) }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if (!localTheme) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
                setDarkMode(true)
            }
        } else {
            setDarkMode(localTheme === 'dark')
        }
    }, [])

    useEffect(() => {
        document.documentElement.className = darkMode ? 'dark' : 'light'
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )   
}

export default ThemeContext