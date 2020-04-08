import StateTypes from "./types"

export const setAccessToken = (token: StateTypes['accessToken']) => {
    return {
        type: 'SET_ACCESS_TOKEN',
        payload: {
            token
        }
    }
}

export const deleteAccessToken = () => {
    return {
        type: 'DELETE_ACCESS_TOKEN'
    }
}

export const setUser = (user: StateTypes['user']) => {
    return {
        type: 'SET_USER',
        payload: {
            user
        }
    }
}

export const deleteUser = () => {
    return {
        type: 'DELETE_USER'
    }
}

export const setWorkouts = (workouts: StateTypes['workouts']) => {
    return {
        type: 'SET_WORKOUTS',
        payload: {
            workouts
        }
    }
}

export const deleteWorkouts = () => {
    return {
        type: 'DELETE_WORKOUTS'
    }
}

export const setAllChallenges = (challenges: StateTypes['allChallenges']) => {
    return {
        type: 'SET_ALL_CHALLENGES',
        payload: {
            challenges
        }
    }
}

export const setFutureChallenges = (challenges: StateTypes['futureChallenges']) => {
    return {
        type: 'SET_FUTURE_CHALLENGES',
        payload: {
            challenges
        }
    }
}

export const setCurrentChallenge = (challenge: StateTypes['currentChallenge']) => {
    return {
        type: 'SET_CURRENT_CHALLENGE',
        payload: {
            challenge
        }
    }
}

export const deleteChallenges = () => {
    return {
        type: 'DELETE_CHALLENGES'
    }
}

export const setUsersRanking = (users: any) => {
    return {
        type: 'SET_USERS_RANKING',
        payload: {
            users
        }
    }
}

export const deleteUsersRanking = () => {
    return {
        type: 'DELETE_USERS_RANKING'
    }
}

export const setCitiesRanking = (users: any) => {
    return {
        type: 'SET_CITIES_RANKING',
        payload: {
            users
        }
    }
}

export const deleteCitiesRanking = () => {
    return {
        type: 'DELETE_CITIES_RANKING'
    }
}
