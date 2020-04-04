import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchAccessToken, fetchUser, removeRedux } from '../global/functions'
import { fetchChallenges } from '../Challenges/functions'
import LoadingScreen from '../global/components/LoadingScreen'
import NavigationPanel from './NavigationPanel'
import TopPanel from './TopPanel'
import Button from '../global/components/Button'

const AdminPanel: React.FC<RouteComponentProps> = () => {
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
        else if(!challenges) fetchChallenges()
        else setRequest(true)
    }, [accessToken, user, challenges])
    if(request) {
        return (
            <Container>
                <Helmet>
                    <title>Treemotion | Panel admina</title>
                </Helmet>
                <NavigationPanel/>
                <TopPanel/>
                <Content>
                    <Challenges>
                        <StyledButton text='Dodaj wyzwanie' loading={false} className='StyledButton'/>
                        <List>
                            {challenges.map((challenge: any, i: number) => <Challenge key={i}>{challenge.name}</Challenge>)}
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

const Challenges = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
    height: '50%',
    boxSizing: 'border-box'
})

const List = styled.div`
    margin: 1.5rem 0 0 0;
    box-shadow: 0 0 2rem rgba(0,0,0,.15);
    border-radius: 4px;
    overflow-y: scroll;
`

const Challenge = styled.div`
    padding: 1rem 0;
`

export default withRouter(AdminPanel)
