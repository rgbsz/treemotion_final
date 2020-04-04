import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchChallenges } from './functions'
import { setChallenges } from '../redux/actions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import Button from '../global/components/Button'
import BronzeIcon from '../global/img/BronzeIcon'
import SilverIcon from '../global/img/SilverIcon'
import GoldIcon from '../global/img/GoldIcon'

type JoinChallengeDataTypes = {
  id: number,
  name: string,
  bronze: number,
  silver: number,
  distance: number
}

const Challenges: React.FC<RouteComponentProps> = () => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const challenges = useSelector((state: any) => state.challenges)
    const dispatch = useDispatch()
    const [exist, setExist] = useState<boolean>(false)
    const [futureChallenges, setFutureChallenges] = useState<any>(null)
    const [joinChallengeData, setJoinChallengeData] = useState<any>(null)
    const [joinChallengeModalActive, setJoinChallengeModalActive] = useState<boolean>(false)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!challenges) fetchChallenges(accessToken)
        else setRequest(true)
    }, [accessToken, challenges, user, futureChallenges])

    const [joinChallengeRequest, setJoinChallengeRequest] = useState<boolean>(false)
    async function handleJoinChallenge(e: any) {
        e.preventDefault()
        setJoinChallengeRequest(true)
        try {
            e.preventDefault()

            const query = await fetch(
                'https://treemotion.herokuapp.com/user/join',
                {
                  method: "POST",
                   body: JSON.stringify({ "challengeId": joinChallengeData.id }),
                   headers: {
                      "Content-type": "application/json",
                      "Authorization": `Bearer ${accessToken}`
                   }
                },
            )
            const res = await query.json()
            if (res.success) {
              if(!challenges.currentChallenge) dispatch(setChallenges(challenges.allChallenges, { ...joinChallengeData }, challenges.futureChallenges))
              else {
                alert('xd')
                console.log([{...joinChallengeData}, ...challenges.futureChallenges])
                dispatch(setChallenges(challenges.allChallenges, {challenge: challenges.currentChallenge}, [{...joinChallengeData},...challenges.futureChallenges]))
              }
            }
            else {
              console.log('error')
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
        setJoinChallengeModalActive(false)
        setJoinChallengeRequest(false)
    }
    if(request) {
        return (
            <Container>
            <Helmet>
                <title>Treemotion | Wyzwania</title>
            </Helmet>
            <TopPanel/>
            <NavigationPanel/>
            <JoinChallengeModal active={joinChallengeModalActive}>
                <StyledContentItem locked={false}>
                  <h1>{joinChallengeData && joinChallengeData.name}</h1>
                  <Bar>
                    <ProgressBar locked={null}/>
                    <Part>
                      <BronzeIcon/>
                      <Score>{joinChallengeData && joinChallengeData.bronzeMedalDistance} km</Score>
                    </Part>
                    <Part>
                      <SilverIcon/>
                      <Score>{joinChallengeData && joinChallengeData.silverMedalDistance} km</Score>
                    </Part>
                    <Part>
                      <GoldIcon/>
                      <Score>{joinChallengeData && joinChallengeData.distance} km</Score>
                    </Part>
                  </Bar>
                </StyledContentItem>
                <JoinChallengeButtons>
                    <StyledButton text='Dołącz' loading={joinChallengeRequest} className='StyledButton' onClick={(e: FormEvent<HTMLFormElement>) => handleJoinChallenge(e)}/>
                    <StyledButton text='Wróć' loading={joinChallengeRequest} className='StyledButton' onClick={() => setJoinChallengeModalActive(false)}/>
                </JoinChallengeButtons>
            </JoinChallengeModal>
            <Content>
                {challenges.currentChallenge &&
                    <ContentItem locked={false}>
                      <h1>{challenges.currentChallenge.name}</h1>
                      <Bar>
                        <ProgressBar locked={48}/>
                        <Part>
                          <BronzeIcon/>
                          <Score>{challenges.currentChallenge.bronzeMedalDistance} km</Score>
                        </Part>
                        <Part>
                          <SilverIcon/>
                          <Score>{challenges.currentChallenge.silverMedalDistance} km</Score>
                        </Part>
                        <Part>
                          <GoldIcon/>
                          <Score>{challenges.currentChallenge.distance} km</Score>
                        </Part>
                      </Bar>
                    </ContentItem>
                }
                {
                    challenges.futureChallenges.map((challenge: any, i: number) => (
                      <ContentItem key={i} locked={true}>
                        <h1>{challenge.name} - w kolejce</h1>
                        <Bar>
                          <ProgressBar locked={null}/>
                          <Part>
                            <BronzeIcon/>
                            <Score>{challenge.bronzeMedalDistance} km</Score>
                          </Part>
                          <Part>
                            <SilverIcon/>
                            <Score>{challenge.silverMedalDistance} km</Score>
                          </Part>
                          <Part>
                            <GoldIcon/>
                            <Score>{challenge.distance} km</Score>
                          </Part>
                        </Bar>
                      </ContentItem>
                    ))
                }
                {
                    challenges.allChallenges.map((challenge: any, i: number) => {
                        if(!challenges.futureChallenges.some((futureChallenge: any) => futureChallenge.id === challenge.id) && challenges.currentChallenge ? challenges.currentChallenge.id !== challenge.id : '') {
                            return (
                              <ContentItem key={i} locked={true}>
                                <Locked onClick={() => { setJoinChallengeModalActive(true); setJoinChallengeData({...challenge}) }}>
                                  <span>
                                    Kliknij, aby dołączyć do wyzwania
                                  </span>
                                </Locked>
                                <h1>{challenge.name}</h1>
                                <Bar>
                                  <ProgressBar locked={null}/>
                                  <Part>
                                    <BronzeIcon/>
                                    <Score>{challenge.bronzeMedalDistance} km</Score>
                                  </Part>
                                  <Part>
                                    <SilverIcon/>
                                    <Score>{challenge.silverMedalDistance} km</Score>
                                  </Part>
                                  <Part>
                                    <GoldIcon/>
                                    <Score>{challenge.distance} km</Score>
                                  </Part>
                                </Bar>
                              </ContentItem>
                            )
                        }
                    })
                }
            </Content>
        </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    max-height: 100vh;
    padding: 6.4rem 1.4rem 1.4rem 7.5rem;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: auto 1fr;
    @media screen and (min-width: 1024px) {
        padding: 5rem 0 0 18rem;
    }
`

const JoinChallengeModal = styled.div<{ active: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.8);
    z-index: 100;
    transition: .2s;
    opacity: ${props => props.active ? '1' : '0'};
    visibility: ${props => props.active ? 'visible' : 'hidden'};
`

const StyledButton = styled(Button)`
    margin: .4rem 1rem;
    width: 100%;
`

const JoinChallengeButtons = styled.div`
    margin: 1rem 0 0 0;
    display: flex;
`

const Content = styled.div({
    maxHeight: '100%',
    position: 'relative',
    overflowY: 'scroll',
    width: '100%',
    borderRadius: '4px',
    gridRow: '2/3',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1.5rem',
    padding: '1.5rem',
    boxSizing: 'border-box'
})

const ContentItem = styled.div<{ locked: boolean }>`
    padding: 1rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    position: relative;
    h1 {
      font-size: 1rem;
      font-weight: 500;
    }
    &:last-of-type {
      margin-bottom: 1.5rem;
    }
    filter: ${props => props.locked ? 'grayscale(100%)' : 'grayscale(0%)'}
`

const StyledContentItem = styled(ContentItem)`
    padding: 1rem;
    background: white;
    width: 30rem;
    border-radius: 4px;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    position: relative;
    h1 {
      font-size: 1rem;
      font-weight: 500;
    }
    &:last-of-type {
      margin-bottom: 1.5rem;
    }
    filter: ${props => props.locked ? 'grayscale(100%)' : 'grayscale(0%)'}
`

const Locked = styled.div`
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(255,255,255,1);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
    span {
      color: black;
      font-size: 1.5rem;
      text-align: center;
    }
    z-index: 10000;
`

const Bar = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 2rem;
    margin-right: 1.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-radius: 4px;
    position: relative;
    background: #d9d9d9;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
`

const ProgressBar = styled.div<{ locked: null | number }>`
    width: ${props => !props.locked ? '0%' : `${props.locked}%`};
    height: 100%;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    background: red;
    border-radius: 4px;
    background: -webkit-linear-gradient(30deg, #146D52 0%, #08313E 120%);
`

const Part = styled.div`
    position: relative;
    z-index: 2;
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
    svg {
      width: 3rem;
      height: 3rem;
      position: absolute;
      top: -.5rem;
      right: -1.5rem;
      z-index: 99;
    }
    span {

    }
`

const Score = styled.div`
    position: absolute;
    font-size: .8rem;
    color: black;
    width: 5rem;
    top: 2.8rem;
    right: -2.5rem;
    text-align: center;
`

export default withRouter(Challenges)
