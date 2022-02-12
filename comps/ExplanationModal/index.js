import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    background-color: ${props=>props.bgcolor};
    width: 415px;
    height: 150px;
    border-radius: 5px;
    font-family: sans-serif;
    color: ${props=>props.textColor};
`;

const TextCont = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const Heading = styled.p`
    font-size: 18px;
`;

const Text = styled.p`
    font-size: 14px;
`;

const ExplanationModal = ({ 
    bgcolor="#424141",
    textColor="#FAFAFA"

}) => (
    <Container bgcolor={bgcolor} textColor={textColor}>
        <Heading>Welcome to BopBot! </Heading>

    <TextCont>

        <Text> 
            Step 1: Choose a genre you want to listen to right now
        </Text>

        <Text>
        Step 2: Use the slider for a specific search
        </Text>

        <Text>
        Step 3: Listen to the suggested songs and add them to your library
        </Text>
    </TextCont>
    </Container>
);

export default ExplanationModal;