import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export type RadioProps = {
    onClick: Function
}

const Radio: React.FC<RadioProps> = ({ onClick }) => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <Wrapper>
          <RadioComponent active={active} onClick={() => {onClick(!active); setActive(!active)}}/>
          <Label active={active}><Clickable active={active} onClick={() => {onClick(!active); setActive(!active)}}>Akceptuję</Clickable> <RegulationsLink to='/sign-in' active={active}>regulamin</RegulationsLink></Label>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 17rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
`

const RadioComponent = styled.div<{ active: boolean }>`
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background: ${props => props.active ? '#303030' : '#f2f2f2'};
    transition: .1s;
    &:hover {
      cursor: pointer;
    }
`

const Label = styled.span<{ active: boolean }>`
    font-size: .8rem;
    margin-left: .5rem;
    transition: .1s;
    color: ${props => props.active ? '#303030' : '#cccccc'};
`

const Clickable = styled.span<{ active: boolean }>`
    font-size: .8rem;
    transition: .1s;
    &:hover {
      cursor: pointer;
    }
    color: ${props => props.active ? '#303030' : '#cccccc'};
`

const RegulationsLink = styled(Link)<{ active: boolean }>`
    text-decoration: underline;
    transition: .1s;
    color: ${props => props.active ? '#303030' : '#cccccc'};
`


export default Radio
