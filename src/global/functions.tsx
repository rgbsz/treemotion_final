import { createBrowserHistory } from 'history';
import store from '../store'
import { setAccessToken, setUser, deleteUser, deleteAccessToken, deleteCitiesRanking, deleteUsersRanking, deleteChallenges, deleteWorkouts } from '../redux/actions';

let history = createBrowserHistory()

export async function fetchAccessToken() {
    console.log('Fetching access token...')
    const query = await fetch('https://treemotion.herokuapp.com/user/refresh', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }
    })
    const res = await query.json()
    if(res.success) store.dispatch(setAccessToken(res.accessToken))
    else {
        localStorage.removeItem('refreshToken')
        history.push('/sign-in')
    }
}

export const fetchUser = async (accessToken: string) => {
    console.log('Fetching user...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/user/detail',
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            }
        )
        const res = await query.json()
        store.dispatch(setUser({name: res.user.firstName, email: res.user.email, city: res.user.city, isAdmin: res.user.isAdmin}))
    }
    catch(e) {
        console.log(e.message)
    }
}

export const removeRedux = () => {
    console.log('Logging out...')
    store.dispatch(deleteUser())
    store.dispatch(deleteChallenges())
    store.dispatch(deleteWorkouts())
    store.dispatch(deleteAccessToken())
    store.dispatch(deleteUsersRanking())
    store.dispatch(deleteCitiesRanking())
}
