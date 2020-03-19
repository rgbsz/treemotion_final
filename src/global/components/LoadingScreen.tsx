import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingScreen: React.FC = () => {
    return (
        <Component><Loader/></Component>
    )
}

const Component = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
`

const Spin = keyframes`
    0% { transform: rotate(0deg) };
    100% { transform: rotate(360deg) };
`

const Loader = styled.div`
    border: .3rem solid white;
    border-top: .3rem solid #303030;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    animation: ${Spin} 1s linear infinite;
`

export default LoadingScreen