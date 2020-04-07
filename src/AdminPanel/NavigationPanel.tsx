import React from 'react'
import styled from 'styled-components'
import { withRouter, useHistory, Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import WorkoutsIcon from '../global/img/WorkoutsIcon'
import ChallengesIcon from '../global/img/ChallengesIcon'
import RankingsIcon from '../global/img/RankingsIcon'
import SettingsIcon from '../global/img/SettingsIcon'
import SignOutIcon from '../global/img/SignOutIcon'
import { removeRedux } from '../global/functions'

const NavigationPanel: React.FC = () => {
    const history = useHistory()
    const user = useSelector((state: any) => state.user)
    return (
        <Component>
            <Container>
                <DesktopBrand>TREEMOTION</DesktopBrand>
                <MobileBrand>TM</MobileBrand>
                <Separator/>
                <Button to='/workouts'>
                    <WorkoutsIcon/>
                    <ButtonText>Treningi</ButtonText>
                </Button>
                <Button to='/challenges'>
                    <ChallengesIcon/>
                    <ButtonText>Wyzwania</ButtonText>
                </Button>
                <Button to='/rankings'>
                    <RankingsIcon/>
                    <ButtonText>Rankingi</ButtonText>
                </Button>
                <Button to='/settings'>
                    <SettingsIcon/>
                    <ButtonText>Ustawienia</ButtonText>
                </Button>
                {
                    user.isAdmin && 
                    <Button to='/admin'>
                        <SettingsIcon/>
                        <ButtonText>Panel admina</ButtonText>
                    </Button>
                }
                <SignOut onClick={() => { localStorage.removeItem('refreshToken'); history.push('/sign-in'); removeRedux() }}>
                    <SignOutIcon/>
                    <ButtonText>Wyloguj się</ButtonText>
                </SignOut>
            </Container>
        </Component>
    )
}

const Component = styled.div`
    grid-column: 1/2;
    grid-row: 1/3;
    box-sizing: border-box;
    padding: 1.5rem 1rem;
    box-shadow: 0 0 2rem rgba(0,0,0,.15);
    z-index: 100;
    background: white;
`

const Container = styled.div({
    position: 'relative',
    height: '100%'
})

const Brand = styled.h1({
    fontWeight: 700,
    fontSize: '1.8rem',
    textAlign: 'center',
    background: '-webkit-linear-gradient(30deg, #146D52 0%, #08313E 120%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
})

const DesktopBrand = styled(Brand)`
    display: none;
    @media screen and (min-width: 1024px) {
        display: block;
    }
`

const MobileBrand = styled(Brand)`
    display: block;
    @media screen and (min-width: 1024px) {
        display: none;
    }
`

const Separator = styled.span`
    width: 2rem;
    display: block;
    margin: 1rem auto 1.8rem auto;
    height: 3px;
    border-radius: 50%;
    background: #BCBCBC;
    @media screen and (min-width: 1024px) {
        width: 5rem;
    }
`

const Button = styled(Link)<{active?: boolean}>`
    font-size: 1.2rem;
    // font-weight: bold;
    color: ${props => props.active ? '#146D52' : '#BCBCBC'};
    display: flex;
    padding: 1rem;
    text-decoration: none;
    background: ${props => props.active ? 'white' : 'transparent'};
    box-shadow: ${props => props.active ? '0 2px 1rem rgba(0,0,0,.1)' : '0 3px 1rem rgba(0,0,0,0)'};
    border-radius: 4px;
    transition: .2s;
    &:hover {
        color: #146D52;
    }
    &:hover > svg {
        fill: #146D52;
    }
    svg {
        transition: .2s;
        width: 1.5rem;
        height: 1.5rem;
        fill: ${props => props.active ? '#146D52' : '#BCBCBC'};
        margin-right: .5rem;
    }
    @media screen and (min-width: 1024px) {
        padding: 1rem 3rem 1rem 1rem;
    }
`

const ButtonText = styled.span`
    display: none;
    @media screen and (min-width: 1024px) {
        display: inline-block;
    }
`

const SignOut = styled.button`
    border: none;
    font-size: 1.2rem;
    color: #B3B3B3;
    display: block;
    padding: 1rem 3rem 1rem 1rem;
    text-decoration: none;
    background: transparent;
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .2s;
    display: flex;
    &:hover {
        color: #146D52;
        cursor: pointer;
    }
    &:hover > svg {
        fill: #146D52;
    }
    svg {
        transition: .2s;
        width: 1.5rem;
        height: 1.5rem;
        fill: #BCBCBC;
        margin-right: .5rem;
    }
`

export default withRouter(NavigationPanel)
