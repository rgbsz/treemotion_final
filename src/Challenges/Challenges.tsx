import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchChallenges } from './functions'
import { setAllChallenges, setFutureChallenges, setCurrentChallenge } from '../redux/actions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import Button from '../global/components/Button'
import BronzeIcon from '../global/img/BronzeIcon'
import SilverIcon from '../global/img/SilverIcon'
import GoldIcon from '../global/img/GoldIcon'
import StateTypes from "../redux/types"
import MobileContainer from "../global/components/MobileContainer"

const Challenges: React.FC<RouteComponentProps> = () => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: StateTypes) => state.accessToken)
    const user = useSelector((state: StateTypes) => state.user)
    const [challengesHint, setChallengesHint] = useState<string | null>(localStorage.getItem('challengesHint'))
    const allChallenges = useSelector((state: StateTypes) => state.allChallenges)
    const futureChallenges = useSelector((state: StateTypes) => state.futureChallenges)
    const currentChallenge = useSelector((state: StateTypes) => state.currentChallenge)
    const dispatch = useDispatch()
    const [joinChallengeData, setJoinChallengeData] = useState<any>(null)
    const [joinChallengeModalActive, setJoinChallengeModalActive] = useState<boolean>(false)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(allChallenges === null) fetchChallenges(accessToken)
        else setRequest(true)
    }, [accessToken, allChallenges, user])

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
              if(!currentChallenge) {
                dispatch(setCurrentChallenge(res.challenge))
                const newAllChallenges = allChallenges && allChallenges.filter((challenge: any) => challenge.id !== joinChallengeData.id)
                dispatch(newAllChallenges && setAllChallenges(newAllChallenges))
              }
              else {
                dispatch(futureChallenges && setFutureChallenges([...futureChallenges, res.challenge]))
                const newAllChallenges = allChallenges && allChallenges.filter((challenge: any) => challenge.id !== joinChallengeData.id)
                dispatch(setAllChallenges(newAllChallenges))
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
    const [leaveChallengeData, setLeaveChallengeData] = useState<any>(null)
    const [leaveChallengeModalActive, setLeaveChallengeModalActive] = useState<boolean>(false)
    const [leaveChallengeRequest, setLeaveChallengeRequest] = useState<boolean>(false)
    async function handleLeaveChallenge(e: any) {
        e.preventDefault()
        setLeaveChallengeRequest(true)
        try {
            e.preventDefault()
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/join',
                {
                  method: "POST",
                   body: JSON.stringify({ "challengeId": leaveChallengeData.challenge.id }),
                   headers: {
                      "Content-type": "application/json",
                      "Authorization": `Bearer ${accessToken}`
                   }
                },
            )
            const res = await query.json()
            if (res.success) {
                if(currentChallenge && currentChallenge.challenge.id === leaveChallengeData.challenge.id) {
                    dispatch(futureChallenges && setFutureChallenges(futureChallenges.splice(1)))
                    dispatch(dispatch(futureChallenges ? setCurrentChallenge(futureChallenges.splice(0,1)[0]) : null))
                    dispatch(allChallenges && setAllChallenges([...allChallenges, currentChallenge.challenge]))
                }
                else {
                    futureChallenges && futureChallenges.map((challenge: any, i: number) => {
                        if(challenge.challenge.id === leaveChallengeData.challenge.id) {
                            dispatch(allChallenges && setAllChallenges([...allChallenges, challenge.challenge]))
                            const newFutureChallenges = futureChallenges.filter(function(obj: any) {
                                return obj.challenge.id !== leaveChallengeData.challenge.id;
                            });
                            dispatch(setFutureChallenges(newFutureChallenges))
                        }
                    })
                }
            }
            else {
              console.log('error')
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
        setLeaveChallengeModalActive(false)
        setLeaveChallengeRequest(false)
    }
    if(request) {
        return (
            <>
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
                            <StyledButton text='Wróć' loading={false} className='StyledButton' onClick={() => setJoinChallengeModalActive(false)}/>
                        </JoinChallengeButtons>
                    </JoinChallengeModal>
                    <LeaveChallengeModal active={leaveChallengeModalActive}>
                        <StyledContentItem locked={false}>
                            <h1>{leaveChallengeData && leaveChallengeData.challenge.name}</h1>
                            <Bar>
                                <ProgressBar locked={null}/>
                                <Part>
                                    <BronzeIcon/>
                                    <Score>{leaveChallengeData && leaveChallengeData.challenge.bronzeMedalDistance} km</Score>
                                </Part>
                                <Part>
                                    <SilverIcon/>
                                    <Score>{leaveChallengeData && leaveChallengeData.challenge.silverMedalDistance} km</Score>
                                </Part>
                                <Part>
                                    <GoldIcon/>
                                    <Score>{leaveChallengeData && leaveChallengeData.challenge.distance} km</Score>
                                </Part>
                            </Bar>
                        </StyledContentItem>
                        <JoinChallengeButtons>
                            <StyledButton text='Opuść wyzwanie' loading={leaveChallengeRequest} className='StyledButton' onClick={(e: FormEvent<HTMLFormElement>) => handleLeaveChallenge(e)}/>
                            <StyledButton text='Wróć' loading={false} className='StyledButton' onClick={() => setLeaveChallengeModalActive(false)}/>
                        </JoinChallengeButtons>
                    </LeaveChallengeModal>
                    <Content>
                        {
                            (!currentChallenge && challengesHint) &&
                            <Hint>
                                Nie masz jeszcze aktywnego wyzwania. Kliknij na wyzwanie, aby do niego dołączyć - kolejne wyzwania zostaną dodane do kolejki i będą po kolei aktywowane wraz z kończeniem wyzwań.
                                <span onClick={() => {setChallengesHint(null); localStorage.removeItem('challengesHint')}}>Nie pokazuj więcej</span>
                            </Hint>
                        }
                        {
                            currentChallenge &&
                            <ContentItem locked={false} onClick={() => { setLeaveChallengeModalActive(true); setLeaveChallengeData({...currentChallenge}) }}>
                                <Locked>
                                    <span>{currentChallenge && 'Kliknij, aby porzucić wyzwanie'}</span>
                                </Locked>
                                <h1>{currentChallenge.challenge.name} ({currentChallenge.userDistance} z {currentChallenge.challenge.distance} km)</h1>
                                <Bar>
                                    <ProgressBar locked={currentChallenge.progress}/>
                                    <Part>
                                        <BronzeIcon/>
                                        <Score>{Math.floor(currentChallenge.challenge.bronzeMedalDistance)} km</Score>
                                    </Part>
                                    <Part>
                                        <SilverIcon/>
                                        <Score>{Math.floor(currentChallenge.challenge.silverMedalDistance)} km</Score>
                                    </Part>
                                    <Part>
                                        <GoldIcon/>
                                        <Score>{Math.floor(currentChallenge.challenge.distance)} km</Score>
                                    </Part>
                                </Bar>
                            </ContentItem>
                        }
                        {
                            futureChallenges &&
                            futureChallenges.map((challenge: any, i: number) => (
                                <ContentItem key={i} locked={true} onClick={() => { setLeaveChallengeModalActive(true); setLeaveChallengeData({...challenge}) }}>
                                    <Locked>
                                        <span>{currentChallenge && 'Kliknij, aby porzucić wyzwanie'}</span>
                                    </Locked>
                                    <h1>{challenge.challenge.name} - w kolejce</h1>
                                    <Bar>
                                        <ProgressBar locked={null}/>
                                        <Part>
                                            <BronzeIcon/>
                                            <Score>{Math.floor(challenge.challenge.bronzeMedalDistance)} km</Score>
                                        </Part>
                                        <Part>
                                            <SilverIcon/>
                                            <Score>{Math.floor(challenge.challenge.silverMedalDistance)} km</Score>
                                        </Part>
                                        <Part>
                                            <GoldIcon/>
                                            <Score>{Math.floor(challenge.challenge.distance)} km</Score>
                                        </Part>
                                    </Bar>
                                </ContentItem>
                            ))
                        }
                        {
                            allChallenges &&
                            allChallenges.map((challenge: any, i: number) => (
                                <ContentItem key={i} locked={true} onClick={() => { setJoinChallengeModalActive(true); setJoinChallengeData({...challenge}) }}>
                                    <Locked>
                                        <span>{currentChallenge ? 'Kliknij, aby dodać do kolejki' : 'Kliknij, aby dołączyć'}</span>
                                    </Locked>
                                    <h1>{challenge.name}</h1>
                                    <Bar>
                                        <ProgressBar locked={null}/>
                                        <Part>
                                            <BronzeIcon/>
                                            <Score>{Math.floor(challenge.bronzeMedalDistance)} km</Score>
                                        </Part>
                                        <Part>
                                            <SilverIcon/>
                                            <Score>{Math.floor(challenge.silverMedalDistance)} km</Score>
                                        </Part>
                                        <Part>
                                            <GoldIcon/>
                                            <Score>{Math.floor(challenge.distance)} km</Score>
                                        </Part>
                                    </Bar>
                                </ContentItem>
                            ))
                        }
                    </Content>

                </Container>
                <MobileContainer/>
            </>
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
    @media only screen and (max-width: 768px) {
      display: none;
    }
`

const Content = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: 'min-content',
    gridColumnGap: '1.5rem',
    gridRowGap: '1.5rem',
    padding: '1.5rem',
    boxSizing: 'border-box',
    height: 'auto'
})

const Hint = styled.div`
    grid-column: 1/4;
    padding: 1.5rem;
    background: white;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    text-align: justify;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    span {
        margin-top: 1rem;
        text-decoration: underline;
        &:hover {
            cursor: pointer;
        }
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

const LeaveChallengeModal = styled(JoinChallengeModal)`

`

const StyledButton = styled(Button)`
    margin: .4rem 1rem;
    width: 100%;
    background: white;
    span {
      color: black;
    }
    div {
      border-top: 2px solid black;
    }
    &:hover {
      background: #f2f2f2;
    }
`

const JoinChallengeButtons = styled.div`
    margin: 1rem 0 0 0;
    display: flex;
`

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
    filter: ${props => props.locked ? 'grayscale(100%)' : 'grayscale(0%)'}
`

const StyledContentItem = styled(ContentItem)`
    padding: 1rem;
    background: white;
    width: 20rem;
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
