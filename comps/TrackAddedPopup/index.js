import styled from "styled-components";
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import MyText from "../../comps/Text/index"

const Cont = styled.div`
    width: 400px;
    height:60px;
    display: flex;
    background-color: rgba(255,255,255,0.2);
    border-radius: 10px;
    justify-content: center;
    text-align:center;
`;


const TrackAddedPlaylist = ({

})=>{

    const {theme} = useTheme();
    const {parSize} = usePar();

    return (
    <Cont
    bg={themes[theme].contrast}
    >
        <MyText  
        size={`${parSize}px`}
        text= "Track Added to Playlist!"
        />
    </Cont>
    );
}

export default TrackAddedPlaylist;