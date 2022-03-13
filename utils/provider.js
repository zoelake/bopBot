import { useContext, createContext, useState } from "react";
import { themes } from './variables';


const initialState = {
    theme: 'dark',
    setTheme: () => { },
    page: 'home',
    setPage: () => { },
    explicit: true,
    setExplicit: () => { },

    //fonts
    titleSize: 36,
    setTitleSize: () => { },
    headerSize: 24,
    setHeaderSize: () => { },
    parSize: 18,
    setParSize: () => { },

    //sizing updates
    sbSize: 85,
    setSbSize: () => { },

    //user
    user:null,
    setUser: () => {},
}

const MyThemeContext = createContext(initialState);

export default function MyThemeProvider({ children }) {

    //choose theme
    const [theme, setTheme] = useState(initialState.theme);
    //navbar highlight current page
    const [page, setPage] = useState(initialState.page);
    //allow explicit tracks in filter
    const [explicit, setExplicit] = useState(initialState.explicit);
    //font sizing
    const [titleSize, setTitleSize] = useState(initialState.titleSize)
    const [headerSize, setHeaderSize] = useState(initialState.headerSize)
    const [parSize, setParSize] = useState(initialState.parSize)
    const [sbSize, setSbSize] = useState(initialState.sbSize)
    //user
    const [user, setUser] = useState(initialState.user)


    return <MyThemeContext.Provider value={{
        theme, setTheme, page, setPage, explicit, setExplicit, titleSize, setTitleSize, headerSize, setHeaderSize, parSize, setParSize, sbSize, setSbSize, user, setUser,
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
    const { theme, setTheme } = useContext(MyThemeContext);
    return { theme, setTheme };
}

export const usePage = () => {
    const { page, setPage } = useContext(MyThemeContext);
    return { page, setPage };
}

export const useExplicit = () => {
    const { explicit, setExplicit } = useContext(MyThemeContext);
    return { explicit, setExplicit };
}

export const useTitle = () => {
    const { titleSize, setTitleSize } = useContext(MyThemeContext);
    return { titleSize, setTitleSize };
}

export const useHeader = () => {
    const { headerSize, setHeaderSize } = useContext(MyThemeContext);
    return { headerSize, setHeaderSize };
}

export const usePar = () => {
    const { parSize, setParSize } = useContext(MyThemeContext);
    return { parSize, setParSize };
}

export const useSbSize = () => {
    const { sbSize, setSbSize } = useContext(MyThemeContext);
    return { sbSize, setSbSize };
}

export const currentUser = () => {
    const { user, setUser } = useContext(MyThemeContext);
    return { user, setUser };
}
