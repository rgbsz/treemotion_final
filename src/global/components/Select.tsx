import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
    placeholder: string,
    loading: boolean,
    options: Option[],
    onInput: any,
    className?: string
}

type Option = {
    id: number,
    name: string
}

const Select: React.FC<Props> = props => {
    const [city, setCity] = useState(props.options[0])
    const [focus, setFocus] = useState(false)
    return (
        <Component className={props.className} focus={`${focus}`} loading={`${props.loading}`} onClick={() => setFocus(!focus)} selected={city.id === 0 ? false : true}>
            <label>{props.placeholder}</label>
            <span>{city.name}</span>
            <input type='text' disabled></input>
            <List focus={`${focus}`}>
                {props.options.map(item => item.id !== 0 ? <ListItem key={item.id} focus={`${focus}`} onClick={() => {setCity(item); props.onInput(item.id)}}>{item.name}</ListItem> : '')}
            </List>
        </Component>
    )
}

const List = styled.div<{focus: string}>`
    transform: ${props => props.focus === 'true' ? 'translateY(-.5rem)' : 'translateY(0)'};
    background: white;
    position: absolute;
    top: calc(100% + 1rem);
    width: 100%;
    box-sizing: border-box;
    z-index: 99;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    transition: .2s;
    opacity: ${props => props.focus === 'true' ? '1' : '0'};
    pointer-events: ${props => props.focus === 'true' ? 'all' : 'none'};
    filter: blur(${props => props.focus === 'true' ? '0' : '.1rem'});
    border-radius: 5px;
`

const ListItem = styled.div<{focus: string}>`
    width: 100%;
    padding: .3rem .6rem;
    font-family: 'Ubuntu';
    box-sizing: border-box;
    transition: .2s;
    filter: blur(${props => props.focus === 'true' ? '0' : '.1rem'});
    transform: translateX(${props => props.focus === 'true' ? '0' : '-1rem'});
    opacity: ${props => props.focus === 'true' ? '1' : '0'};
    &:hover {
        cursor: pointer;
        background: #f2f2f2;
    }
    &:nth-child(1) {
        transition-delay: 0;
    }
    &:nth-child(2) {
        transition-delay: .1s;
    }
    &:nth-child(3) {
        transition-delay: .2s;
    }
`

const Component = styled.div<{loading: string, selected: boolean, focus: string}>`
    width: 17rem;
    margin-top: 1rem;
    position: relative;
    label {
        position: absolute;
        top: ${props => props.selected === true || props.focus === 'true' ? '.4rem' : '1rem'};
        left: .4rem;
        font-size: ${props => props.selected === true || props.focus === 'true' ? '.7rem' : '1rem'};
        font-family: 'Ubuntu';
        color: ${props => props.selected === true || props.focus === 'true' ? props.loading === 'true' ? '#cccccc' : 'black' : '#cccccc'};
        transition: .2s;
        pointer-events: none;
    }
    span {
        position: absolute;
        top: 1.5rem;
        left: .4rem;
        font-size: 1rem;
        font-family: 'Ubuntu';
        color: ${props => props.selected === true ? props.loading === 'true' ? '#cccccc' : 'black' : '#cccccc'};
        pointer-events: none;
        opacity: ${props => props.selected === true ? '1' : '0'};
        transition-delay: .1s;
        transition: .2s;
    }
    input {
        width: 100%;
        padding-bottom: .4rem;
        padding-top: 1.5rem;
        font-size: 1rem;
        border: none;
        box-sizing: border-box;
        font-family: 'Ubuntu';
        transition: .2s;
        background: ${props => props.focus === 'true' ? 'white' : '#f2f2f2'};
        pointer-events: none;
        border-radius: 5px;
        box-shadow: ${props => props.focus === 'true' ? '0 .3rem 1rem rgba(0,0,0,.15)' : '0 .3rem 1rem rgba(0,0,0,0)'};
    }
    &:hover {
        cursor: pointer;
    }
`

export default Select