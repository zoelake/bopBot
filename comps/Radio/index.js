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


function Switch() {



    return <Container>
    <Checkbox sx={{
        color: teal[800],
     '&.Mui-checked': {
        color: teal[600],
     }, 
     
    }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

    <Checkbox sx={{
       color: teal[800],
     '&.Mui-checked': {
       color: teal[600],
    },
    }} icon={<CircleOutlinedIcon />} checkedIcon={<CircleRoundedIcon/>} />


    </Container>
}

export default Switch;