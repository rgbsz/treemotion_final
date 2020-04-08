import { combineReducers } from 'redux'

const accessToken = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_ACCESS_TOKEN':
            return action.payload.token
        case 'DELETE_ACCESS_TOKEN':
            return null
        default:
            return state
    }
}

const user = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                state,
                name: action.payload.user.name,
                email: action.payload.user.email,
                city: action.payload.user.city,
                isAdmin: action.payload.user.isAdmin
            }
        case 'DELETE_USER':
            return null
        default:
            return state
    }
}

const workouts = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return action.payload.workouts
        case 'DELETE_WORKOUTS':
            return null
        default:
            return state
    }
}

const allChallenges = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_ALL_CHALLENGES':
            return action.payload.challenges
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

const futureChallenges = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_FUTURE_CHALLENGES':
            return action.payload.challenges
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

const currentChallenge = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_CURRENT_CHALLENGE':
            return action.payload.challenge ? action.payload.challenge : null
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

const usersRanking = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_USERS_RANKING':
            return action.payload.users
        case 'DELETE_USERS_RANKING':
            return null
        default:
            return state
    }
}

const citiesRanking = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_CITIES_RANKING':
            return action.payload.users
        case 'DELETE_CITIES_RANKING':
            return null
        default:
            return state
    }
}

const reducers = combineReducers({
    accessToken,
    user,
    workouts,
    allChallenges,
    futureChallenges,
    currentChallenge,
    usersRanking,
    citiesRanking
})

export default reducers
