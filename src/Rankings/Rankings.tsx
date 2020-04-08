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
import BronzeIcon from '../global/img/BronzeIcon'
import SilverIcon from '../global/img/SilverIcon'
import GoldIcon from '../global/img/GoldIcon'
import StateTypes from "../redux/types"

const Rankings: React.FC<RouteComponentProps> = () => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: StateTypes) => state.accessToken)
    const user = useSelector((state: StateTypes) => state.user)
    const usersRanking = useSelector((state: StateTypes) => state.usersRanking)
    const citiesRanking = useSelector((state: StateTypes) => state.citiesRanking)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!usersRanking) fetchUsersRanking()
        else if(!citiesRanking) fetchCitiesRanking()
        else setRequest(true)
    }, [accessToken, usersRanking, citiesRanking, user])
    if(request && usersRanking && citiesRanking) {
        return (
            <Container>
            <Helmet>
                <title>Treemotion | Rankingi</title>
            </Helmet>
            <TopPanel/>
            <NavigationPanel/>
            <Content>
                <List_1>
                    <TopRanking>
                        <TopRankingItem><GoldIcon/> {usersRanking[0].firstName}</TopRankingItem>
                        <TopRankingItem><SilverIcon/> {usersRanking[1].firstName}</TopRankingItem>
                        <TopRankingItem><BronzeIcon/> {usersRanking[2].firstName}</TopRankingItem>
                    </TopRanking>
                    <ProperList>
                        {usersRanking.map((el: any, i: number) => i > 2 && <ContentItem key={el.id}><span>{i+1}.</span> {el.firstName}</ContentItem>)}
                    </ProperList>
                </List_1>
                <List_2>
                    <TopRanking>
                        <TopRankingItem><GoldIcon/> {citiesRanking[0].name}</TopRankingItem>
                        <TopRankingItem><SilverIcon/> {citiesRanking[1].name}</TopRankingItem>
                        <TopRankingItem><BronzeIcon/> {citiesRanking[2].name}</TopRankingItem>
                    </TopRanking>
                    {/*<ProperList>*/}
                    {/*    {citiesRanking.map((el: any, i: number) => i > 2 && <ContentItem key={el.id}><span>{i+1}.</span> {el.name}</ContentItem>)}*/}
                    {/*</ProperList>*/}
                </List_2>
            </Content>
        </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 18rem auto;
    grid-template-rows: 5rem auto;
    position: relative;
`

const Content = styled.div({
    width: '100%',
    height: '100%',
    padding: '1.5rem',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '1.5rem'
})

const List_1 = styled.div`
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    overflow: hidden;
    position: relative;
    height: 100%;
`

const ProperList = styled.div({
    position: 'absolute',
    bottom: '0',
    left: '0',
    borderRadius: '4px',
    background: 'white',
    overflowY: 'scroll',
    maxHeight: 'calc(100% - 12rem)',
    width: '100%'
})

const TopRanking = styled.div`
    width: '100%',
    position: fixed;
    top: 0;
    left: 0;
`

const TopRankingItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1rem .5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:first-of-type {
      background: #f2f2f2;
    }
    &:nth-of-type(2) {
      background: white;
    }
    &:last-of-type {
      background: #f2f2f2;
    }
    svg {
      width: 2rem;
      height: 2rem;
      margin-right: .5rem;
    }
`

const List_2 = styled.div`
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    overflow: hidden;
    height: 12rem;
`

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
