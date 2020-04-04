import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccessToken, fetchUser, removeRedux } from '../global/functions'
import { fetchChallenges } from '../Challenges/functions'
import LoadingScreen from '../global/components/LoadingScreen'
import NavigationPanel from './NavigationPanel'
import TopPanel from './TopPanel'
import Button from '../global/components/Button'
import BronzeIcon from '../global/img/BronzeIcon'
import SilverIcon from '../global/img/SilverIcon'
import GoldIcon from '../global/img/GoldIcon'
import { setChallenges } from '../redux/actions'

const AdminPanel: React.FC<RouteComponentProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const challenges = useSelector((state: any) => state.challenges)
    const [request, setRequest] = useState<boolean>(false)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!user.isAdmin) {
          localStorage.removeItem('refreshToken');
          history.push('/sign-in');
          removeRedux()
        }
        else if(!challenges) fetchChallenges(accessToken)
        else setRequest(true)
    }, [accessToken, user, challenges])

    const [addChallengeModal, setAddChallengeModal] = useState<boolean>(false)
    const [addChallengeName, setAddChallengeName] = useState<null | string>(null)
    const [addChallengeScore, setAddChallengeScore] = useState<null | number>(null)
    const [addChallengeRequest, setAddChallengeRequest] = useState<boolean>(false)
    async function handleAddChallenge(e: any) {
        e.preventDefault()
        setAddChallengeRequest(true)
        try {
            e.preventDefault()

            const query = await fetch(
                'https://treemotion.herokuapp.com/challenge/create',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 1,
                        name: addChallengeName,
                        distance: addChallengeScore
                    }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                alert('Błąd')
            }
            else {
                dispatch(setChallenges([res.challenge, ...challenges.allChallenges], challenges.currentChallenge, challenges.futureChallenges))
                setAddChallengeModal(false)
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
        setAddChallengeRequest(false)
    }
    if(request) {
        return (
            <Container>
                <Helmet>
                    <title>Treemotion | Panel admina</title>
                </Helmet>
                <NavigationPanel/>
                <TopPanel/>
                <AddChallengeModal active={addChallengeModal}>
                    <AddChallengeItem locked={false}>
                      <input type='text' placeholder='Wprowadź nazwę wyzwania' onInput={e => setAddChallengeName((e.target as HTMLInputElement).value)}/>
                      <Bar>
                        <ProgressBar locked={null}/>
                        <Part>
                          <BronzeIcon/>
                          <Score>{addChallengeScore ? typeof(addChallengeScore) === 'number' ? Math.floor(.3 * addChallengeScore) : '' : ''}</Score>
                        </Part>
                        <Part>
                          <SilverIcon/>
                          <Score>{addChallengeScore ? typeof(addChallengeScore) === 'number' ? Math.floor(.6 * addChallengeScore) : '' : ''}</Score>
                        </Part>
                        <Part>
                          <GoldIcon/>
                          <input type='text' placeholder='Dystans' onInput={e => setAddChallengeScore(parseInt((e.target as HTMLInputElement).value))}/>
                        </Part>
                      </Bar>
                    </AddChallengeItem>
                    <AddChallengeButtons>
                        <StyledButton text='Dodaj wyzwanie' loading={addChallengeRequest} className='StyledButton' onClick={(e: FormEvent<HTMLFormElement>) => handleAddChallenge(e)}/>
                        <StyledButton text='Wróć' loading={false} className='StyledButton' onClick={() => setAddChallengeModal(!addChallengeModal)}/>
                    </AddChallengeButtons>
                </AddChallengeModal>
                <Content>
                    <Challenges>
                        <Button text='Dodaj wyzwanie' loading={false} onClick={() => setAddChallengeModal(!addChallengeModal)}/>
                        <List>
                            {challenges.allChallenges.map((challenge: any, i: number) => <Challenge key={i}>{challenge.name}</Challenge>)}
                        </List>
                    </Challenges>
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
`

const Content = styled.div({
    boxSizing: 'border-box',
    gridColumn: '2/3',
    gridRow: '2/3',
    width: '100%',
    height: '100%',
    padding: '1.5rem',
    display: 'grid',
    gridGap: '1.5rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    position: 'relative'
})

const StyledButton = styled(Button)`
    margin: 0;
    width: 100%;
`

const AddChallengeModal = styled.div<{ active: boolean }>`
    background: rgba(0,0,0,.8);
    z-index: 199;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    opacity: ${props => props.active ? '1' : '0'};
    visibility: ${props => props.active ? 'visible' : 'hidden'};
    transition: .2s;
    button {
      width: auto;
      margin: 1rem .5rem;
    }
`

const AddChallengeButtons = styled.div`
    display: flex;
`

const Challenges = styled.div({
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
})

const List = styled.div`
    grid-row: 2/3;
    margin: 1.5rem 0 0 0;
    box-shadow: 0 0 2rem rgba(0,0,0,.15);
    border-radius: 4px;
    overflow-y: scroll;
    height: 20rem;
`

const Challenge = styled.div`
    padding: 1rem;
    &:nth-child(2n) {
      background: #f2f2f2;
    }
`

const AddChallengeItem = styled.div<{ locked: boolean }>`
    padding: 1rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    position: relative;
    width: 20rem;
    input {
      font-size: 1rem;
      font-weight: 500;
      border: none;
      margin: 0;
      &:focus {
        outline: none;
      }
    }
    &:last-of-type {
      margin-bottom: 1.5rem;
    }
    filter: ${props => props.locked ? 'grayscale(100%)' : 'grayscale(0%)'}
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
    input {
      position: absolute;
      font-size: .8rem;
      color: black;
      width: 5rem;
      top: 2.8rem;
      right: -2.5rem;
      text-align: center;
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

export default withRouter(AdminPanel)
