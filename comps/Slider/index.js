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
`;

const SliderCont = styled.div``;

const SliderMain = styled(Slider)`
    color: ${props => props.barcolor};
    height:130px;
    width:10px;
    & .MuiSlider-thumb {
        border-radius: 5px;
        height: 35px;
        width: 23px;
        color: ${props => props.thumbcolor};
    }
`;

function MySlider({
    text = "title",
    min = 0,
    max = 100,
    value,
    onChange = ()=>{},
    step = 33,
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
    text={text}/>

    </Cont>
}

export default MySlider;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { themes } from "../../utils/variables";
// import { usePar, useTheme } from "../../utils/provider";
// import { Slider } from '@mui/material';
// import MyText from '../Text';

// const Cont = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;

// const SliderCont = styled.div``;

// const SliderMain = styled(Slider)`
//     color: ${props => props.barcolor};
//     height:130px;
//     & .MuiSlider-thumb {
//         border-radius: 5px;
//         height: 35px;
//         color: ${props => props.thumbcolor};
//     }
// `;

// function MySlider({
//     barcolor = "#212121",
//     thumbcolor = "#C4C4C4",
//     text = "title",
//     value = 0,
//     min = 0,
//     max =0,
//     onChange= ()=>{},
// }) {

//     const {themes} = useTheme();
//     const {parSize} = usePar();

//     return <Cont>
//     <SliderCont>
//         <SliderMain
//             sx={{
//                 '& input[type="range"]': {
//                     WebkitAppearance: 'slider-vertical',
//                 },
//             }}
//             barcolor={barcolor}
//             thumbcolor={thumbcolor}
//             orientation="vertical"
//             defaultValue={30}
//             aria-label="Temperature"
//             // steps={4}
//             // min={min}
//             // max={max}
//             // value={value}
//             // onChange={onChange}
//         />
        
//     </SliderCont>
//     <MyText
//     size={`${parSize}px`}
//     text={text}/>
//     </Cont>
// }

// export default MySlider;