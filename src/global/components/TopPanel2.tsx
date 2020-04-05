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
            <Hello>Cześć <HelloBold>{name}</HelloBold></Hello>
            <StyledTextField className='StyledTextField' type='text' placeholder='Szukaj' onInput={() => console.log('Search')} processing={false}/>
            <TopRight>
                <NotificationIcon/>
                <div>
                  <LanguageIcon/>
                  <span>Polski</span>
                  <DownArrowIcon/>
                </div>
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
        &:last-child {
          width: 1.2rem;
          height: 1.2rem;
          margin-left: .4rem;
        }
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: .8rem;
        font-size: 1rem;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        &:hover::after {
          opacity: 1;
          filter: blur(0)
          visibility: visible;
          pointer-events: default;
        }
        &::after {
          opacity: 0;
          filter: blur(.3rem)
          visibility: hidden;
          transition: .2s;
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 0 1rem rgba(0,0,0,.15);
          pointer-events: none;
          position: absolute;
          top: -.9rem;
          left: -13rem;
          content: 'Pracujemy nad tym :)';
          whitespace: nowrap;
          text-align: center;
          background: white;
        }
    }
`

export default TopPanel
