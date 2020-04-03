import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from 'react-google-maps'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchAccessToken, fetchUser } from '../global/functions'
import { fetchWorkouts } from './functions'
import NavigationPanel from '../global/components/NavigationPanel'
import TopPanel from '../global/components/TopPanel'

const Map = withScriptjs(withGoogleMap((props: any) => {
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={props.workout ? { lat: props.workout.route[Math.floor(props.workout.route.length/2)].lat, lng: props.workout.route[Math.floor(props.workout.route.length/2)].lng } : { lat: 50.089475, lng: 18.532616 }}
            center={props.workout ? { lat: props.workout.route[Math.floor(props.workout.route.length/2)].lat, lng: props.workout.route[Math.floor(props.workout.route.length/2)].lng } : { lat: 50.089475, lng: 18.532616 }}
>
{
    props.workout ? <Polyline
    path={props.workout.route}
    options={{
        strokeColor: "red",
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
        </GoogleMap>
    )
}));

const Workouts: React.FC<RouteComponentProps> = ({ match }) => {
    const [request, setRequest] = useState<boolean>(false)
    const accessToken = useSelector((state: any) => state.accessToken)
    const user = useSelector((state: any) => state.user)
    const workouts = useSelector((state: any) => state.workouts)
    const [workout, setWorkout] = useState<any>(null)
    useEffect(() => {
        if(!accessToken) fetchAccessToken()
        else if(!user) fetchUser(accessToken)
        else if(!workouts) fetchWorkouts(accessToken)
        else setRequest(true)
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
                  workouts.length > 0 ?
                  <Content>
                      <AllWorkouts>
                          { workouts.map((item: any) => <WorkoutItem onClick={() => setWorkout(item)} active={workout && workout.id === item.id ? true : false}>Workout {item.id}</WorkoutItem>) }
                      </AllWorkouts>
                      <MapWrapper>
                          <Map
                              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWHBcMGuZCg4WEhTKJTchBv3oxN11KoTo&v=3.exp&libraries=geometry"
                              loadingElement={<div style={{ height: `50vh` }} />}
                              containerElement={<div style={{ height: `50vh` }} />}
                              mapElement={<div style={{ height: `50vh` }} />}
                              workout={workout}
                          />
                      </MapWrapper>
                  </Content>
                  :
                  <Content>
                      Nie masz zadnych treningów mordo
                  </Content>
                }
            </Container>
        )
    }
    else return <LoadingScreen />
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 6.4rem 1.4rem 1.4rem 7.5rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
    z-index: 1;
    @media screen and (min-width: 1024px) {
        padding: 6.4rem 1.4rem 1.4rem 19.5rem;
    }
`

const Content = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative'
})

const AllWorkouts = styled.div({
    gridColumn: '1/2',
    width: 'auto',
    background: 'white',
    borderRadius: '4px',
    position: 'relative',
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxShadow: '0 0 1rem rgba(0,0,0,.15)'
})

const WorkoutItem = styled.div<{active: boolean}>`
    width: 100%;
    padding: 1.4rem 1rem;
    box-sizing: border-box;
    transition: .2s;
    color: ${props => props.active ? '#146D52' : 'black'};
    &:hover {
        color: #146D52;
        transform: scale(1.1);
        cursor: pointer;
    }
    &:nth-child(2n) {
        background: #f2f2f2;
    }
`

const MapWrapper = styled.div({
    width: 'auto',
    marginLeft: '1.4rem',
    borderRadius: '4px',
    overflow: 'hidden',
    flexGrow: 1,
    boxShadow: '0 0 1rem rgba(0,0,0,.15)'
})

export default withRouter(Workouts)
