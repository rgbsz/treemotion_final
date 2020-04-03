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
    const texts = ['Wybiegaj swoją przyszłość', 'Wybiegaj swoją przyszłość', 'Lass deine Zukunft aus', 'あなたの未来を使い果たす', 'Agota tu futuro', 'Run out your future', 'Wybiegaj swoją przyszłość.', 'Wybiegaj swoją przyszłość']
    const [slide, setSlide] = useState(1)
    setTimeout(() => {
      if(slide !== 6) {
        setSlide(slide + 1)
      }
    }, 2500)
    const [email, setEmail] = useState(localStorage.getItem('defaultEmail') ? localStorage.getItem('defaultEmail') : '')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<boolean | string>(false)
    async function SignIn(e: any) {
        if(localStorage.getItem('defaultEmail')) localStorage.removeItem('defaultEmail')
        if(localStorage.getItem('verified')) localStorage.removeItem('verified')
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
                console.log(res)
                setError(res.error)
                setLoading(false)
            } else {
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
                    placeholder='Adres e-mail'
                    onInput={(e: string) => setEmail(e)}
                    processing={loading}
                    defaultValue={localStorage.getItem('defaultEmail') ? `${localStorage.getItem('defaultEmail')}` : ''}
                />
                <TextField
                    type="password"
                    placeholder='Hasło'
                    onInput={(e: string) => setPassword(e)}
                    processing={loading}
                />
                <Note loading={`${loading}`}>
                    {error && error}
                    {localStorage.getItem('defaultEmail') ? <p>{`Prosimy o aktywację konta poprzez link wysłany na ${localStorage.getItem('defaultEmail')}`}</p> : localStorage.getItem('verified') ? <p>Twoje konto zostało aktywowane.</p> : ''}
                </Note>
                <FormBottom>
                    <Button
                        text='Zaloguj'
                        loading={loading}
                    />
                    <ActionsContainer>
                      <OtherAction
                          to={`/forgotten-password`}
                          loading={`${loading}`}
                      >
                          Zapomniałem hasła
                      </OtherAction>
                      <OtherAction
                          to={`/sign-up`}
                          loading={`${loading}`}
                      >
                          Nie mam konta
                      </OtherAction>
                    </ActionsContainer>
                </FormBottom>
            </Form>
            <Picture slide={slide}>
              <h1>Treemotion</h1>
              <div>
                <div>
                  {texts.map((text, i) => <span>{text}</span>)}
                </div>
              </div>
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

const Note = styled.span<{ loading: string }>`
    text-align: center;
    color: ${props => (props.loading === 'true' ? '#cccccc' : 'red')};
    p {
      margin-top: .5rem;
      color: black;
    }
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

const ActionsContainer = styled.div({
  margin: '1rem 0 0 .6rem',
  display: 'flex',
  flexDirection: 'column'
})

const OtherAction = styled(Link)<{ loading: string }>`
    color: ${props => (props.loading === 'true' ? '#cccccc' : 'black')};
    pointer-events: ${props => (props.loading === 'true' ? 'none' : 'all')};
    font-family: 'Inter';
    font-size: 0.8rem;
    transition: 0.2s;
`

const Picture = styled.div<{ slide: number }>`
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
    div {
      color: #f2f2f2;
      text-shadow: 0 0 1rem rgba(0,0,0,.6);
      font-size: 2rem;
      position: relative;
      height: 5rem;
      width: 40rem;
      overflow: hidden;
      div {
        position: absolute;
        top: -${props => props.slide * 5}rem;
        left: 0;
        width: 100%;
        height: 40rem;
        transition: .6s ease-in-out;
        span {
          display: block;
          text-align: center;
          height: 5rem;
          line-height: 5rem;
          transition: .3s;
          opacity: 0;
          &:nth-of-type(${props => props.slide + 1}) {
            transition: .3s .3s;
            opacity: 1;
          }
        }
      }
    }
`

export default withRouter(SignIn)
