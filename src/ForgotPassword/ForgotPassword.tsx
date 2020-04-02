import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory } from 'react-router-dom'

import TextField from './components/TextField'
import Button from './components/Button'
import Image from './img/sign_in.jpg'

const ForgotPassword: React.FC<RouteComponentProps> = ({ match }) => {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false)
    async function fetchForgotPassword(e: any) {
        try {
            e.preventDefault()
            setLoading(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/send-reset-email',
                {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                setError(`There's no account with provided email address.`)
                setLoading(false)
            } else {
                setError(`Please check your email for further instructions.`)
                setLoading(false)
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
    }
    return (
        <Container>
            <Helmet>
                <title>Treemotion - reset password</title>
            </Helmet>
            <Form onSubmit={(e: any) => fetchForgotPassword(e)}>
                <TextField
                    type="text"
                    placeholder='E-mail address'
                    onInput={(e: string) => setEmail(e)}
                    processing={loading}
                    defaultValue={localStorage.getItem('defaultEmail') ? `${localStorage.getItem('defaultEmail')}` : ''}
                />
                <Error loading={`${loading}`}>
                    {error && error}
                </Error>
                <FormBottom>
                    <Button
                        text='Send email'
                        loading={loading}
                    />
                    <OtherAction
                        to={`/sign-in`}
                        loading={`${loading}`}
                    >
                        Go back
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

export default withRouter(ForgotPassword)
