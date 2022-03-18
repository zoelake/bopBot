import React, { useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { themes } from "../../utils/variables";
import { useTheme, usePar } from "../../utils/provider";




//NOT IN USE!!!!!!!!! TRY ONLY
const DropDownContainer = styled("div")`
  /* width: auto; */
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  color: ${props => props.color};
`;

const DropDownListContainer = styled("div")`
   /* height: 100%; */
   /* position: relative; */
   margin-top: -20px;
`;

const DropDownList = styled("ul")`
  width: auto;
  padding: .8em;
  background-color:${props => props.bg};
  border-radius: 1px;
  box-sizing: border-box;
  color: ${props => props.color};
  font-size: 18px;

`;

const ListItem = styled("li")`
  list-style: none;
`;

export default function DropDownStyled() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);


  const { theme } = useTheme();

  return (
      <DropDownContainer>
        <DropDownHeader 
        onClick={toggling}
        color={themes[theme].white}
        >
            <MoreHorizIcon/>

        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList
            bg={themes[theme].heart}
            color={themes[theme].white}>
              <ListItem >Add to playlist</ListItem>
              <ListItem>Download</ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
  );
}