import styled from "styled-components";
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";

const Line = styled.div`
    background-color: ${props=>props.color};
    width:90%;
    height:1px;
`;

export default function Divider(){
    const {theme} = useTheme();
    return <Line 
        color={themes[theme].focus}
    />
}