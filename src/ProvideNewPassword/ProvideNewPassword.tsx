import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory, useParams } from 'react-router-dom'

import TextField from './components/TextField'
import Button from './components/Button'
import Image from './img/sign_in.jpg'


const ProvideNewPassword: React.FC<RouteComponentProps> = () => {
    let history = useHistory()
    const texts: string[] = ['Wybiegaj swoją przyszłość', 'Wybiegaj swoją przyszłość', 'Lass deine Zukunft aus', 'あなたの未来を使い果たす', 'Agota tu futuro', 'Run out your future', 'Wybiegaj swoją przyszłość', 'Wybiegaj swoją przyszłość']
    const [slide, setSlide] = useState<number>(1)
    setTimeout(() => {
      if(slide !== 6) {
        setSlide(slide + 1)
      }
    }, 2500)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | boolean>(false)
    const { id } = useParams()
    async function saveChanges(e: any) {
      setLoading(true)
      e.preventDefault()
      if(newPassword !== confirmPassword && (newPassword !== '' || confirmPassword !== '')) setError('Hasła muszą być takie same.')
      else if(newPassword === '' || confirmPassword === '') setError('Żadne z tych pól nie może być puste.')
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
                <title>Treemotion | Resetowanie hasła</title>
            </Helmet>
            <Form onSubmit={(e: any) => saveChanges(e)}>
                <TextField
                    type="password"
                    placeholder='Nowe hasło'
                    onInput={(e: string) => setNewPassword(e)}
                    processing={loading}
                />
                <TextField
                    type="password"
                    placeholder='Powtórz nowe hasło'
                    onInput={(e: string) => setConfirmPassword(e)}
                    processing={loading}
                />
                <Error loading={`${loading}`}>
                    {error && error}
                </Error>
                <FormBottom>
                    <Button
                        text='Zapisz hasło'
                        loading={loading}
                    />
                    <OtherAction
                        to={`/sign-in`}
                        loading={`${loading}`}
                    >
                        Wróć
                    </OtherAction>
                </FormBottom>
            </Form>
            <Picture slide={slide}>
              <h1>Treemotion</h1>
              <div>
                <div>
                  {texts.map(text => <span>{text}</span>)}
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
    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
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
    @media only screen and (max-width: 768px) {
      display: none;
    }
`

export default withRouter(ProvideNewPassword)
