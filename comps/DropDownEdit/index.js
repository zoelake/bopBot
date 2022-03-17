import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from "styled-components";


import { themes } from "../../utils/variables";
import { useTheme, usePar } from "../../utils/provider";


const ButtonCont = styled.div`
    color: ${props => props.color};
    cursor: pointer;
`;

const MenuCont = styled.div`
    color: ${props => props.color};
`;

const options = [
    'Edit Details',
    'Download',
    'Delete',
];

const ITEM_HEIGHT = 48;

export default function DropDownEdit({


}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const { theme } = useTheme();



  return (
    <div>
      <ButtonCont
        aria-label="more" //accessbility
        id="long-button"
        color={themes[theme].heart}
        //need to figure out theming
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </ButtonCont>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              color: '#fff',
              backgroundColor:'#000'
            //   backgroundColor:${props => props.bg};
            },
          }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === ''} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}