import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';

import axios from 'axios';

const InputCont = styled.div`
    width:80%;
    max-width:500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    padding:5px;
    border:2px solid green;
`;

const LoginInput = styled.input`
    border:none;
    border-radius: 10px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:2px solid black;
    margin:5px;
`;

const ButtonCont = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-around;
`;


export default function Login() {

    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    // const [user, setUser] = useState({
    //     email: '',
    //     password: '',
    // });

    function HandleEmail(value) {
        setUserEmail(value)
        console.log(userEmail)
    }

    function HandlePassword(value) {
        setUserPassword(value)
        console.log(userPassword)
    }

    function CreateAccount() {
        console.log('creating acc')
        const newUser = {
            email: userEmail,
            password: userPassword
        }
        console.log(userEmail, userPassword, newUser)
        axios.post('http://localhost:3001/signup', newUser)
    }

    function Login() {
        const getUser = {
            email: userEmail,
            password: userPassword
        }
        axios.post('http://localhost:3001/login', getUser)
    }

    return (
        <InputCont>
            <LoginInput placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} />
            <LoginInput placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} />
            <ButtonCont>
                <MyButton onClick={CreateAccount} text='Create Account' />
                <MyButton onClick={Login} text='Login' />
            </ButtonCont>
        </InputCont>
    );
}