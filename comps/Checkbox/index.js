
   
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
    display = 'circle',
    innerCol = 'white',
    outerCol = 'white',
    onClick = () => {},
}) {


if(display === 'heart'){
  return<Container onClick={onClick}>
      <Checkbox sx={{
       color: innerCol,
     '&.Mui-checked': {
      color: outerCol,
    },
    }} icon={<FavoriteBorder />} checkedIcon={<Favorite/>} />
  </Container>
}

if(display === 'circle'){
  return <Container onClick={onClick}>

    <Checkbox sx={{
       color: innerCol,
     '&.Mui-checked': {
      color: outerCol,
    },
    }} icon={<CircleOutlinedIcon />} checkedIcon={<CircleRoundedIcon/>} />


    </Container>
}
    
}

export default CheckboxComp;