import React, { useState } from 'react';
import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { usePar, useTheme } from "../../utils/provider";
import { Slider } from '@mui/material';
import MyText from '../Text';

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 30px 5px 0;
`;

const SliderCont = styled.div``;

const SliderMain = styled(Slider)`
    color: ${props => props.barcolor};
    height:115px;
    width:10px;
    & .MuiSlider-thumb {
        border-radius: 5px;
        height: 35px;
        width: 23px;
        color: ${props => props.thumbcolor};
        box-shadow: inset 3px 3px 2px rgba(255,255,255,0.25);
    }
`;

function MySlider({
    text = "title",
    min = 0,
    max = 100,
    value,
    onChange = ()=>{},
    step = 33,
    number = 0,
}) {

    const {theme} = useTheme();
    const {parSize} = usePar();

    return <Cont>
    <SliderCont>
        <SliderMain
            sx={{
                '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                },
            }}
            barcolor={themes[theme].sliderBg}
            thumbcolor={themes[theme].slider}
            orientation="vertical"
            aria-label="Temperature"
           marks
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
        />
        
    </SliderCont>
    <MyText
    size={`${parSize}px`}
    text={number}/>
    <MyText
    size={`${parSize}px`}
    text={text}/>

    </Cont>
}

export default MySlider;

