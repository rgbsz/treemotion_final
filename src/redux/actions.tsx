export const setAccessToken = (token: string) => {
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

export const setUser = (name: string, email: string, city: any, isAdmin: boolean) => {
    return {
        type: 'SET_USER',
        payload: {
            name,
            email,
            city,
            isAdmin
        }
    }
}

export const deleteUser = () => {
    return {
        type: 'DELETE_USER'
    }
}

export const setWorkouts = (workouts: any) => {
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

type challengeTypes = {
  challenge: {
    id: number,
    name: string,
    distance: number,
    userDistance?: number
  }
}

export const setAllChallenges = (challenges: challengeTypes[]) => {
    return {
        type: 'SET_ALL_CHALLENGES',
        payload: {
            challenges
        }
    }
}

export const setFutureChallenges = (challenges: challengeTypes[]) => {
    return {
        type: 'SET_FUTURE_CHALLENGES',
        payload: {
            challenges
        }
    }
}

export const setCurrentChallenge = (challenge: challengeTypes) => {
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
