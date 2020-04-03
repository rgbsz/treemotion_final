import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser, removeRedux } from '../global/functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import TextField from '../global/components/TextField'
import Button from '../global/components/Button'
import Select from '../global/components/Select'
import { setUser } from '../redux/actions'

type dataErrorsTypes = {
  firstName: string[],
  email: string[]
}

const Settings: React.FC<RouteComponentProps> = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const cities = [{id: 1, name: 'Rybnik'}, {id: 2, name: 'Gliwice'}, {id: 3, name: 'Zabrze'}]

    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else setRequest(true)
    }, [accessToken, user])

    const [name, setName] = useState<null | string>(null)
    const [email, setEmail] = useState<null | string>(null)
    const [city, setCity] = useState<null | number>(null)
    const [loading_1, setLoading_1] = useState(false)
    const [dataErrors, setDataErrors] = useState<null | dataErrorsTypes>(null)
    const [dataSuccess, setDataSuccess] = useState<null | string>(null)
    async function handleSaveData(e: any) {
        e.preventDefault()
        try {
            setLoading_1(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/update',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: name !== null ? name : user.name,
                        email: email !== null ? email : user.email,
                        city: city !== null ? city : user.city.id
                    }),
                    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                },
            )
            const res = await query.json()
            if (!res.success) {
                setDataErrors(res.error)
                setDataSuccess(null)
                setLoading_1(false)
            }
            else {
                setDataErrors(null)
                setDataSuccess('Dane zaktualizowane pomyślnie.')
                const resultCity = res.result.city === 1 ? {id: 1, name: 'Rybnik'} : res.result.city === 2 ? {id: 2, name: 'Gliwice'} : {id: 3, name: 'Zabrze'}
                setLoading_1(false)
                dispatch(setUser(res.result.firstName, res.result.email, resultCity, res.result.isAdmin))
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
    }

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState<null | string>(null)
    const [passwordSuccess, setPasswordSuccess] = useState<null | string>(null)
    const [loading_2, setLoading_2] = useState(false)
    async function handleSavePassword(e: any) {
        e.preventDefault()
        setLoading_2(true)
        if(newPassword !== confirmPassword && (newPassword !== '' || confirmPassword !== '')) setPasswordError('Hasła muszą być takie same.')
        else if(newPassword === '' || confirmPassword === '') setPasswordError('Żadne z tych pól nie może być puste.')
        else {
            try {
                const query = await fetch(
                    'https://treemotion.herokuapp.com/user/update-password',
                    {
                        method: 'PUT',
                        body: JSON.stringify({
                            password: password,
                            newPassword: newPassword
                        }),
                        headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                    },
                )
                const res = await query.json()
                if (!res.success) {
                    console.log(res)
                    setPasswordError(res.error)
                    setPasswordSuccess(null)
                }
                else {
                    setPasswordError(null)
                    setPasswordSuccess('Hasło zmienione.')
                }
            } catch(e) {
                console.log(`Error: ${e.message}`)
            }
        }
        setLoading_2(false)
    }

    const [loading_3, setLoading_3] = useState(false)
    const [deleteEmail, setDeleteEmail] = useState<null | string>(null)
    const [deleteAccountError, setDeleteAccountError] = useState<null | string>(null)
    const [modal, setModal] = useState<boolean>(false)
    function handleDeleteAccountVerification(e: any) {
      e.preventDefault()
      setLoading_3(true)
      if(!deleteEmail) setDeleteAccountError('To pole nie może być puste.')
      else if(deleteEmail !== user.email) setDeleteAccountError('E-mail jest nieprawidłowy.')
      else {
        setDeleteAccountError('Uwaga: konto zostanie usunięte!')
        setModal(true)
      }
      setLoading_3(false)
    }

    async function handleDeleteAccount(e: boolean) {
        if(e) {
          try {
              const query = await fetch(
                  'https://treemotion.herokuapp.com/user/delete',
                  {
                      method: 'DELETE',
                      headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                  },
              )
              const res = await query.json()
              if (!res.success) {
                  console.log(res)
              }
              else {
                  localStorage.removeItem('refreshToken');
                  history.push('/sign-in');
                  removeRedux()
              }
          } catch(e) {
              console.log(`Error: ${e.message}`)
          }
        }
        else {
          setModal(false)
          setDeleteAccountError(null)
        }
    }
    if(request) {
        return (
            <Container>
                <Helmet>
                    <title>Treemotion | Ustawienia</title>
                </Helmet>
                <NavigationPanel/>
                <TopPanel/>
                <Content>
                    <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSaveData(e)}>
                        <div>
                            <StyledTextField className='styledTextField' type='text' placeholder='Imię' defaultValue={user.name} onInput={(e: string) => setName(e)} processing={loading_1}/>
                            <StyledTextField className='styledTextField' type='text' placeholder='Adres e-mail' defaultValue={user.email} onInput={(e: string) => setEmail(e)} processing={loading_1}/>
                            <StyledSelect
                                className='styledSelect'
                                placeholder='Miasto'
                                loading={loading_1}
                                options={user ? [user.city, ...cities.filter(function(el: any) { return el.id !== user.city.id; })] : cities}
                                onInput={(e: number) => setCity(e)}
                            />
                        </div>
                        <div>
                            <Note loading={`${loading_1}`} error={dataErrors} success={dataSuccess}>
                              {dataErrors && dataErrors.firstName.map((error: string) => <p key={error}>{error}</p>)}
                              {dataErrors && dataErrors.email.map((error: string) => <p key={error}>{error}</p>)}
                              {dataSuccess && dataSuccess}
                            </Note>
                        </div>
                        <StyledButton
                            className='styledButton'
                            text='Zapisz zmiany'
                            loading={loading_1}
                        />
                    </Form>
                    <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSavePassword(e)}>
                        <div>
                          <StyledTextField className='styledTextField' type='password' placeholder='Stare hasło' onInput={(e: string) => setPassword(e)} processing={loading_2}/>
                          <StyledTextField className='styledTextField' type='password' placeholder='Nowe hasło' onInput={(e: string) => setNewPassword(e)} processing={loading_2}/>
                          <StyledTextField className='styledTextField' type='password' placeholder='Powtórz nowe hasło' onInput={(e: string) => setConfirmPassword(e)} processing={loading_2}/>
                        </div>
                        <Note loading={`${loading_2}`} error={passwordError} success={passwordSuccess}>
                          {passwordError && passwordError}
                          {passwordSuccess && passwordSuccess}
                        </Note>
                        <StyledButton
                            className='styledButton'
                            text='Zapisz zmiany'
                            loading={loading_2}
                        />
                    </Form>
                    <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleDeleteAccountVerification(e)}>
                        <Note loading={`${loading_3}`}>
                          Aby usunąć swoje konto, przepisz swój adres e-mail:
                        </Note>
                        <Email loading={loading_3}>{user.email}</Email>
                        <div>
                          <StyledTextField className='styledTextField' type='text' placeholder='Adres e-mail' onInput={(e: string) => setDeleteEmail(e)} processing={loading_3}/>
                        </div>
                        <Note loading={`${loading_3}`} error={deleteAccountError}>
                          {deleteAccountError && deleteAccountError}
                          {!deleteAccountError && 'Uwaga: Konto zostanie bezpowrotnie usunięte.'}
                        </Note>
                        <StyledButton
                            className='styledButton'
                            text='Usuń konto'
                            loading={loading_3}
                        />
                    </Form>
                </Content>
                <DeleteAccountModal active={modal}>
                  <PopUp>
                    <h1>Czy na pewno chcesz usunąć swoje konto?</h1>
                    <p>
                      <Button onClick={() => handleDeleteAccount(false)}
                          className='styledButton'
                          text='Nie usuwaj'
                          loading={loading_3}
                      />
                      <DeleteAccountButton onClick={() => handleDeleteAccount(true)}>
                          Usuń konto
                      </DeleteAccountButton>
                    </p>
                  </PopUp>
                </DeleteAccountModal>
            </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 6.4rem 1.4rem 1.4rem 6.5rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
    z-index: 1;
    @media screen and (min-width: 1024px) {
        padding: 6.4rem 1rem 1.4rem 19.4rem;
    }
