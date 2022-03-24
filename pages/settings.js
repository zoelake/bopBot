import Head from 'next/head'
import Image from 'next/image'
import MyButton from '../comps/Button'
import NavBar from '../comps/Nav'
import Toggle from '../comps/Toggle'
import MyText from '../comps/Text'
import ThemeToggle from '../comps/ThemeToggle'

import { themes } from '../utils/variables'
import { useTheme, useTitle, useHeader, usePar, useExplicit, useSbSize, useName, useEmail, } from "../utils/provider"; import styled from 'styled-components';
import { device } from '../styles/mediaSizes'
import { useState } from 'react'
import { Switch, FormControlLabel, Input, Avatar } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'



// const Page = styled.div`
//   display:flex;
//   flex-direction: row;
//   margin:0;
//   justify-content: space-between;
//   border:2px solid green;
// `;

const Dashboard = styled.div`

    @media ${device.mobile}{
      background-color: ${props => props.bg};
      height:100%;
      width:100%;
      padding: 10px;

    }

    @media ${device.tablet}{
      background-color: ${props => props.bg};
      height:100%;
      width:100%;
      padding:30px 10px 10px 60px;
    }

    @media ${device.desktop}{
      background-color: ${props => props.bg};
      height:100%;
      width:100%;
      padding:30px 10px 10px 60px;
       
    }
`;

// const Cont = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const HalfCont = styled.div`
//   flex:${props => props.flex};
//   height:80vh;
//   border:3px solid red; 
//   padding:10px 10px 10px 30px;
//   display: flex;
//   flex-direction: column;
//   align-content: space-between;

// `;

// const QuartCont = styled.div`
//   flex: ${props => props.height};
//   border:2px solid blue; 
//   padding-top:${props => props.padding};
  
// `;

const PageContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0% 0% 0% 0%;
    padding: 2% 0% 0% 0%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
    
    @media ${device.mobile}{
      display: flex;
      flex-direction: column;
      width: 100%;
  
      }
  
      @media ${device.tablet}{
        justify-content: row;
        width: 60%;
        align-items: center;
        justify-content: center;
        
      }
  
      @media ${device.desktop}{
        width: 80%;
        padding: 0 10%;
  
      }
`;

const SectionTitle = styled.div`

@media ${device.mobile}{
  display: flex;
  height: 100px; 
  // flex-grow: 1;
  width: 50%;
  background-color: 
  }

  @media ${device.tablet}{
    display: flex;
    height: ${props => props.height}; 
    // flex-grow: 1;
    width: 50%;
    background-color: 
  }

  @media ${device.desktop}{
    display: flex;
    height: ${props => props.height}; 
    // flex-grow: 1;
    width: 50%;
    background-color: 
  }

`;

const SectionContent = styled.div`
@media ${device.mobile}{
  display: flex;
  flex-grow: 1;
  height: 300px; 
  width: 50%;
  flex-direction: column;  
  
  }

  @media ${device.tablet}{
    display: flex;
    flex-grow: 1;
    height: ${props => props.height}; 
    width: 50%;
    flex-direction: column;  

  }

  @media ${device.desktop}{
    display: flex;
    flex-grow: 2;
    height: ${props => props.height}; 
    width: 100%;
    flex-direction: column;  

  }
`;

// const Divider = styled.div`
//   height:80vh;
//   width:2px;
//   background-color: ${props => props.col};

// `;

const InputCont = styled.div`
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    padding:5px;
`;

const AvatarCont = styled.div`

    @media ${device.mobile}{
      display: flex;
      flex-direction: row;
      max-width: 200px;
      height: 500px;
      justify-content: space-evenly;
      width: 50vw;
      padding: 0 10%;
      
      }
  
      @media ${device.tablet}{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 500px;
        height: 300px;
        justify-content: space-evenly;
        width: 60%;
        padding: 0 10%;

        
      }
  
      @media ${device.desktop}{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 500px;
        height: 300px;
        justify-content: space-evenly;
        width: 50vw;
        padding: 0 10%;
  
      }
`;

const AvatarTest = styled.div`

@media ${device.mobile}{
  height: 50px;
  width: 50px;
  margin: 5px;
  background-color: black;
  
  }

  @media ${device.tablet}{
    height: 100px;
    width: 100px;
    margin: 10px;
    background-color: black;

    
  }

  @media ${device.desktop}{
    height: 100px;
    width: 100px;
    margin: 10px;
    background-color: black;

  }

`;

const LogoutSection = styled.div`
    @media ${device.mobile}{
      width: 60vw;

    }

    display: flex;
    flex-wrap: wrap;
    height: 300px;
    width: 40vw;
    padding: 20px;
    justify-content: flex-end;
`;

