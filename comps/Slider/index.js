import React, { useState } from 'react';
import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { Slider } from '@mui/material';
import MyText from '../Text';

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SliderCont = styled.div``;

const SliderMain = styled(Slider)`
    color: ${props => props.barcolor};
    height:130px;
    & .MuiSlider-thumb {
        border-radius: 5px;
        height: 35px;
        color: ${props => props.thumbcolor};
    }
`;

function MySlider({
    barcolor = "#212121",
    thumbcolor = "#C4C4C4",
    text = "title",
}) {

    const {themes} = useTheme();

    return <Cont>
    <SliderCont>
        <SliderMain
            sx={{
                '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                },
            }}
            barcolor={barcolor}
            thumbcolor={thumbcolor}
            orientation="vertical"
            defaultValue={30}
            aria-label="Temperature"
        />
        
    </SliderCont>
    <MyText
    size='18px'
    text={text}/>
    </Cont>
}

export default MySlider;