import styled from "styled-components";
import { device } from '../../styles/mediaSizes'


export const Page = styled.div`
  display:flex;
  margin:0;
  width:100%;
  /* position: absolute; */
  bottom:0;
 
  /* border:8px solid green; */
  @media ${device.mobile}{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100%;
    top:30%;
  }
  @media ${device.tablet}{
    flex-direction: row;
    justify-content: space-between;
    height:95vh;
  }
  @media ${device.desktop}{
    flex-direction: row;
    justify-content: space-between;
    height:95vh;
    top:10%;
  }
`;
export const Dashboard = styled.div`
    height:95vh;
    width:60%;
    /* border:5px solid red; */
    @media ${device.mobile}{
      width:90%;
      padding:30px 0px 10px 0px;
      margin-bottom: 200px;
    }
    @media ${device.tablet}{
      width:55%;
      padding:30px 10px 10px 60px;
    }
    @media ${device.desktop}{
      width:55%;
      padding:30px 10px 10px 60px;
    }
`;
export const SbCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height:auto;
  justify-content: left;
  /* padding-left: 30px; */
`;
export const SliderCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-self: center;
  /* padding-left: 30px; */
  /* border:2px solid green; */
  @media ${device.mobile}{
    width: 100%;
    }
    @media ${device.tablet}{
      width: 60%;
      padding: 0 10%;
    }
    @media ${device.desktop}{
      width: 60%;
      padding: 0 10%;
    }
`;
export const TrackScoll = styled.div`
  height:100%;
  /* background-color: #fad; */
  overflow: scroll;
  width: auto;
`;
export const TracksCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  height:95vh;

  justify-content: left;
  /* border:2px solid green; */
  @media ${device.mobile}{
    width: 90%;
}
@media ${device.tablet}{
  width: 45%;
  padding: 30px 0 0 30px;
}
@media ${device.desktop}{
  width: 45%;
  padding: 30px 0 0 30px;
}
`;
export const Divider = styled.div`
    background-color: ${props => props.color};
    align-self: center;
    width:1px;
    height:90%;
`;

//please fix this styling lol
export const Model = styled.div`
  width: 300px;
  height:300px;
  padding:5px;
  position:absolute;
  top:20%;
  left:45%;
  background-color: #fff;
  color:black;
  z-index:1000;
`;
