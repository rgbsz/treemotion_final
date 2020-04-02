import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory } from 'react-router-dom'

import TextField from './components/TextField'
import Select from './components/Select'
import Button from './components/Button'
import Image from './img/sign_in.jpg'

const SignUp: React.FC<RouteComponentProps> = ({ match }) => {
    let history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [city, setCity] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    async function SignUp(e: any) {
        try {
            e.preventDefault()
            setLoading(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/signup',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName: firstName,
                        email: email,
                        city: city,
                        password: password,
                        repeatPassword: repeatPassword,
                    }),
                    headers: { 'Content-type': 'application/json' },
                },
            )
            const res = await query.json()
            if (!res.success) {
                alert('błąd')
                setLoading(false)
            } else {
                localStorage.setItem('defaultEmail', email)
                history.push(`/sign-in`)
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
            <Form onSubmit={(e: any) => SignUp(e)}>
                <TextField
                    type="text"
                    placeholder='First name'
                    onInput={(e: string) => setFirstName(e)}
                    processing={loading}
                />
                <TextField
                    type="text"
                    placeholder='E-mail address'
                    onInput={(e: string) => setEmail(e)}
                    processing={loading}
                />
                <TextField
                    type="password"
                    placeholder='Password'
                    onInput={(e: string) => setPassword(e)}
                    processing={loading}
                />
                <TextField
                    type="password"
                    placeholder='Confirm password'
                    onInput={(e: string) => setRepeatPassword(e)}
                    processing={loading}
                />
                <Select
                    placeholder="City"
                    loading={loading}
                    options={[{id: 0, name: 'Wybierz miasto'}, {id: 1, name: 'Rybnik'}, {id: 2, name: 'Gliwice'}, {id: 3, name: 'Zabrze'}]}
                    onInput={(e: number) => setCity(e)}
                />
                <Errors loading={`${loading}`}>

                </Errors>
                <FormBottom>
                    <Button
                        text='Register'
                        loading={loading}
                    />
                    <OtherAction
                        to={`/sign-in`}
                        loading={`${loading}`}
                    >
                        I already have an account
                    </OtherAction>
                </FormBottom>
            </Form>
            <Picture>
              <h1>Treemotion</h1>
              <span>Wybiegaj swoją przyszłość.</span>
            </Picture>
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

const Errors = styled.span<{ loading: string }>`
    color: ${props => (props.loading === 'true' ? '#cccccc' : 'red')};
    font-family: 'Ubuntu';
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1 {
      color: #f2f2f2;
      text-shadow: 0 0 1rem rgba(0,0,0,.6);
      font-size: 6rem;
    }
    span {
      color: #f2f2f2;
      text-shadow: 0 0 1rem rgba(0,0,0,.6);
      font-size: 2rem;
    }
`

export default withRouter(SignUp)
