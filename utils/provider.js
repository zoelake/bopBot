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

    //filtering
    // genre: null,
    // setGenre: () => { },
    // acoustic: null,
    // setAcoustic: () => { },
    // danceability: null,
    // setDanceability: () => { },
    // energy: null,
    // setEnergy: () => { },
    // instrumentals: null,
    // setInstrumentals: () => { },
    // loudness: null,
    // setLoudness: () => { },
    // tempo: null,
    // setTempo: () => { },
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
    // const [genre, setGenre] = useState(initialState.genre)
    // const [acoustic, setAcoustic] = useState(initialState.acoustic)
    // const [danceability, setDanceability] = useState(initialState.danceability)
    // const [energy, setEnergy] = useState(initialState.energy)
    // const [instrumentals, setInstrumentals] = useState(initialState.instrumentals)
    // const [loudness, setLoudness] = useState(initialState.loudness)
    // const [tempo, setTempo] = useState(initialState.tempo)


    return <MyThemeContext.Provider value={{
        theme, setTheme, page, setPage, explicit, setExplicit, titleSize, setTitleSize, headerSize, setHeaderSize, parSize, setParSize,

        // genre, setGenre, acoustic, setAcoustic, danceability, setDanceability, energy, setEnergy, instrumentals, setInstrumentals, loudness, setLoudness, tempo, setTempo,

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

// export const useGenre = () => {
//     const { genre, setGenre } = useContext(MyThemeContext);
//     return { genre, setGenre };
// }

// export const useAcoustic = () => {
//     const { acoustic, setAcoustic } = useContext(MyThemeContext);
//     return { acoustic, setAcoustic };
// }

// export const useDanceability = () => {
//     const { danceability, setDanceability } = useContext(MyThemeContext);
//     return { danceability, setDanceability };
// }

// export const useEnergy = () => {
//     const { energy, setEnergy } = useContext(MyThemeContext);
//     return { energy, setEnergy };
// }

// export const useInstrumentals = () => {
//     const { instrumentals, setInstrumentals } = useContext(MyThemeContext);
//     return { instrumentals, setInstrumentals };
// }

// export const useLoudness = () => {
//     const { loudness, setLoudness } = useContext(MyThemeContext);
//     return { loudness, setLoudness };
// }


// export const useTempo = () => {
//     const { tempo, setTempo } = useContext(MyThemeContext);
//     return { tempo, setTempo };
// }
