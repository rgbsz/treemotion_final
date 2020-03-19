import React from 'react'
import styled from 'styled-components'
import TextField from '../../SignIn/components/TextField'
import NotificationIcon from '../img/NotificationIcon'
import LanguageIcon from '../img/LanguageIcon'
import DownArrowIcon from '../img/DownArrowIcon'
import { useSelector } from 'react-redux'

const TopPanel: React.FC = () => {
    const name = useSelector((state: any) => state.user.name)
    return (
        <Component>
            <Hello>Hello <HelloBold>{name}</HelloBold></Hello>
            <StyledTextField className='StyledTextField' type='text' placeholder='Search' onInput={() => console.log('Search')} processing={false}/>
            <TopRight>
                <NotificationIcon/>
                <LanguageIcon/>
                <span>English</span>
                <DownArrowIcon/>
            </TopRight>
        </Component>
    )
}

const Component = styled.div({
    boxSizing: 'border-box',
    position: 'fixed',
    width: '100vw',
    top: '0',
    left: '0',
    padding: '1rem 1rem',
    boxShadow: '0 0 2rem rgba(0,0,0,.15)',
    background: 'white',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Hello = styled.span`
    font-family: 'Raleway';
    font-size: 1.8rem;
    margin-left: 6.5rem;
    display: inline-block;
    @media screen and (min-width: 1024px) {
        margin-left: 18.5rem;
    }
    @media screen and (max-width: 840px) {
        display: none;
    }
`

const HelloBold = styled.span({
    fontWeight: 900
})

const StyledTextField = styled(TextField)`
    margin: 0;
    margin-right: 1rem;
    width: 30rem;
    @media screen and (max-width: 1280px) {
        width: 20rem;
    }
    @media screen and (max-width: 840px) {
        margin-left: 6.5rem;
    }
`

const TopRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        transition: .2s;
        width: 1.5rem;
        height: 1.5rem;
        fill: black;
        margin-right: .4rem;
        &:first-child {
            margin-right: 1rem;
        }
        &:last-child {
            margin: 0 0 0 .4rem;
            width: 1rem;
            height: 1rem;
        }
    }
    span {
        font-size: 1rem;
        font-family: Raleway;
        font-weight: 500;
    }
`

export default TopPanel