import styled from "styled-components";
import CheckboxComp from '../Checkbox';
import { themes } from "../../utils/variables";
import { theme, usePar, useTheme } from '../../utils/provider';
import MyText from "../Text";
import { teal } from "@mui/material/colors";
import MyRadio from "../Radio";
import { useState } from "react";
import { device } from '../../styles/mediaSizes'

const Cont = styled.div`


    @media ${device.mobile}{
        display:flex;
        flex-direction: row;
        margin-bottom: 30px;
        justify-content: space-between;
        max-width: 400px;

    }

    @media ${device.tablet}{
        display:flex;
        flex-direction: row;
        margin-bottom: 30px;
        justify-content: space-between;
        max-width: 500px;

    }

    @media ${device.desktop}{
        display:flex;
        flex-direction: row;
        margin-bottom: 30px;
        justify-content: space-between;
        max-width: 80%;

    }

`;

const ThemeColCont = styled.div`
@media ${device.mobile}{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 250px;
    height:50px;

  }

  @media ${device.tablet}{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 400px;
    height:50px;

  }

  @media ${device.desktop}{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 400px;
    height:50px;

  }

`;

const ThemeCol = styled.div`

@media ${device.mobile}{
    background-color: ${props => props.col};
    width:40px;
    height:40px;

  }

  @media ${device.tablet}{
    background-color: ${props => props.col};
    width:40px;
    height:40px;

  }

  @media ${device.desktop}{
    background-color: ${props => props.col};
    width:40px;
    height:40px;

  }

`;

const Spacer = styled.div`
@media ${device.mobile}{
    width:10px;

  }

  @media ${device.tablet}{
    width:20px;

  }

  @media ${device.desktop}{
    width:20px;

  }
    
`;


export default function ThemeToggle({
    mode = 'Default',
    theme1 = 'white',
    theme2 = 'black',
    // innerCol = 'white',
    // outerCol = 'white',
    // onClick = () => { },
    radioClick = () => { },
    inner = true,
}) {

    const { parSize } = usePar();

    return <Cont>
        <div>
            <ThemeColCont>
                <ThemeCol col={theme1} />
                <ThemeCol col={theme2} />
                <Spacer />
                <MyText
                    size={`${parSize}px`}
                    text={mode}
                />
            </ThemeColCont>

        </div>
        <MyRadio inner={inner} onClick={radioClick} />
        {/* <CheckboxComp innerCol={innerCol} outerCol={outerCol} onClick={onClick} /> */}

    </Cont>
}