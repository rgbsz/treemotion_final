import React, { useState } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, Link, useHistory } from 'react-router-dom'

import TextField from './components/TextField'
import Select from './components/Select'
import Button from './components/Button'
import Radio from '../global/components/Radio'
import Image from './img/sign_in.jpg'
import MobileContainer from "../global/components/MobileContainer"

const SignUp: React.FC<RouteComponentProps> = () => {
    const history = useHistory()
    const texts = ['Wybiegaj swoją przyszłość', 'Wybiegaj swoją przyszłość', 'Lass deine Zukunft aus', 'あなたの未来を使い果たす', 'Agota tu futuro', 'Run out your future', 'Wybiegaj swoją przyszłość', 'Wybiegaj swoją przyszłość']
    const [slide, setSlide] = useState(1)
    setTimeout(() => {
      if(slide !== 6) {
        setSlide(slide + 1)
      }
    }, 2500)
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [city, setCity] = useState<number | null>(null)
    const [regulationsAccepted, setRegulationsAccepted] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<any>(false)
    async function SignUp(e: any) {
        e.preventDefault()
        if(!regulationsAccepted) {
          setErrors({ email: [], password: [], repeatPassword: [], city: [], regulations: 'Akceptacja regulaminu jest wymagana' })
        }
        else {
          try {
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
                  console.log(res.error)
                  setErrors(res.error)
                  setLoading(false)
              } else {
                  localStorage.setItem('defaultEmail', email)
                  localStorage.setItem('challengesHint', 'true')
                  history.push(`/sign-in`)
              }
          } catch(e) {
              console.log(`Error: ${e.message}`)
          }
        }
    }
    return (
        <>
            <Container>
                <Helmet>
                    <title>Treemotion | Rejestracja</title>
                </Helmet>
                <Form onSubmit={(e: any) => SignUp(e)}>
                    <TextField
                        type="text"
                        placeholder='Imię'
                        onInput={(e: string) => setFirstName(e)}
                        processing={loading}
                    />
                    <TextField
                        type="text"
                        placeholder='Adres e-mail'
                        onInput={(e: string) => setEmail(e)}
                        processing={loading}
                    />
                    <TextField
                        type="password"
                        placeholder='Hasło'
                        onInput={(e: string) => setPassword(e)}
                        processing={loading}
                    />
                    <TextField
                        type="password"
                        placeholder='Powtórz hasło'
                        onInput={(e: string) => setRepeatPassword(e)}
                        processing={loading}
                    />
                    <Select
                        placeholder="Miasto"
                        loading={loading}
                        options={[{id: 0, name: 'Wybierz miasto'}, {id: 1, name: 'Rybnik'}, {id: 2, name: 'Gliwice'}, {id: 3, name: 'Zabrze'}]}
                        onInput={(e: number) => setCity(e)}
                    />
                    <Radio onClick={(e: boolean) => setRegulationsAccepted(e)}/>
                    <Errors loading={`${loading}`}>
                        {errors && <p>{errors.regulations}</p>}
                        {errors && <p>{errors.firstName}</p>}
                        {errors && errors.email.map((error: string) => <p>{error}</p>)}
                        {errors && errors.password.map((error: string) => <p>{error}</p>)}
                        {errors && errors.repeatPassword.map((error: string) => <p>{error}</p>)}
                        {errors && errors.city.map((error: string) => <p>{error}</p>)}
                    </Errors>
                    <FormBottom>
                        <Button
                            text='Utwórz konto'
                            loading={loading}
                        />
                        <OtherAction
                            to={`/sign-in`}
                            loading={`${loading}`}
                        >
                            Mam już konto
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
            <MobileContainer/>
        </>
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
      display: none;
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

export default withRouter(SignUp)
