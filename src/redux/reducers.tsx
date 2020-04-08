import { combineReducers } from 'redux'
import StateTypes from "./types"

interface AccessTokenActionTypes {
    type: 'SET_ACCESS_TOKEN' | 'DELETE_ACCESS_TOKEN',
    payload?: {
        token: StateTypes['accessToken']
    }
}

const accessToken = (state = null, action: AccessTokenActionTypes) => {
    switch(action.type) {
        case 'SET_ACCESS_TOKEN':
            return action.payload?.token
        case 'DELETE_ACCESS_TOKEN':
            return null
        default:
            return state
    }
}

interface UserActionTypes {
    type: 'SET_USER' | 'DELETE_USER',
    payload?: {
        user: {
            name: string,
            email: string,
            city: {
                id: number,
                name: string
            },
            isAdmin: boolean
        }
    }
}

const user = (state = null, action: UserActionTypes) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                state,
                name: action.payload?.user.name,
                email: action.payload?.user.email,
                city: action.payload?.user.city,
                isAdmin: action.payload?.user.isAdmin
            }
        case 'DELETE_USER':
            return null
        default:
            return state
    }
}

interface WorkoutsActionsTypes {
    type: 'SET_WORKOUTS' | 'DELETE_WORKOUTS',
    payload?: {
        workouts: StateTypes['workouts']
    }
}

const workouts = (state = null, action: WorkoutsActionsTypes) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return action.payload?.workouts
        case 'DELETE_WORKOUTS':
            return null
        default:
            return state
    }
}

interface AllChallengesActionsTypes {
    type: 'SET_ALL_CHALLENGES' | 'DELETE_CHALLENGES',
    payload?: {
        challenges: StateTypes['allChallenges']
    }
}

const allChallenges = (state = null, action: AllChallengesActionsTypes) => {
    switch(action.type) {
        case 'SET_ALL_CHALLENGES':
            return action.payload?.challenges
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

interface FutureChallengesActionsTypes {
    type: 'SET_FUTURE_CHALLENGES' | 'DELETE_CHALLENGES',
    payload?: {
        challenges: StateTypes['futureChallenges']
    }
}

const futureChallenges = (state = null, action: FutureChallengesActionsTypes) => {
    switch(action.type) {
        case 'SET_FUTURE_CHALLENGES':
            return action.payload?.challenges
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

interface CurrentChallengeActionsTypes {
    type: 'SET_CURRENT_CHALLENGE' | 'DELETE_CHALLENGES',
    payload?: {
        challenge: StateTypes['currentChallenge']
    }
}

const currentChallenge = (state = null, action: CurrentChallengeActionsTypes) => {
    switch(action.type) {
        case 'SET_CURRENT_CHALLENGE':
            return action.payload ? action.payload.challenge ? action.payload.challenge : null : null
        case 'DELETE_CHALLENGES':
            return null
        default:
            return state
    }
}

interface UsersRankingActionsTypes {
    type: 'SET_USERS_RANKING' | 'DELETE_USERS_RANKING',
    payload?: {
        users: StateTypes['usersRanking']
    }
}

const usersRanking = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_USERS_RANKING':
            return action.payload?.users
        case 'DELETE_USERS_RANKING':
            return null
        default:
            return state
    }
}

interface CitiesRankingActionsTypes {
    type: 'SET_CITIES_RANKING' | 'DELETE_CITIES_RANKING',
    payload?: {
        cities: StateTypes['citiesRanking']
    }
}


const citiesRanking = (state = null, action: any) => {
    switch(action.type) {
        case 'SET_CITIES_RANKING':
            return action.payload?.cities
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
