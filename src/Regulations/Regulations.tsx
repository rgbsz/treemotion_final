import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Rankings: React.FC<RouteComponentProps> = () => (
    <Container>
        <Helmet>
            <title>Treemotion | Polityka prywatności</title>
        </Helmet>
        <Content>
            <Header>Polityka prywatności aplikacji i serwisu <Brand>Treemotion</Brand></Header>
            <Paragraph>§ 1 Postanowienia ogólne</Paragraph>
            <ParagraphContent>
                1. Niniejsza Polityka Prywatności Aplikacji Mobilnej TreeMotion (zwana dalej „Polityką Prywatności”) określa sposób zbierania, przetwarzania i przechowywania danych osobowych koniecznych do realizacji usług świadczonych za pośrednictwem aplikacji mobilnej (zwanej dalej „Aplikacją”) przez AKG Development.
                <br/><br/>2. Użytkownikiem jest każda osoba fizyczna posiadająca zainstalowaną na swoim urządzeniu aplikację TreeMotion.
                <br/><br/>3. Operatorem serwisu oraz dalej zwanym Administratorem danych osobowych jest: AKG Development
                <br/><br/>4. Adres kontaktowy poczty elektronicznej operatora: akgkontakt@gmail.org
                <br/><br/>5. Użytkownik przyjmuje do wiadomości, że udostępnianie przez niego danych osobowych jest dobrowolne. Udostępnianie Administratorowi danych osobowych przez Użytkownika nastąpi po zaakceptowaniu Polityki Prywatności podczas rejestracji w Aplikacji.
            </ParagraphContent>
            <Paragraph>§ 2 Przetwarzanie danych osobowych</Paragraph>
            <ParagraphContent>
                1. Wyrażam zgodę na przetwarzanie przez grupę TreeMotion moich danych osobowych w postaci: adresu e-mail oraz miasta zamieszkania celu możliwości korzystania ze strony internetowej oraz aplikacji mobilnej, personalizacji wcześniej wymienionych usług,dostarczania wiadomości drogą mailową, zbierania statystyk oraz innych zastosowań.
                <br/><br/>2. Zgoda na przetwarzanie danych osobowych jest udzielona dobrowolnie na podstawie art. 6 ust.1 lit. a rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej: RODO).
                <br/><br/>3. Grupa TreeMotion bez Twojej wyraźnej zgody nie będzie przekazywać danych osobowych stronom stronom trzecim, lub jakimkolwiek innym związanych z nimi strom trzecim, w celu marketingu bezpośredniego.
            </ParagraphContent>
            <Paragraph>§ 3 Dane zbierane automatycznie</Paragraph>
            <ParagraphContent>
                1. Dane lokalizacji Użytkownika, mogą być używane przez Administratora w celu dokonania obliczeń przebytego dystansu by zamienić odległość na drzewa dla miast. Informacje wskazane w zdaniu poprzednim będą udostępniane Użytkownikowi w Aplikacji.
                <br/><br/>2. Dane zbierane automatycznie nie umożliwiają jednoznacznej identyfikacji Użytkownika.
            </ParagraphContent>
            <Paragraph>§ 4 Dane zbierane w celu nawiązania kontaktu</Paragraph>
            <ParagraphContent>
                1. W razie kontaktu Użytkownika z Administratorem, przy rejestracji wymagane jest podanie następujących danych:
                <br/><br/>a) adresu e-mail
                <br/><br/>b) imienia
                <br/><br/>2.  Podanie danych jest dobrowolne i służy tylko w celu kontaktu zwrotnego.
            </ParagraphContent>
            <Paragraph>§ 5 Dane zbierane z telefonu podczas użytkowania aplikacji</Paragraph>
            <ParagraphContent>
                1. Geolokalizacja - lokalizacja urządzenia zbierana w celu umożliwienia działania głównych funkcji aplikacji, w tym obliczaniu przebytego dystansu podczas korzystania z aplikacji.
                <br/><br/>2. Aparat - możliwość dodania zdjęcia z aparatu jako awataru użytkownika.
                <br/><br/>3. Informacji sieciowych - na potrzeby sprawdzania dostępu do Internetu przez aplikację.
            </ParagraphContent>
            <Paragraph>§ 6 Prawa i obowiązki Administratora</Paragraph>
            <ParagraphContent>
                1. Administrator przetwarza dane osobowe Użytkownika z zachowaniem wymogów Ustawy z dnia 29 sierpnia 1997 r. o ochronie danych osobowych (t.j. Dz. U. z 2016 r. poz. 922)
                <br/><br/>2. Administrator zapewnienia odpowiednie środki techniczne i organizacyjne gwarantujące bezpieczeństwo przetwarzanych danych osobowych, w szczególności uniemożliwiających dostęp do nich nieuprawnionym osobom trzecim, lub ich przetwarzania z naruszeniem przepisów powszechnie obowiązującego prawa, zapobiegających utracie danych osobowych, ich uszkodzeniu lub zniszczeniu.
                <br/><br/>3. Użytkownik ma prawo dostępu do swoich danych osobowych za pośrednictwem Aplikacji.
                <br/><br/>4. Użytkownik może w każdej chwili dokonać modyfikacji, zmiany, uzupełnienia lub usunięcia udostępnionych danych osobowych, za pośrednictwem narzędzi dostępnych w Aplikacji.
                <br/><br/>5. W przypadku trwałego usunięcia przez Użytkownika danych osobowych, koniecznych do realizacji przez Administratora usług świadczonych za pośrednictwem Aplikacji, Użytkownik traci możliwość korzystania z usług świadczonych przez aplikację.
            </ParagraphContent>
            <Paragraph>§ 7 Prawa i obowiązki Użytkownika</Paragraph>
            <ParagraphContent>
                1. Użytkownik ma prawo dostępu do swoich danych osobowych za pośrednictwem Aplikacji.
                <br/><br/>2. Użytkownik może w każdej chwili dokonać modyfikacji, zmiany, uzupełnienia lub usunięcia udostępnionych danych osobowych, za pośrednictwem narzędzi dostępnych w Aplikacji.
                <br/><br/>3. W przypadku trwałego usunięcia przez Użytkownika danych osobowych, koniecznych do realizacji przez Administratora usług świadczonych za pośrednictwem Aplikacji, Użytkownik utraci możliwość korzystania z tych usług.
                <br/><br/>4. Administrator zastrzega sobie prawo wprowadzenia zmian w Polityce Prywatności, o czym poinformuje Użytkownika za pośrednictwem Aplikacji. Jeżeli Użytkownik nie wyrazi zgody na
                <br/><br/>5. Wprowadzone zmiany, zobowiązany jest trwale usunąć Aplikację ze swojego urządzenia mobilnego. 
            </ParagraphContent>
        </Content>
    </Container>
)

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 1.5rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: scroll;
`

const Content = styled.div`
    max-width: 50rem;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`

const Header = styled.h1`
    font-family: 'Inter';
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`

const Brand = styled.h1`
    font-size: 4rem;
    background: -webkit-linear-gradient(30deg, #146D52 0%, #08313E 120%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const Paragraph = styled.h2`
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Inter';
    margin: 2rem 0;
`

const ParagraphContent = styled.span`
    font-size: 1rem;
    font-family: 'Inter';
    text-align: justify;
`

export default withRouter(Rankings)
