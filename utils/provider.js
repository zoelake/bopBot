import { useContext, createContext, useState } from "react";
import { themes } from './variables';


const initialState = {
    theme: 'funky',
    setTheme: () => { },
    page: '/',
    setPage: () => {},
}

const MyThemeContext = createContext(initialState);

export default function MyThemeProvider({ children }) {

    const [theme, setTheme] = useState(initialState.theme);
    const [page, setPage] = useState(initialState.page);

    return <MyThemeContext.Provider value={{
        theme, setTheme, page, setPage,
    }}>
        <style jsx global>
            {`
                body {
                    background-color:${themes[theme].dark}
                }
            `}
        </style>
        {children}
    </MyThemeContext.Provider>
}

export const useTheme = () => {
    const { theme, setTheme } = useContext(MyThemeContext);
    return { theme, setTheme };
}

export const usePage = () => {
    const { page, setPage } = useContext(MyThemeContext);
    return { page, setPage};
}

