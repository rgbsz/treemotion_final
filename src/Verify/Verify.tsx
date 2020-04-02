import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchVerification } from './functions'

const Verify: React.FC<RouteComponentProps> = ({ match }) => {
    const history = useHistory()
    const { id } = useParams()
    useEffect(() => {
      async function fetch() {
        const res = await fetchVerification(id)
        if(res) history.push('/sign-in')
      }
      fetch()
    }, [])
    return <LoadingScreen />
}

export default withRouter(Verify)
