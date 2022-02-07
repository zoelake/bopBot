import { useContext, createContext, useState } from "react";
import {themes} from './variables';


const initialState =  {
    theme:'light',
    setTheme:()=>{},
}

const MyThemeContext = createContext(initialState);

export default function MyThemeProvider({children}){

    const [theme, setTheme] = useState(initialState.theme);

    return <MyThemeContext.Provider value={{
        theme, setTheme,
        }}>
        <style jsx global>
            {`
                body {
                    background-color:${themes[theme].contrast}
                }
            `}
        </style>
        {children}
    </MyThemeContext.Provider>
}

export const useTheme = () => {
    const {theme, setTheme} = useContext(MyThemeContext);
    return {theme, setTheme};
}

