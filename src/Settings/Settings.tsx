import React, { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import TextField from '../global/components/TextField'
import Button from '../global/components/Button'
import Select from '../global/components/Select'
import { setUser } from '../redux/actions'

const Settings: React.FC<RouteComponentProps> = ({ match }) => {
    const dispatch = useDispatch()
    const cities = [{id: 1, name: 'Rybnik'}, {id: 2, name: 'Gliwice'}, {id: 3, name: 'Zabrze'}]
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const [name, setName] = useState<null | string>(null)
    const [email, setEmail] = useState<null | string>(null)
    const [city, setCity] = useState<null | number>(null)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState<null | string>(null)
    const [loading_1, setLoading_1] = useState(false)
    const [loading_2, setLoading_2] = useState(false)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else setRequest(true)
    }, [accessToken, user])
    async function handleSaveData(e: any) {
        e.preventDefault()
        try {
            setLoading_1(true)
            const query = await fetch(
                'https://treemotion.herokuapp.com/user/update',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: name ? name : user.name,
                        email: email ? email : user.email,
                        city: city ? city : user.city.id
                    }),
                    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                },
            )
            const res = await query.json()
            console.log(res)
            if (!res.success) {
                console.log(res)
                setLoading_1(false)
            }
            else {
                const resultCity = res.result.city === 1 ? {id: 1, name: 'Rybnik'} : res.result.city === 2 ? {id: 2, name: 'Gliwice'} : {id: 3, name: 'Zabrze'}
                setLoading_1(false)
                dispatch(setUser(res.result.firstName, res.result.email, resultCity, res.result.isAdmin))
            }
        } catch(e) {
            console.log(`Error: ${e.message}`)
        }
    }
    async function handleSavePassword(e: any) {
        e.preventDefault()
        setLoading_2(true)
        if(newPassword !== confirmPassword && (newPassword !== '' || confirmPassword !== '')) setPasswordError('Password must be the same.')
        else if(newPassword === '' || confirmPassword === '') setPasswordError('None of these fields can be empty.')
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
                }
                else {
                    setPasswordError('Password has changed.')
                }
            } catch(e) {
                console.log(`Error: ${e.message}`)
            }
        }
        setLoading_2(false)
    }
    if(request) {
        return (
            <Container>
                <Helmet>
                    <title>TreeMotion - Settings</title>
                </Helmet>
                <NavigationPanel/>
                <TopPanel/>
                <Content>
                    <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSaveData(e)}>
                        <StyledTextField className='styledTextField' type='text' placeholder='Name' defaultValue={user.name} onInput={(e: string) => setName(e)} processing={loading_1}/>
                        <StyledTextField className='styledTextField' type='text' placeholder='E-mail address' defaultValue={user.email} onInput={(e: string) => setEmail(e)} processing={loading_1}/>
                        <StyledSelect
                            className='styledSelect'
                            placeholder='City'
                            loading={loading_1}
                            options={user ? [user.city, ...cities.filter(function(el: any) { return el.id !== user.city.id; })] : cities}
                            onInput={(e: number) => setCity(e)}
                        />
                        <Error></Error>
                        <StyledButton
                            className='styledButton'
                            text='Save changes'
                            loading={loading_1}
                        />
                    </Form>
                    <Form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSavePassword(e)}>
                        <StyledTextField className='styledTextField' type='password' placeholder='Old password' onInput={(e: string) => setPassword(e)} processing={loading_2}/>
                        <StyledTextField className='styledTextField' type='password' placeholder='New password' onInput={(e: string) => setNewPassword(e)} processing={loading_2}/>
                        <StyledTextField className='styledTextField' type='password' placeholder='Confirm new password' onInput={(e: string) => setConfirmPassword(e)} processing={loading_2}/>
                        <Error>{passwordError && passwordError}</Error>
                        <StyledButton
                            className='styledButton'
                            text='Save changes'
                            loading={loading_2}
                        />
                    </Form>
                </Content>
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
        padding: 6.4rem 1.4rem 1.4rem 18.5rem;
    }
`

const Content = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    position: 'relative'
})

const Form = styled.form({
    width: 'calc(33.33% - 2rem)',
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    borderRadius: '4px',
    padding: '0 1rem 1rem 1rem',
    margin: '0 1rem',
    boxSizing: 'border-box'
})

const Error = styled.span({
    fontSize: '.8rem',
    color: 'red'
})

const StyledButton = styled(Button)({
    width: '100%!important'
})

const StyledTextField = styled(TextField)({
    width: '100%!important'
})

const StyledSelect = styled(Select)({
    width: '100%!important'
})

export default withRouter(Settings)
