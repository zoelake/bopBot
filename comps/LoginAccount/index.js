import styled from 'styled-components';
import { themes } from "../../utils/variables";
import { useTheme } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import { useRouter } from 'next/router'
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
    text-align:center;
`;


export default function LoginAccount() {
    const router = useRouter();
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
            .then(token => {
                if (token) {
                    console.log(token)
                    localStorage.setItem('token', token)
                    router.push('/')
                } else {
                    console.log('no tokes :(')
                }
            })
            .catch(e => {
                console.log(e)
            })
        // console.log(getUser)

        // if (res !== false) {
        //     router.push('/')
        // } else {
        //     console.log('res came back false')
        // }
    }

    return (
        <InputCont>
            <h1>Login to your account</h1>
            <p>Welcome back!</p>
            <LoginInput name='email' placeholder='Email...' onChange={(e) => HandleEmail(e.target.value)} />
            <LoginInput name='password' placeholder='Password...' onChange={(e) => HandlePassword(e.target.value)} />
            <ButtonCont>
                <MyButton onClick={Login} text='Login' />
                <p>Don't have an account?</p>
                <p style={{ textDecoration: 'underline' }} onClick={() => router.push('/create-account')}>Create Account</p>
            </ButtonCont>
        </InputCont>
    );
}