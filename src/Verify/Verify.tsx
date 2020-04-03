import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter, useParams, useHistory } from 'react-router-dom'
import LoadingScreen from '../global/components/LoadingScreen'
import { fetchVerification } from './functions'

const Verify: React.FC<RouteComponentProps> = () => {
    const history = useHistory()
    const { id } = useParams()
    useEffect(() => {
      async function fetch() {
        const res = await fetchVerification(id)
        if(res) {
          if(res.success) localStorage.setItem('verified', 'true')
          history.push('/sign-in')
        }
      }
      setTimeout(() => {
        fetch()
      }, 1500)
    }, [])
    return (
      <>
        <Helmet>
          <title>Treemotion | Weryfikacja konta</title>
        </Helmet>
        <LoadingScreen />
      </>
    )
}

export default withRouter(Verify)
