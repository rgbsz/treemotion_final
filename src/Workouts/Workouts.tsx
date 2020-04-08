import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline , Marker} from 'react-google-maps'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchWorkouts } from './functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'
import RoadIcon from '../global/img/RoadIcon'
import SpeedometerIcon from '../global/img/SpeedometerIcon'
import TimeIcon from '../global/img/TimeIcon'
import StateTypes from "../redux/types"

const Map = withScriptjs(withGoogleMap((props: any) => {
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={props.workout ? { lat: props.workout.route[Math.floor(props.workout.route.length/2)].lat, lng: props.workout.route[Math.floor(props.workout.route.length/2)].lng } : { lat: 50.089475, lng: 18.532616 }}
            center={props.workout ? { lat: props.workout.route[Math.floor(props.workout.route.length/2)].lat, lng: props.workout.route[Math.floor(props.workout.route.length/2)].lng } : { lat: 50.089475, lng: 18.532616 }}
>
{
    props.workout ?
      <Polyline
      path={props.workout.route}
      options={{
          strokeColor: "#146D52",
          strokeOpacity: 1,
          strokeWeight: 5,
          icons: [
                    {
                      offset: "0",
                      repeat: "20px"
                    }
                 ]
              }}
      />
:
''
}
{
  props.workout ?
  <>
    <Marker position={{ lat: props.workout.route[0].lat, lng: props.workout.route[0].lng }}/>
    <Marker position={{ lat: props.workout.route[props.workout.route.length - 1].lat, lng: props.workout.route[props.workout.route.length - 1].lng }}/>
  </>
  :
  ''
}
        </GoogleMap>
    )
}));

const Workouts: React.FC<RouteComponentProps> = () => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: StateTypes) => state.accessToken)
    const user = useSelector((state: StateTypes) => state.user)
    const workouts = useSelector((state: StateTypes) => state.workouts)
    const [workoutsTimes, setWorkoutsTimes] = useState([{time: 'xd', date: 'xd'}])
    const [workout, setWorkout] = useState<any>(null)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!workouts) fetchWorkouts(accessToken)
        else {
          setRequest(true)
          let arr: any = []
          workouts.map((workout: any) => {
            let date = new Date(parseInt(workout.date))
            let hours = date.getHours()
            let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()
            arr.push({ time: `${hours}:${minutes}`, date: `${day}.${month}.${year}` })
          })
          setWorkoutsTimes(arr)
        }
    }, [accessToken, workouts, user])
    if(request) {
        return (
            <Container>
                <Helmet>
                    <title>Treemotion | Treningi</title>
                </Helmet>
                <NavigationPanel/>
                <TopPanel/>
                {
                  workouts && workouts.length > 0 ?
                  <Content>
                      <WorkoutsPlaceholder>
                      <AllWorkouts>
                          { workouts.map((item: any, i: number) => <WorkoutItem onClick={() => setWorkout(item)} active={!!(workout && workout.id === item.id)} key={i}>{workouts.length - i}: {workoutsTimes[i].date} {workoutsTimes[i].time}</WorkoutItem>) }
                      </AllWorkouts></WorkoutsPlaceholder>
                      <RightSideWrapper>
                          <MapShadow/>
                          <Map
                              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWHBcMGuZCg4WEhTKJTchBv3oxN11KoTo&v=3.exp&libraries=geometry"
                              loadingElement={<div style={{ height: `50vh` }} />}
                              containerElement={<div style={{ height: `50vh` }} />}
                              mapElement={<div style={{ height: `50vh` }} />}
                              workout={workout}
                          />
                          <Description>
                              {!workout ? <p>Nie wybrano treningu</p> :
                              <>
                              <DescriptionItem>
                                  <RoadIcon/>
                                  {workout && <span>{workout.distance > 1000 ? `${Math.floor(((workout.distance / 100) * 100) / 100)}km` : `${workout.distance}m`}</span>}
                              </DescriptionItem>
                              <DescriptionItem>
                                  <SpeedometerIcon/>
                                  {workout && <span>{workout.avgSpeed}km/h</span>}
                              </DescriptionItem>
                              <DescriptionItem>
                                  <TimeIcon/>
                                  {workout && <span>{workout.duration / 60 > 60 ? `${Math.floor((workout.duration / 3600) * 100) / 100}h` : workout.duration / 60 < 1 ?  `${workout.duration}s` : `${Math.floor((workout.duration / 60) * 100) / 100} min`}</span>}
                              </DescriptionItem>
                            </>}
                          </Description>
                      </RightSideWrapper>
                  </Content>
                  :
                  <NoWorkouts>
                      Nie masz żadnych treningów.
                  </NoWorkouts>
                }
            </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 18rem auto;
    grid-template-rows: 5rem auto;
`

const Content = styled.div({
    width: '100%',
    height: '44.5rem',
    display: 'grid',
    gridTemplateColumns: '1fr 50rem',
    gridColumnGap: '1.5rem',
    padding: '1.5rem',
    boxSizing: 'border-box',
})

const NoWorkouts = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 0 0 1.5rem rgba(0,0,0,.15);
`

const WorkoutsPlaceholder = styled.div`
    gridColumn: 1/2;
    background: transparent;
    borderRadius: 4px;
    position: relative;
    boxShadow: 0 0 1rem rgba(0,0,0,.15);
    width: 100%;
    height: 100%;
`

const AllWorkouts = styled.div({
    position: 'absolute',
    top: '0',
    left: '0',
    overflowY: 'scroll',
    maxHeight: '100%',
    width: '100%',
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    borderRadius: '4px',
    background: 'rgba(0,0,0,0)'
})

const WorkoutItem = styled.div<{active: boolean}>`
    width: 100%;
    padding: 1.4rem 1rem;
    box-sizing: border-box;
    transition: .2s;
    color: ${props => props.active ? '#146D52' : 'black'};
    background: white;
    font-weight: ${props => props.active ? 'bold' : 'regular'};
    &:hover {
        color: #146D52;
        cursor: pointer;
    }
    &:nth-child(2n) {
        background: #f2f2f2;
    }
`

const RightSideWrapper = styled.div({
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
})

const MapShadow = styled.div({
    boxShadow: '0 0 1rem rgba(0,0,0,.15)',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '50vh',
})

const Description = styled.div`
    height: 100%;
    margin-top: 1.5rem;
    border-radius: 4px;
    box-shadow: 0 0 1rem rgba(0,0,0,.15);
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      font-size: 2rem;
      font-weight: bold;
    }
`

const DescriptionItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    svg {
      margin-bottom: 1rem;
      width: 3.5rem;
      height: 3.5rem;
    }
`

export default withRouter(Workouts)
