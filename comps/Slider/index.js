import React, { useState } from 'react';
import styled from 'styled-components'

import { Slider } from '@mui/material';

const Container = styled.div`
    display: flex;
    height: 200px;
`;

const SliderMain = styled(Slider)`
    color: #212121;;

    & .MuiSlider-thumb {
        border-radius: 5px;
        height: 35px;
        color: #C4C4C4;
    }
`;

function Switch() {

    const [theme, setTheme] = useState(false)

    return <Container>
        <SliderMain
            sx={{
            '& input[type="range"]': {
             WebkitAppearance: 'slider-vertical',
             },
        }}
            orientation="vertical"
            defaultValue={30}
            aria-label="Temperature"
        />

    </Container>
}

export default Switch;