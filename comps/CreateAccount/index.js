import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import { useRouter } from 'next/router';

import axios from 'axios';

const InputCont = styled.div`
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

const LoginInput = styled.input`
    border-radius: 5px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:1.5px solid #8B64FA;
    margin:5px;
    padding:0 10px;
    width:90%;
`;

const ButtonCont = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    text-align:center ;
`;


export default function CreateNewAccount() {

    const router = useRouter();
    const { theme } = useTheme();
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
        // console.log(userEmail, userPassword, newUser)
        axios.post('http://localhost:3001/signup', newUser)
        router.push('/')
    }

    // function Login() {
    //     const getUser = {
    //         email: userEmail,
    //         password: userPassword
    //     }
    //     axios.post('http://localhost:3001/login', getUser)
    // }

    return (
        <InputCont
            color={themes[theme].contrast}
        >
            <h1>Create an Account</h1>
            <p style={{ textAlign: 'center', width: '80%' }}>Create an account to get started!</p>
            <LoginInput placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} />
            <LoginInput placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} />
            <ButtonCont>
                <MyButton onClick={CreateAccount} text='Create Account' />
                <p>Already have an account?</p>
                <p style={{ textDecoration: 'underline' }} onClick={() => router.push('/login')}>Login</p>
            </ButtonCont>
        </InputCont>
    );
}