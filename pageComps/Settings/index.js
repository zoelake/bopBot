import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'


export const Page = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin:0;
  justify-content: space-between;
  height: 100%;
  padding: 2%;
`;

export const Dashboard = styled.div`
    background-color: ${props => props.bg};
    height:95vh;
    width:100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;

    @media ${device.mobile}{
      padding:30px 10px 10px 10px;

    }
    @media ${device.tablet}{
    }
    @media ${device.desktop}{
       
    }
`;

export const Cont = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  padding-bottom:50px ;
`;

export const Button = styled.button`
  border: none;
  background-color: #fff;
`;




export const HalfCont = styled.div`
  flex:${props => props.flex};
  height:80vh;
  /* border:3px solid red; */
  padding:10px 10px 10px 30px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export const QuartCont = styled.div`
  flex: ${props => props.height};
  /* border:2px solid blue; */
  padding-top:${props => props.padding};
`;

// export const Divider = styled.div`
//   height:80vh;
//   width:2px;
//   background-color: ${props => props.col};

// `;

export const InputCont = styled.div`
    width:80%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    align-items: center;
    padding:5px;
    border-radius: 5px;
    background-color: #fff;
`;

export const LoginInput = styled.input`
    border-radius: 5px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:1.5px solid #525252;
    margin:5px;
    padding:0 10px;
    width: 200px;

    @media ${device.mobile}{

      
      }
      @media ${device.tablet}{
        
      }
      @media ${device.desktop}{
      }
`;



export const ButtonCont = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    text-align:center ;
`;