import React, { useState } from 'react';
import styled from 'styled-components'

import { Checkbox,  } from '@mui/material';
import { teal } from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

const Container = styled.div`
    display: flex;

`;



function CheckboxComp({
    FirstColor = teal[800],
    SecondColor = teal[800]
}) {



    return <Container>
<Checkbox sx={{
       color: FirstColor,
     '&.Mui-checked': {
       color: SecondColor,
    },
    }} icon={<FavoriteBorder />} checkedIcon={<Favorite/>} />
    <Checkbox sx={{
       color: FirstColor,
     '&.Mui-checked': {
       color: SecondColor,
    },
    }} icon={<CircleOutlinedIcon />} checkedIcon={<CircleRoundedIcon/>} />


    </Container>
}

export default CheckboxComp;