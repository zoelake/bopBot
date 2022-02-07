import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Text = styled.p`
    color: ${props=>props.color};
    font-size: ${props=>props.fontSize};
    line-height: auto;
    margin:15px;
    padding:0;
`;

const TrackCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly
`;

export default function MyTrack({
    text = 'button',
    size = '18px',
    onClick = () => {},
}){

    const {theme} = useTheme();
   

    return <TrackCont>
        <div>1</div>
        <div>In the House
            Zoe James
        </div>
        <div>Time</div>
        <div>Diffy</div>
        <div>Icon</div>

        
    </TrackCont>
    
    // <Text
    // color={themes[theme].focus}
    // fontSize={size}
    // >{text}</Text>
    
}