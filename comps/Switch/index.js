import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.label`
    position: relative;
`;

const Input = styled.input`
    position: absolute;
    left: -9999px;
    top: -9999px;
    &:checked + span {
        background-color: ${props=>props.firstbgcolor};
        &:before{
            left: calc(100% - 2px);
            transform: translateX(-100%)
        }
    }
    &:focus + span {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    &:focus:checked {
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
`;

const Slider = styled.span`
    display: flex;
    cursor: pointer;
    width: 50px;
    height: 25px;
    border-radius: 100px;
    background-color: ${props => props.secondbgcolor};
    position: relative;
    transition: background-color 0.2s, box-shadow 0.2s;
    &:before {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        border-radius: 45px;
        transition: 0.2s;
        background: #fff;
        box-shadow: 0;
    }
    &:active:before {
        width: 28px;
    }
`;

const Switch = ({ 
    onChange,
    firstbgcolor = "#212121",
    secondbgcolor = "#bfbfbf",
}) => (
    <InputWrapper>
        <Input firstbgcolor={firstbgcolor}  type="checkbox" onChange={onChange} />
        <Slider secondbgcolor={secondbgcolor} />
    </InputWrapper>
);

export default Switch;