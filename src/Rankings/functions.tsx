import store from '../store'
import { setUsersRanking, setCitiesRanking } from '../redux/actions'

export const fetchUsersRanking = async () => {
    console.log('Fetching users ranking...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/user',
            {
                method: 'GET'
            }
        )
        const res = await query.json()
        store.dispatch(setUsersRanking(res.users))
    }
    catch(e) {
        console.log(e.message)
    }
}

export const fetchCitiesRanking = async () => {
    console.log('Fetching cities ranking...')
    try {
        const query = await fetch(
            'https://treemotion.herokuapp.com/city',
            {
                method: 'GET'
            }
        )
        const res = await query.json()
        store.dispatch(setCitiesRanking(res.cities))
    }
    catch(e) {
        console.log(e.message)
    }
}