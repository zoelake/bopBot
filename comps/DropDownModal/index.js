import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from "styled-components";

import { themes } from "../../utils/variables";
import { useTheme, usePar, } from "../../utils/provider";
import { textAlign } from '@mui/system';


const ButtonCont = styled.div`
    background-color:${props => props.bg};
    cursor: pointer;
`;

const MyMoreVertIcon = styled(MoreVertIcon)`
  color:${props => props.color};
`;



const ITEM_HEIGHT = 48;

export default function DropDownEdit({
  playlists
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { theme } = useTheme();
  // const ref = useRef(null);
  //position dont delte
  const [userPlaylists, setUserPlaylists] = useState([])


  const testOptions = [
    'Add to playlist',
    'Download',
  ]

  function onSelect(playlist_name, e) {
    localStorage.setItem('selectedPlaylist', playlist_name)
    localStorage.setItem('request', 'add')
    handleClose();
  }

  function onDeselect(playlist_name, e) {
    localStorage.setItem('selectedPlaylist', playlist_name)
    localStorage.setItem('request', 'remove')
    handleClose();
  }



  return (
    <div>
      <ButtonCont
        aria-label="more" //aria is for accessbility // default on mui
        id="long-button"
        color={themes[theme].dark}

        //need to figure out theming
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
      >
        <MyMoreVertIcon
          color={themes[theme].text}
        />
      </ButtonCont>
      <Menu
        style={{
          position: 'absolute',
        }}
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}

        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        autoFocus={false}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '200px',
            color: '#fff',
            padding: '10px',
            backgroundColor: themes[theme].heart,
            zIndex: 1,

          },
        }}
      >
        <ListItemText>Add to:</ListItemText>
        {playlists != [] ? playlists.map((o, i) => (<div key={i} style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <MenuItem
            selected={o === ''}
            onClick={(obj, e) => onSelect(o.name, e)}
          >
            {o.name}
          </MenuItem></div>
        ))
          : testOptions.map((o, i) => (
            <MenuItem
              key={i}
              selected={o === ''}
              onClick={(obj, e) => onSelect(o.name, e)}
            >
              {o.name}
            </MenuItem>
          ))}
        <ListItemText>Remove from:</ListItemText>
        {playlists != [] ? playlists.map((o, i) => (<div key={i} style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <MenuItem
            selected={o === ''}
            onClick={(obj, e) => onDeselect(o.name, e)}
          >
            {o.name}
          </MenuItem></div>
        ))
          : testOptions.map((o, i) => (
            <MenuItem
              key={i}
              selected={o === ''}
              onClick={(obj, e) => onDeSelect(o.name, e)}
            >
              {o.name}
            </MenuItem>
          ))}

      </Menu>
    </div>
  );
}