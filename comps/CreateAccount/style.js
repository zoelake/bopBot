import styled from 'styled-components';

export const InputCont = styled.div`
width:80%;
max-width:500px;
display: flex;
flex-direction: column;
justify-content: center;
align-content: space-around;
align-items: center;
padding:10px;
border-radius: 5px;
background-color: #fff;
`;

export const LoginInput = styled.input`
border-radius: 5px;
background-color: ${props => props.bg};
color:${props => props.txt};
height:50px;
border:1.5px solid ${props => props.border};
margin:5px;
padding:0 10px;
width:90%;
`;

export const ButtonCont = styled.div`
display: flex;
flex-direction:column;
justify-content: space-around;
text-align:center ;
`;