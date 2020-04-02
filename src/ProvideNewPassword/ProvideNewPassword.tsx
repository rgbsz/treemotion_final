import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory, useParams } from 'react-router-dom'

import TextField from './components/TextField'
import Button from './components/Button'
import Image from './img/sign_in.jpg'

const ProvideNewPassword: React.FC<RouteComponentProps> = ({ match }) => {
    let history = useHistory()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false)
    const { id } = useParams()
    async function saveChanges(e: any) {
      setLoading(true)
      e.preventDefault()
      if(newPassword !== confirmPassword && (newPassword !== '' || confirmPassword !== '')) setError('Password must be the same.')
      else if(newPassword === '' || confirmPassword === '') setError('None of these fields can be empty.')
      else {
        try {
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/reset-password',
                {
                    method: 'POST',
                    body: JSON.stringify({ password: newPassword, token: id }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                setError(res.error)
            } else {
                history.push('/sign-in')
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
      }
      setLoading(false)
    }
    return (
        <Container>
            <Helmet>
                <title>Treemotion - reset password</title>
            </Helmet>
            <Form onSubmit={(e: any) => saveChanges(e)}>
                <TextField
                    type="password"
                    placeholder='New password'
                    onInput={(e: string) => setNewPassword(e)}
                    processing={loading}
                />
                <TextField
                    type="password"
                    placeholder='Confirm new password'
                    onInput={(e: string) => setConfirmPassword(e)}
                    processing={loading}
                />
                <Error loading={`${loading}`}>
                    {error && error}
                </Error>
                <FormBottom>
                    <Button
                        text='Save changes'
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

export default withRouter(ProvideNewPassword)
