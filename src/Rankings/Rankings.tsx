import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchUsersRanking, fetchCitiesRanking } from './functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'

const Rankings: React.FC<RouteComponentProps> = ({ match }) => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const usersRanking = useSelector((state: any) => state.usersRanking)
    const citiesRanking = useSelector((state: any) => state.citiesRanking)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!usersRanking) fetchUsersRanking()
        else if(!citiesRanking) fetchCitiesRanking()
        else setRequest(true)
    }, [accessToken, usersRanking, citiesRanking, user])
    if(request) {
        return (
            <Container>
            <Helmet>
                <title>Treemotion | Rankings</title>
            </Helmet>
            <TopPanel/>
            <NavigationPanel/>
            <Content>
                {usersRanking.map((user: any, i: number) => <ContentItem key={user.id}>{i+1}. {user.firstName}</ContentItem>)}
            </Content>
            <Content>
                {citiesRanking.map((city: any, i: number) => <ContentItem key={city.id}>{i+1}. {city.name}</ContentItem>)}
            </Content>
        </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 6.4rem 1.4rem 1.4rem 7.5rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (min-width: 1024px) {
        padding: 6.4rem 1.4rem 1.4rem 19.5rem;
    }
`

const Content = styled.div({
    width: 'calc(50% - .8rem)',
    position: 'relative',
    borderRadius: '4px',
    overflowY: 'scroll',
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    background: 'white',
})

const ContentItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    background: white;
    transition: .3s;
    &:hover {
        color: #146D52;
        cursor: pointer;
    }
    &:nth-child(2n) {
        background: #f2f2f2;
    }
`

export default withRouter(Rankings)
