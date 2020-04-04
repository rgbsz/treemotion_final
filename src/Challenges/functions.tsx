import store from '../store'
import { setChallenges } from '../redux/actions'

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
        store.dispatch(setChallenges(res.challenges, res.currentChallenge, res.futureChallenges))
    }
    catch(e) {
        console.log(e.message)
    }
}