`

const Content = styled.div({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto auto',
    gridColumnGap: '1.5rem'
})

const Form = styled.form({
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    borderRadius: '4px',
    padding: '0 1rem 1rem 1rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative'
})

const Note = styled.span<{ loading: string, error?: null | string | dataErrorsTypes, success?: null | string }>`
    margin-top: 1rem;
    text-align: center;
    font-size: .8rem;
    color: ${props => props.loading === 'true' ? '#cccccc' : props.error ? 'red' : props.success ? 'green' : 'black'};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Email = styled.span<{ loading: boolean }>`
    margin-top: .5rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: ${props => props.loading ? '#cccccc' : 'black'};
`

const StyledButton = styled(Button)({
    width: '100%!important'
})

const StyledTextField = styled(TextField)({
    width: '100%!important'
})

const StyledSelect = styled(Select)({
    width: '100%!important'
})

const DeleteAccountModal = styled.div<{ active: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0,0,0,.5);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.active ? '1' : '0'};
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  transition: .3s ease-in-out;
`

const PopUp = styled.div`
  padding: 2rem;
  box-shadow: 0 0 2rem rgba(0,0,0,.3);
  background: #f2f2f2;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }
  p {
    margin-top: 2rem;
    width: 14rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background: none;
    box-shadow: none;
    padding: 0;
    align-items: center;
  }
`

const DeleteAccountButton = styled.span`
  text-decoration: underline;
  margin-top: .8rem;
  font-size: .9rem;
  &:hover {
    cursor: pointer;
  }
`

export default withRouter(Settings)
