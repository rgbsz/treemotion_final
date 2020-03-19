import store from '../store'
import { setWorkouts } from '../redux/actions'

export const fetchWorkouts = async (accessToken: string) => {
    console.log('Fetching workouts...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/workout/user',
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            }
        )
        const res = await query.json()
        store.dispatch(setWorkouts(res.workouts))
    }
    catch(e) {
        console.log(e.message)
    }
}