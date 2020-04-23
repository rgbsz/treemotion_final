import React from 'react'
import styled from 'styled-components'

const MobileContainer: React.FC = () => {
    return (
        <Component>
            <h1>TREEMOTION</h1>
            <span>Aby korzystać z Treemotion na urządzeniach mobilnych, konieczne jest pobranie aplikacji ze sklepu Google Play.</span>
            <a href={'https://play.google.com/store/apps/details?id=com.treemotion'} target={'_blank'}>
                <img src={'https://tuptuptup.org.pl/wp-content/uploads/2018/07/google-play-badge-PL.png'} alt={'get in on google play'}/>
            </a>
        </Component>
    )
}

const Component = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
  h1 {
    font-weight: 700;
    font-size: 2.5rem;
    text-align: center;
    background: -webkit-linear-gradient(30deg, #146D52 0%, #08313E 120%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
  }
  span {
    margin-bottom: 2rem;
    text-align: center;
  }
  a {
    img {
      width: 10rem;
    }
  }
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`

export default MobileContainer