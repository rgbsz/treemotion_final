import React from 'react'
import styled, { keyframes } from 'styled-components'

export type ButtonProps = {
    text: string,
    loading: boolean,
    className?: string
}

const Button: React.FC<ButtonProps> = ({ text, loading, className }) => {
    return (
        <Component className={className} loading={`${loading}`} disabled={loading}>
            <Text loading={`${loading}`}>{text}</Text>
            <Loader loading={`${loading}`}>
                <div></div>
            </Loader>
        </Component>
    )
}

const Component = styled.button<{loading: string}>`
    height: 3rem;
    padding: 0 2rem;
    border: none;
    background: ${props => props.loading === 'true' ? '#f2f2f2' : 'black'};
    margin-top: 1rem;
    transition: .2s;
    position: relative;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
    &:hover {
        background: ${props => props.loading === 'true' ? '#f2f2f2' : '#404040'};
        cursor: ${props => props.loading === 'true' ? 'disabled' : 'pointer'};
    }
`

const Text = styled.span<{loading: string}>`
    font-family: 'Inter';
    color: white;
    opacity: ${props => props.loading === 'true' ? 0 : 1};
    transition: .2s;
`

const LoaderAnimation = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg);
    }
`

const Loader = styled.div<{loading: string}>`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${props => props.loading === 'true' ? 1 : 0};
    transition: .2s;
    div {
        border: 2px solid rgba(0,0,0,0);
        border-radius: 50%;
        border-top: 2px solid white;
        width: 11px;
        height: 11px;
        -webkit-animation: spin 1s linear infinite; /* Safari */
        animation: ${LoaderAnimation} 1s linear infinite;
    }
`

export default Button