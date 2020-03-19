import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory } from 'react-router-dom'

import TextField from './components/TextField'
import Button from './components/Button'
import Image from './img/sign_in.jpg'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../redux/actions'

const SignIn: React.FC<RouteComponentProps> = ({ match }) => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState(localStorage.getItem('defaultEmail') ? localStorage.getItem('defaultEmail') : '')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    async function SignIn(e: any) {
        try {
            e.preventDefault()
            setLoading(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/signin',
                {
                    method: 'POST',
                    body: JSON.stringify({ email: email, password: password }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                setError(true)
                setLoading(false)
            } else {
                if(localStorage.getItem('defaultEmail')) localStorage.removeItem('defaultEmail')
                dispatch(setAccessToken(res.accessToken))
                localStorage.setItem('refreshToken', res.refreshToken)
                history.push(`/sign-up`)
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
    }
    return (
        <Container>
            <Helmet>
                <title>TreeMotion - Login</title>
            </Helmet>
            <Form onSubmit={(e: any) => SignIn(e)}>
                <TextField
                    type="text"
                    placeholder='E-mail address'
                    onInput={(e: string) => setEmail(e)}
                    processing={loading}
                    defaultValue={localStorage.getItem('defaultEmail') ? `${localStorage.getItem('defaultEmail')}` : ''}
                />
                <TextField
                    type="password"
                    placeholder='Password'
                    onInput={(e: string) => setPassword(e)}
                    processing={loading}
                />
                <Error loading={`${loading}`}>
                    {error && 'Wrong email or password.'}
                </Error>
                <FormBottom>
                    <Button
                        text='Login'
                        loading={loading}
                    />
                    <OtherAction
                        to={`/sign-up`}
                        loading={`${loading}`}
                    >
                        I don't have account
                    </OtherAction>
                </FormBottom>
            </Form>
            <Picture></Picture>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
    background: white;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
    z-index: 2;
`

const Error = styled.span<{ loading: string }>`
    color: ${props => (props.loading === 'true' ? '#cccccc' : 'red')};
    font-family: 'Inter';
    margin-top: 1rem;
    font-size: 0.8rem;
    width: 17rem;
`

const FormBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 17rem;
`

const OtherAction = styled(Link)<{ loading: string }>`
    margin: 0.7rem 0 0 0.6rem;
    color: ${props => (props.loading === 'true' ? '#cccccc' : 'black')};
    pointer-events: ${props => (props.loading === 'true' ? 'none' : 'all')};
    font-family: 'Inter';
    font-size: 0.8rem;
    transition: 0.2s;
`

const Picture = styled.div`
    width: 100%;
    height: 100%;
    background: url(${Image}) center;
    background-size: cover;
    z-index: 1;
`

export default withRouter(SignIn)
