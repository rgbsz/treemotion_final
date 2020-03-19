import store from '../store'
import { setChallenges } from '../redux/actions'

export const fetchChallenges = async () => {
    console.log('Fetching challenges...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/challenge',
            {
                method: 'GET'
            }
        )
        const res = await query.json()
        store.dispatch(setChallenges(res.challenges))
    }
    catch(e) {
        console.log(e.message)
    }
}