const LoginInput = styled.input`

@media ${device.mobile}{
    height:35px;
    width: 300px;
  
  }

  @media ${device.tablet}{
    
  }

  @media ${device.desktop}{

  }

    border-radius: 5px;
    background-color: ${props => props.bg};
    color:${props => props.txt};
    height:50px;
    border:1.5px solid #525252;
    margin:5px;
    padding:0 10px;
    width: 300px;

`;

const NewPw = styled.div`
      display: flex;
      flex-grow: 1;
      padding: 10px;
      flex-direction: column;
`;

const ConfirmPw = styled.div`
      display: flex;
      flex-grow: 1;
      padding: 10px;
      flex-direction: column;
`;

const PwCont = styled.div`
      display: flex;
      width: 50vw;
      flex-wrap: wrap;
      flex-direction: row; 
`;


// const ButtonCont = styled.button`
//     display: flex;
//     text-align:center;
//     background-color: red;
//     border-radius: 10px;
//     height: 30px;
//     width: 
// `;



export default function Settings(
  {height="500px"}
) {

  const router = useRouter();

  //visual states
  const { theme, setTheme } = useTheme();
  const [themeCol, setThemeCol] = useState(theme);
  const { titleSize, setTitleSize } = useTitle();
  const { headerSize, setHeaderSize } = useHeader(); 
  const { parSize, setParSize } = usePar();
  const { explicit, setExplicit } = useExplicit();
  const { sbSize, setSbSize } = useSbSize();
  //user states
  const { name, setName } = useName();
  const { email, setEmail } = useEmail();

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('name')) {
      setName(localStorage.getItem('name'))
    }
    if (localStorage.getItem('email')) {
      setEmail(localStorage.getItem('email'))
    }

  }
  const [updatedName, setUpdatedName] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState(null);

  let title = titleSize;
  let header = headerSize;
  let par = parSize;
  let sb = sbSize;

  function increaseFont() {
    if (par == 24) {
      setParSize(24);
      setSbSize(120)
    }
    else if (header == 30) {
      setHeaderSize(30);
    }
    else if (title == 42) {
      setParSize(42);
    } else {
      setTitleSize(title += 2)
      setHeaderSize(header += 2)
      setParSize(par += 2)
      setSbSize(sb += 12)
    }

  }
  function decreaseFont() {
    if (par == 12) {
      setParSize(12);
      setSbSize(50)
    }
    else if (header == 18) {
      setHeaderSize(18);
    }
    else if (title == 30) {
      setParSize(30);
    } else {
      setTitleSize(title -= 2)
      setHeaderSize(header -= 2)
      setParSize(par -= 2)
      setSbSize(sb -= 12)
    }

  }

  //user info updates
  function HandleName(value) {
    setUpdatedName(value)
    console.log(updatedName)
  }
  function HandleEmail(value) {
    setUpdatedEmail(value)
    console.log(updatedEmail)
  }


  function UpdateName() {
    const updateName = {
      name: localStorage.getItem('name'),
      newName: updatedName,
    }
    console.log('current name: ' + localStorage.getItem('name'))
    console.log('updated name: ' + updatedName)
    axios.post('http://localhost:3001/update-userName', updateName)
      .then((res) => {
        if (res) {
          console.log('returned name: ' + res.data)
          localStorage.setItem('name', res.data)
          setName(res.data)
        } else {
          console.log('something went wrong')
        }
      })
      .catch(e => {
        console.log(e)
      })

  }

  function UpdateEmail() {
    const updateEmail = {
      email: localStorage.getItem('email'),
      newEmail: updatedEmail,
    }
    console.log('current name: ' + localStorage.getItem('email'))
    console.log('updated name: ' + updatedEmail)
    axios.post('http://localhost:3001/update-userEmail', updateEmail)
      .then((res) => {
        if (res) {
          console.log('returned email: ' + res.data)
          localStorage.setItem('email', res.data)
          setEmail(res.data)
        } else {
          console.log('something went wrong')
        }
      })
      .catch(e => {
        console.log(e)
      })

  }

  function HandleLogout() {
    setEmail(null)
    setName(null)
    localStorage.clear();
    router.push('/login')
  }


  //user info updates end


  return (
    <>
      <Head>
        <title>botBot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="#" />
      </Head>
      <NavBar />

      <PageContent>
        <Dashboard
          bg={themes[theme].contrast}>
          <MyText
            weight={500}
            text={`Settings`}
            size={`${titleSize}px`} />

              <Section>

                {/* themes */}

                <SectionTitle
                height={'400px'}>
                  <MyText
                    text='Themes'
                    size={`${headerSize}px`}
                  />
                </SectionTitle>

                <SectionContent
                height={'400px'}
                >
                    <ThemeToggle
                      radioClick={() => setTheme('dark')}
                      mode='Dark Mode'
                      theme1={themes.dark.accent}
                      theme2={themes.dark.contrast}
                      inner={theme === 'dark' ? true : false}

                    />
                    <ThemeToggle
                      radioClick={() => setTheme('light')}
                      mode='Light Mode'
                      theme1={themes.light.accent}
                      theme2={themes.light.contrast}
                      inner={theme === 'light' ? true : false}
                    />
                    <ThemeToggle
                      radioClick={() => setTheme('retro')}
                      mode='Retro'
                      theme1={themes.retro.contrast}
                      theme2={themes.retro.accent}
                      inner={theme === 'retro' ? true : false}
                    />
                    <ThemeToggle
                      radioClick={() => setTheme('funky')}
                      mode='Funk'
                      theme1={themes.funky.contrast}
                      theme2={themes.funky.mid}
                      inner={theme === 'funky' ? true : false}
                    />
                  </SectionContent>
              </Section>

              <Section>

                {/* font */}

                  <SectionTitle
                  height={'300px'}
                  >
                    <MyText
                    text='Font size'
                    size={`${headerSize}px`}
                    />
                  </SectionTitle>

                  <SectionContent
                  height={'300px'}>
                    <MyText
                      size={`${parSize}px`}
                      text={'Text will now be ✨THIS✨ big'}
                    />
                    <Toggle
                      increase={increaseFont}
                      decrease={decreaseFont}
                    />
                  </SectionContent>
               </Section>   

              <Section>

                {/* font-size */}

                <SectionTitle
                height={'200px'}
                >
                  <MyText
                    text='Explicit content'
                    size={`${headerSize}px`}
                  />
                </SectionTitle>

                <SectionContent
                 height={'200px'}
                >
                  <FormControlLabel control={
                    <Switch
                      onChange={() => setExplicit(!explicit)}
                    />} label={explicit ? 'Allowed' : 'Disabled'} />
                </SectionContent>
              </Section>

              <Section>

                {/* update details */}

                <SectionTitle
                height={'200px'}
                >
                  <MyText
                  text='Update account details'
                  size={`${headerSize}px`}
                  />
                </SectionTitle>
                    
                  <SectionContent
                  height={'200px'}
                  >
                    {/* avatar */}

                    <MyText
                    size={`${parSize}px`}
                    text={`Select Your Avatar`}
                    />

                    <AvatarCont>
                      <AvatarTest/> <AvatarTest/> <AvatarTest/> <AvatarTest/>
                    </AvatarCont>

                    {/* name */}

                    <MyText
                    size={`${parSize}px`}
                    text={`Current name: ${name}`}
                    />

                    <InputCont>
                      <LoginInput 
                      placeholder='Enter new name...' 
                      onChange={(e) => HandleName(e.target.value)} 
                      bg={themes[theme].playBg}
                      />
                      <MyButton 
                      onClick={UpdateName}
                      width="200px"
                      bg={themes[theme].sliderBg}
                      text = 'Update Name'
                      >Update name</MyButton>
                    </InputCont>

                    {/* email */}

                    <InputCont>
                      <MyText
                        size={`${parSize}px`}
                        text={`Current email: ${email}`}
                      />
                      <LoginInput 
                      placeholder='Enter new email...' 
                      onChange={(e) => HandleEmail(e.target.value)} 
                      bg={themes[theme].playBg}
                      />
                      <MyButton 
                      onClick={UpdateEmail}
                      width="200px"
                      bg={themes[theme].sliderBg}
                      text = 'Update Email'
                      >Update email</MyButton>
                    </InputCont> 

                    <InputCont>

                      {/* password */}

                      <PwCont>

                      <NewPw>
                        <MyText
                          size={`${parSize}px`}
                          text={`Enter New Password`}
                        />
                        <LoginInput 
                          placeholder='Enter new password...' 
                          onChange={(e) => HandleEmail(e.target.value)} 
                          bg={themes[theme].playBg}
                        />
                      </NewPw>

                      <ConfirmPw>
                        <MyText
                          size={`${parSize}px`}
                          text={`Confirm Password`}
                        />
                        <LoginInput 
                          placeholder='Confirm old password...' 
                          onChange={(e) => HandleEmail(e.target.value)} 
                          bg={themes[theme].playBg}
                          />
                      </ConfirmPw>
                      </PwCont>

                      <MyButton 
                      onClick={UpdateEmail}
                      width="200px"
                      bg={themes[theme].sliderBg}
                      text = 'Update Password'
                      >Update email</MyButton>
                    </InputCont> 



                    <LogoutSection>
                      <MyButton
                        text='Logout'
                        width="200px"
                        bg={themes[theme].accent}
                        onClick={HandleLogout}
                      />
                    </LogoutSection>  

                  </SectionContent> 


                </Section>
          {/* <Divider
              //col={themes[theme].text}
            /> */}

    


        </Dashboard>
      </PageContent>


    </>
  )
}
