import { themes } from "../../utils/variables";
import { useAvatar, useEmail, useId, useName, useTheme, useToken, useHeader, usePar, useTitle } from "../../utils/provider";
import { useState } from 'react';
import MyButton from '../Button';
import { useRouter } from 'next/router'
import axios from 'axios';
import MyText from '../Text';
import { InputCont, ButtonCont, LoginInput } from '../CreateAccount/style'


export default function LoginAccount({
    switchView = () => { },
}) {

    const router = useRouter();
    const host = process.env.NEXT_PUBLIC_URL;

    const { theme } = useTheme();
    const { titleSize } = useTitle();
    const { headerSize } = useHeader();
    const { parSize } = usePar();

    //local storage info
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);

    //provider info
    const { name, setName } = useName();
    const { email, setEmail } = useEmail();
    const { id, setId } = useId();
    const { avatar, setAvatar } = useAvatar();
    const { token, setToken } = useToken();

    //ui states 
    const [border, setBorder] = useState(true);
    const [inputError, setInputError] = useState(false);

    function Login() {
        const getUser = {
            email: userEmail,
            password: userPassword
        }
        axios.post(`${host}/login`, getUser)
            .then(res => {
                if (res) {
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('id', res.data._id)

                    setName(res.data.name)
                    setId(res.data._id)
                    setEmail(res.data.email)

                    router.push('/')
                }
            })
            .catch(e => {
                alert(e)
                setBorder(false)
                setInputError(true)
            })
    }



    return (
        <InputCont>
            <img src='/bopbot_neutral.svg' style={{ width: '100px' }} />
            <MyText
                lineHeight='0'
                text='Login to your account'
                size={`${titleSize}px`}
                color={themes[theme].contrast}
            />
            <MyText
                lineHeight='0'
                text='Welcome back!'
                size={`${headerSize}px`}
                color={themes[theme].contrast}
            />
            {inputError && <MyText
                lineHeight='0'
                text='Credentials incorrect or not found. Please, try again.'
                size={`${parSize}px`}
                color={themes[theme].contrast}
            />}
            <LoginInput border={border ? '#8B64FA' : 'red'} name='email' placeholder='Email...' onChange={(e) => setUserEmail(e.target.value)} onSelect={() => setBorder(true)} />
            <LoginInput type='password' border={border ? '#8B64FA' : 'red'} name='password' placeholder='Password...' onChange={(e) => setUserPassword(e.target.value)} onSelect={() => setBorder(true)} />
            <ButtonCont>
                <MyButton onClick={Login} text='Login' />
                <MyText
                    lineHeight='0'
                    text="Don't have an account?"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                />
                <MyText
                    lineHeight='0'
                    text="Create Account"
                    size={`${parSize}px`}
                    color={themes[theme].contrast}
                    style={{ textDecoration: 'underline' }}
                    onClick={switchView}
                />
            </ButtonCont>
        </InputCont>
    );
}