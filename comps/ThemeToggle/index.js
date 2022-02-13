import styled from "styled-components";
import CheckboxComp from '../Checkbox';
import { themes } from "../../utils/variables";
import { theme, usePar, useTheme } from '../../utils/provider';
import MyText from "../Text";
import { teal } from "@mui/material/colors";

const Cont = styled.div`
    display:flex;
    flex-direction: row;
`;

const ThemeCol = styled.div`
    background-color: ${props => props.col};
    width:40px;
    height:40px;
`;

export default function ThemeToggle({
    mode = 'Default',
    theme1 = 'white',
    theme2 = 'black',
    innerCol= 'white',
    outerCol= 'white',
    onClick = () => {},
}) {

    const {parSize} = usePar();

    return <Cont>
        <ThemeCol col={theme1} />
        <ThemeCol col={theme2} />
        <MyText 
            size={`${parSize}px`}
            text={mode}
        />
        <CheckboxComp innerCol={innerCol} outerCol={outerCol} onClick={onClick}/>

    </Cont>
}