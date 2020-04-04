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
                name: action.payload.name,
                email: action.payload.email,
                city: action.payload.city,
                isAdmin: action.payload.isAdmin
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

const challenges = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_CHALLENGES':
            return {
              state,
              allChallenges: action.payload.challenges,
              currentChallenge: action.payload.currentChallenge ? action.payload.currentChallenge.challenge : null,
              futureChallenges: action.payload.futureChallenges
            }
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
    challenges,
    usersRanking,
    citiesRanking
})

export default reducers
