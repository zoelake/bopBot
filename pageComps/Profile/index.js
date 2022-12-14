import styled from 'styled-components';
import { device } from '../../styles/mediaSizes'


export const Page = styled.div`
display: flex;
height: 100vh;
width: 100vw;

@media ${device.mobile}{
  flex-direction: column;
  align-items:center ;

}

@media ${device.tablet}{
  display: flex;
  flex-direction: row;
  align-items:center ;

}

@media ${device.desktop}{
    display:flex;
    flex-direction: row;
    justify-content: center;

}

`;

export const Dashboard = styled.div`  
   background-color: ${props => props.bg};


@media ${device.mobile}{

    width: 100vw;
    height: 50vh;
    padding-left: 3rem;
    padding-top: 1rem;
    /* justify-content:center ; */
    
    /* flex-grow: 1; */
}

@media ${device.tablet}{
    width: 50vw;
    height:100vh;
    padding-left: 10px;
 
}

@media ${device.desktop}{
    display: flex;
    flex-direction: column ;
    width:48vw;
    height: 90vh;
    padding:30px 10px 10px 60px;
    justify-content: flex-start;

    //min
}
`;

export const leftTop = styled.div`


@media ${device.mobile}{
    width: 100vw;
    height: 50vh;
}

@media ${device.tablet}{

}

@media ${device.desktop}{
   
}

`;


export const SbCont = styled.div`
    display: flex;
    flex-wrap: wrap;   
   overflow-y: scroll ;
   justify-content: flex-start;

   &::-webkit-scrollbar {
    width: 1px;
    border: 1px solid white;
    margin-top: 20px;
}

 @media ${device.mobile}{

    height: 30vh;
    width: 90vw;

}

@media ${device.tablet}{

    flex-wrap: wrap;
    height: 50vh;
    width: 50vw;

}

@media ${device.desktop}{

    height: 80vh;
    width: 45vw;
        }
`;

export const SpaceCont = styled.div`
    display: flex;
    align-items:center ;
    justify-content:space-between ;
    width: 100%;
`;

export const TracksCont = styled.div`
z-index: 1;
position: relative;
padding:10px 20px;
width:100% ;
display:flex ;
flex-direction: column ;


@media ${device.mobile}{
    align-items: center ;
    height: 50vh;
}

@media ${device.tablet}{

    height: 100vh;
    margin-right:5%;

}

@media ${device.desktop}{
    justify-content:center ;
    align-self: center;
    
   
}
`;

export const RegCont = styled.div`
z-index:1;

@media ${device.mobile}{
    width: 100vw;

}

@media ${device.tablet}{
}

@media ${device.desktop}{
   
}

`;

export const Divider = styled.div`
background-color: ${props => props.color};

height:1px;

@media ${device.mobile}{
    width: 80%;
    justify-content: center;
    height:1px;

}

@media ${device.tablet}{
}

@media ${device.desktop}{
    width: 100%;
   
}
`;