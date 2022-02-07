import React, { useState } from 'react';
import styled from 'styled-components'

import { Slider } from '@mui/material';

const Container = styled.div`
    display: flex;
    height: 200px;
`;

const SliderMain = styled(Slider)`
    color: ${props=>props.barcolor};

    & .MuiSlider-thumb {
        border-radius: 5px;
        height: 35px;
        color: ${props=>props.thumbcolor};
    }
`;

function Switch({
    barcolor="#212121",
    thumbcolor="#C4C4C4",
}) {


    return <Container>
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
    </Container>
}

export default Switch;