type AccessTokenTypes = null | string

type UserTypes = null | {
    name: string,
    email: string,
    city: {
        id: number,
        name: string
    }
    isAdmin: boolean
}

type WorkoutsTypes = null | {
    id: number,
    date: string,
    duration: number,
    avgSpeed: number,
    route: {
        lat: number,
        lng: number
    }[]
}[]

type ChallengeTypes = {
    id: number,
    name: string,
    type: string,
    silverMedalDistance: number,
    bronzeMedalDistance: number,
    distance: number,
    isActive: boolean,
    startDate: string,
    endDate: string
}

type CurrentChallengeTypes = null | {
    userDistance: number,
    progress: number,
    challenge: ChallengeTypes
}

type FutureChallengesTypes = null | {
    userDistance: number,
    progress: number,
    challenge: ChallengeTypes
}[]

type AllChallengesTypes = null | ChallengeTypes[]

type UsersRankingTypes = null | {
    firstName: string
}[]

type CitiesRankingTypes = null | {
    name: string
}[]

type StateTypes = {
    accessToken: AccessTokenTypes,
    user: UserTypes,
    workouts: WorkoutsTypes,
    currentChallenge: CurrentChallengeTypes,
    futureChallenges: FutureChallengesTypes,
    allChallenges: AllChallengesTypes,
    usersRanking: UsersRankingTypes,
    citiesRanking: CitiesRankingTypes
}

export default StateTypes