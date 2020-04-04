import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchChallenges } from './functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import Select from '../global/components/Select'
import TextField from '../global/components/TextField'
import Button from '../global/components/Button'
import BronzeIcon from '../global/img/BronzeIcon'
import SilverIcon from '../global/img/SilverIcon'
import GoldIcon from '../global/img/GoldIcon'
import { setChallenges } from '../redux/actions'

const Challenges: React.FC<RouteComponentProps> = () => {
    const dispatch = useDispatch()
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const challenges = useSelector((state: any) => state.challenges)
    const [challengeType, setChallengeType] = useState<null | number>(null)
    const [distance, setDistance] = useState<null | string>(null)
    const [challengeName, setChallengeName] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    console.log(challenges)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!challenges) fetchChallenges()
        else setRequest(true)
    }, [accessToken, challenges, user])
    async function handleAddChallenge(e: any) {
        e.preventDefault()
        try {
            e.preventDefault()
            setLoading(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/challenge/create',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        type: challengeType === 1 ? 'distance' : '',
                        name: challengeName,
                        distance: distance
                    }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                alert('Błąd')
                setLoading(false)
            }
            else {
                setLoading(false)
                setChallengeType(null)
                dispatch(setChallenges([res.challenge, ...challenges]))
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
    }
    if(request) {
        return (
            <Container>
            <Helmet>
                <title>Treemotion | Wyzwania</title>
            </Helmet>
            <TopPanel/>
            <NavigationPanel/>
            {
                user.isAdmin ?
            <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleAddChallenge(e)}>
                <Select
                    placeholder='Typ wyzwania'
                    loading={loading}
                    options={[{id: 0, name: 'Wybierz typ wyzwania'}, {id: 1, name: 'Dystansowe'}]}
                    onInput={(e: number) => setChallengeType(e)}
                />
                {
                    challengeType === 1 ?
                    <>
                        <TextField type='text' placeholder='Nazwa wyzwania' onInput={(e: string) => setChallengeName(e)} processing={loading}/>
                        <TextField type='text' placeholder='Dystans na złoto' onInput={(e: string) => setDistance(e)} processing={loading}/>
                        <Button
                            text='Dodaj wyzwanie'
                            loading={loading}
                        />
                    </>
                    :
                    ''
                }
            </Form>
            :
            ''
            }
            <Content>
                <ContentItem locked={false}>
                  <h1>Aktywne wyzwania</h1>
                  <Bar>
                    <ProgressBar locked={91}/>
                    <Part>
                      <BronzeIcon/>
                      <Score>100 km</Score>
                    </Part>
                    <Part>
                      <SilverIcon/>
                      <Score>200 km</Score>
                    </Part>
                    <Part>
                      <GoldIcon/>
                      <Score>400 km</Score>
                    </Part>
                  </Bar>
                </ContentItem>
                <ContentItem locked={false}>
                  <h1>będą na górze.</h1>
                  <Bar>
                    <ProgressBar locked={48}/>
                    <Part>
                      <BronzeIcon/>
                      <Score>100 km</Score>
                    </Part>
                    <Part>
                      <SilverIcon/>
                      <Score>200 km</Score>
                    </Part>
                    <Part>
                      <GoldIcon/>
                      <Score>400 km</Score>
                    </Part>
                  </Bar>
                </ContentItem>
                {challenges.map((challenge: any, i: number) => (
                  <ContentItem key={i} locked={true}>
                    <Locked>
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
                ))}
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

const Form = styled.form`
    margin-top: -.5rem;
    margin-bottom: 1.4rem;
    grid-row: '1/2';
    display: flex;
    justify-content: space-between;
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
