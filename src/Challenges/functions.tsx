import store from '../store'
import { setAllChallenges, setFutureChallenges, setCurrentChallenge } from '../redux/actions'

export const fetchChallenges = async (accessToken: string) => {
    console.log('Fetching challenges...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/challenge',
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
            }
        )
        const res = await query.json()
        store.dispatch(setAllChallenges(res.challenges))
        store.dispatch(setFutureChallenges(res.futureChallenges))
        store.dispatch(setCurrentChallenge(res.currentChallenge))
        console.log(res)
    }
    catch(e) {
        console.log(e.message)
    }
}

export const fetchAdminChallenges = async () => {
    console.log('Fetching admin challenges...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/challenge/all',
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }
        )
        const res = await query.json()
        return res.challenges
    }
    catch(e) {
        console.log(e.message)
    }
}
