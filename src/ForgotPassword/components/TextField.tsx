import React from 'react'
import styled from 'styled-components'

type TextFieldProps = {
    type: string
    placeholder: string
    onInput: Function
    processing: boolean
    defaultValue?: string
    className?: string
}

const TextField: React.FC<TextFieldProps> = props => {
    return (
        <Component className={props.className} processing={`${props.processing}`}>
            <input
                defaultValue={props.defaultValue}
                type={props.type}
                placeholder=" "
                onInput={e => props.onInput((e.target as HTMLInputElement).value)}
                disabled={props.processing}
            />
            <label>{props.placeholder}</label>
        </Component>
    )
}

const Component = styled.div<{ processing: string }>`
    width: 17rem;
    margin-top: 1rem;
    position: relative;
    input {
        background: #f2f2f2;
        width: 100%;
        padding: 1.5rem .4rem .4rem .4rem;
        font-size: 1rem;
        border: none;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        transition: .2s;
        color: ${props => (props.processing === 'true' ? '#cccccc' : 'black')};
        border-radius: 5px;
        &:focus {
            outline: none;
            box-shadow: 0 .3rem 1rem rgba(0,0,0,.15);
            transform: translateY(-.5rem);
            border-radius: 5px;
            background: none;
        }
        &:not(:placeholder-shown):not(:focus) {
            outline: none;
        }
        &:focus + label {
            color: ${props => (props.processing === 'true' ? '#cccccc' : 'black')};
            top: -.1rem;
            font-size: .7rem;
        }
        &:not(:placeholder-shown) + label {
            color: ${props => (props.processing === 'true' ? '#cccccc' : 'black')};
            top: .4rem;
            font-size: .7rem;
        }
        &:not(:placeholder-shown):focus + label {
            color: ${props => (props.processing === 'true' ? '#cccccc' : 'black')};
            top: -.1rem;
            font-size: .7rem;
        }
    }
    label {
        position: absolute;
        top: 1rem;
        left: .4rem;
        font-family: 'Inter', sans-serif;
        color: #cccccc;
        transition: .2s;
        pointer-events: none;
    }
`

export default TextField
