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
import { setChallenges } from '../redux/actions'

const Challenges: React.FC<RouteComponentProps> = ({ match }) => {
    const dispatch = useDispatch()
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const challenges = useSelector((state: any) => state.challenges)
    const [challengeType, setChallengeType] = useState<null | number>(null)
    const [distance, setDistance] = useState<null | string>(null)
    const [challengeName, setChallengeName] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
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
                <title>TreeMotion - Challenges</title>
            </Helmet>
            <TopPanel/>
            <NavigationPanel/>
            {
                user.isAdmin ? 
            <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleAddChallenge(e)}>
                <Select
                    placeholder='Challenge type'
                    loading={loading}
                    options={[{id: 0, name: 'Wybierz typ wyzwania'}, {id: 1, name: 'Distance'}]}
                    onInput={(e: number) => setChallengeType(e)}
                />
                {
                    challengeType === 1 ? 
                    <>
                        <TextField type='text' placeholder='Challenge name' onInput={(e: string) => setChallengeName(e)} processing={loading}/>
                        <TextField type='text' placeholder='Distance for gold' onInput={(e: string) => setDistance(e)} processing={loading}/>
                        <Button
                            text='Add challenge'
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
                {challenges.map((challenge: any) => <ContentItem key={challenge.id}>{challenge.name}</ContentItem>)}
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
    display: grid;
    grid-template-rows: auto 1fr;
    @media screen and (min-width: 1024px) {
        padding: 6.4rem 1.4rem 1.4rem 19.5rem;
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
    width: '100%',
    position: 'relative',
    borderRadius: '4px',
    overflowY: 'scroll',
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    background: 'white',
    gridRow: '2/3'
})

const ContentItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    background: white;
    &:nth-child(2n) {
        background: #f2f2f2;
    }
`

export default withRouter(Challenges)
