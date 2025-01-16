# Testing

> Place your test plan, test report and traceability matrix here

## Traceability matrix

### Functional

The table below shows an overview of which test covers which functional requirements

| Test | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 | F9 | F10 | 
|:----:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|
|  T1  | X  |    |    |    |    |    |    |    |    |     |
|  T2  |    | X  |    |    |    |    |    |    |    |     |
|  T3  |    |    | X  |    |    |    |    |    |    |     |
|  T4  |    |    |    | X  |    |    |    |    |    |     |
|  T5  |    |    |    |    | X  |    |    |    |    |     |
|  T6  |    |    |    |    |    | X  |    |    |    |     |
|  T7  |    |    |    |    |    |    | X  |    |    |     |
|  T8  |    |    |    |    |    |    |    |    |    |     |
|  T9  |    |    |    |    |    |    |    |    | X  |     |
| T10  |    |    |    |    |    |    |    |    |    |  X  |



### Non functional

The table below shows an overview of which test covers which non-functional requirements

| Test | NF1 | NF2 | NF3 | NF4 | NF5 | NF6 | NF7 | NF8 | NF9 | NF10 | NF11 | NF12 | NF13 | NF14 | NF15 | NF16 | NF17 | NF18 | NF19 | 
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|  T1  |  X  |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T2  |     |  X  |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T3  |     |     |  X  |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T4  |     |     |     |  X  |     |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T5  |     |     |     |     |  X  |     |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T6  |     |     |     |     |     |  X  |     |     |     |      |      |      |      |      |      |      |      |      |      |
|  T7  |     |     |     |     |     |     |  X  |     |     |      |      |      |      |      |      |      |      |      |      |
|  T8  |     |     |     |     |     |     |     |  X  |     |      |      |      |      |      |      |      |      |      |      |
|  T9  |     |     |     |     |     |     |     |     |  X  |      |      |      |      |      |      |      |      |      |      |
| T10  |     |     |     |     |     |     |     |     |     |  X   |      |      |      |      |      |      |      |      |      |
| T11  |     |     |     |     |     |     |     |     |     |      |  X   |      |      |      |      |      |      |      |      |
| T12  |     |     |     |     |     |     |     |     |     |      |      |  X   |      |      |      |      |      |      |      |
| T13  |     |     |     |     |     |     |     |     |     |      |      |      |  X   |      |      |      |      |      |      |
| T14  |     |     |     |     |     |     |     |     |     |      |      |      |      |  X   |      |      |      |      |      |
| T15  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |  X   |      |      |      |      |
| T16  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |  X   |      |      |      |
| T17  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |  X   |      |      |
| T18  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |  X   |      |
| T19  |     |     |     |     |     |     |     |     |     |      |      |      |      |      |      |      |      |      |  X   |


## Doel

Het doel is hierbij om te kijken of de website voldoet aan alle eisen van de klant. In dit geval zijn er functionele en niet functionele vereisten bijna helemaal vervult. Deze omvatten frontend en backend componenten. Waarbij de functionaliteit en gebruikerservaring wordt getest.

## Test plan

Elk functionele en niet-functionele requirement wordt toegewezen aan specifieke tests. De tests worden zowel handmatig en
geautomatiseerd uitgevoerd met behulp van HTTP-requests in Webstorm.

**_**Getest op: 17-10-2024 12 uur.**_**

## Functionele Requirements Test Plan

1. **Testcase T1: Weergave van veilingproducten**
    - **Doel**: Controleren of alle veilingen worden weergeven.
    - **Testvereisten**: F1
    - **Teststappen**:
        1. Ga naar http:://localhost:5173/
        2. Kijk of je een lijst met veilingen ziet.
    - **Verwacht resultaat**: De lijst met veilingproducten is zichtbaar en correct.

2. **Testcase T2: Productdetails**
    - **Doel**: Controleren of de productdetails worden weergeven.
    - **Testvereisten**: F2
    - **Teststappen**:
        1. Klik op een veiling.
        2. Controleer of de productdetails worden weergegeven, inclusief naam, prijs en bieders.
    - **Verwacht resultaat**: Productdetails worden correct weergegeven.

3. **Testcase T3: Zoekfunctionaliteit**
    - **Doel**: Check of de zoekfunctionaliteit correct werkt.
    - **Testvereisten**: F3
    - **Teststappen**:
        1. Voer een zoekterm in het zoekveld in de homepagina (http:://localhost:5173/).
        2. Controleer of de resultaten overeenkomen met de zoekterm.
    - **Verwacht resultaat**: Check of de waardes overeenkomen met het zoekterm.

4. **Testcase T4: Permanentie van biedingen**
    - **Doel**: Check of een bod niet kan worden verwijderd of aangepast.
    - **Testvereisten**: F4
    - **Teststappen**:
        1. Plaats een bod.
        2. Je kunt geen optie zien om je geplaatste bod te verwijderen.
    - **Verwacht resultaat**: Het bod kan niet worden verwijderd of aangepast.

5. **Testcase T5: Client-side validatie**
    - **Doel**: Check of client-side validatie correct werkt.
    - **Testvereisten**: F5
    - **Teststappen**:
        1. Ga naar een veiling en probeer een bod te plaatsen.
        2. Vul een lager bedrag in dan het hoogste bod en klik op 'plaats bod'.
        3. Controleer of er een foutmelding verschijnt.
    - **Verwacht resultaat**: De client-side validatie voorkomt dat ongeldige gegevens worden verzonden.

6. **Testcase T6: Server-side validatie**
    - **Doel**: Check of server-side validatie correct werkt.
    - **Testvereisten**: F6
    - **Teststappen**:
        1. Probeer een game toe te voegen in postman met onderstaande fields en URL.
        URL: http://localhost:3000/games
        Fields:
           {
           "title": "Nieuw Game Titel",
           "publisher": "Game Uitgever",
           "genre": "Actie",
           "price": 4999
           }
        2. Controleer of de server een foutmelding teruggeeft.
    - **Verwacht resultaat**: De server geeft een fout terug, 'missing required fields'.

7. **Testcase T7: Filters op attributen**
    - **Doel**: Check of de filters werken op de homepagina.
    - **Testvereisten**: F7
    - **Teststappen**:
        1. Pas filters toe op de homepagina zoals prijs, genre, etc.
        2. Controleer of de gefilterde lijst correct wordt bijgewerkt.
    - **Verwacht resultaat**: Na het filteren worden enkel veilingen getoond met de gekozen attributen.

8. **Testcase T8: Realtime biedingsupdates**
    - **Doel**: Check of de biedingenlijst realtime wordt bijgewerkt.
    - **Testvereisten**: F8
    - **Teststappen**:
        1. Open een productpagina.
        2. Plaats een bod vanaf een ander account.
        3. Controleer of het bod realtime wordt bijgewerkt.
    - **Verwacht resultaat**: Deze wordt niet in realtime geupdated.

9. **Testcase T9: Bidder rol**
    - **Doel**: Check of alleen gebruikers met een 'user' rol kunnen bieden.
    - **Testvereisten**: F9
    - **Teststappen**:
        1. Log in als admin.
        2. Probeer een bod te plaatsen.
    - **Verwacht resultaat**: Er komt een foutmelding dat je niet mag bieden als admin.

10. **Testcase T10: Admin rol voor veilingenbeheer**
    - **Doel**: Check of alleen admins in de admin paneel kan om veilingen te beheren.
    - **Testvereisten**: F10
    - **Teststappen**:
        1. Log in als gebruiker.
        2. Ga naar http:://localhost:5173/admin
    - **Verwacht resultaat**: Je krijgt een foutmelding dat enkel admins toegang hebben.

## Niet-Functionele Requirements Test Plan

1. **Testcase T1: Valid JSON-responsen**
    - **Doel**: Check of de API JSON-objecten teruggeeft.
    - **Testvereisten**: NF1
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games in Postman.
        2. Controleer of de respons een geldig JSON-object is.
    - **Verwacht resultaat**: De API retourneert een JSON-object.

2. **Testcase T2: Correcte HTTP-statuscodes**
    - **Doel**: Check of de API correcte HTTP-statuscodes retourneert.
    - **Testvereisten**: NF2
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games/999 in Postman.
    - **Verwacht resultaat**: Je zult een status code ontvangen van 404 omdat de game niet bestaat. Wat juist is.

3. **Testcase T3: Correct gebruik van HTTP-methoden**
    - **Doel**: Check of de juiste HTTP-methoden (GET, POST, PUT, DELETE) worden gebruikt.
    - **Testvereisten**: NF3
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games/5 in Postman met GET.
    - **Verwacht resultaat**: Je zult zien dat je de game met id 5 krijgt met de GET methode.

4. **Testcase T4: ReST Level 3 Implementatie**
    - **Doel**: Check of je de API voldoet aan ReST Level 3.
    - **Testvereisten**: NF4
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games in Postman en controleer of de API voldoet aan ReST Level 3.
    - **Verwacht resultaat**: De API voldoet aan ReST Level 3.

5. **Testcase T5: Query Parameters for Filtering**
    - **Doel**: Check of de API gebruik maakt van query parameters voor filtering.
    - **Testvereisten**: NF5
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games?category=racing in Postman.
      2. Controleer of de resultaten correct gefilterd worden.
    - **Verwacht resultaat**: De gefilterde resultaten worden correct geretourneerd met query parameters.

6. **Testcase T6: Query Parameters for Sorting**
    - **Doel**: Check of de API gebruik maakt van query parameters voor sorteren.
    - **Testvereisten**: NF6
    - **Teststappen**:
        1. Verstuur een API-verzoek
           http://localhost:3000/games?startPrice=60
              in Postman.
            2. Controleer of de resultaten correct gesorteerd worden.
    - **Verwacht resultaat**: De gesorteerde resultaten worden correct geretourneerd met query parameters.

7. **Testcase T7: Query Parameters for Limiting Results**
    - **Doel**: Controleer of de API gebruik maakt van query parameters om het aantal resultaten te beperken.
    - **Testvereisten**: NF7
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games?category=racing in Postman.
        2. Controleer of de resultaten correct gefilterd worden.
    - **Verwacht resultaat**: De resultaten worden correct gelimiteerd met query parameters.

8. **Testcase T8: Beschrijvende Foutmeldingen**
    - **Doel**: Check of de backend en frontend duidelijke foutmelding teruggeven.
    - **Testvereisten**: NF8
    - **Teststappen**:
        1. Probeer een bod toe te voegen in postman met onderstaande fields en URL.
           URL: http://localhost:3000/games/1/bids
           Fields:
           {
           "bidAmount": 20
           }
    - **Verwacht resultaat**: De foutmelding geeft aan wat je fout doet. In dit geval dus dat je een te lage bod probeert te plaatsen.
9. **Testcase T9: Separation of Concerns (Frontend en Backend)**
    - **Doel**: Check of de frontend en backend goed gescheiden zijn.
    - **Testvereisten**: NF9
    - **Teststappen**:
        1. De directories zijn als client (frontend) en server (backend) gescheiden.
    - **Verwacht resultaat**: De frontend en backend zijn goed gescheiden en communiceren via API.

10. **Testcase T10: Goede en Slechte Weer Tests voor de API**
    - **Doel**: Check of er Bad en Good weather tests zijn
    - **Testvereisten**: NF10
    - **Teststappen**:
        1. Ga in de directory naar MustafaDemir-auctionSite/tests/rest/HTTP-Requests/allTestsIn1.http
      2. Klik op de rechtermuisknop en selecteer 'Run all tests'.
    - **Verwacht resultaat**: Er zijn good en bad weather testen aanwezig.

11. **Testcase T11: Documentatie van Testplannen en Resultaten**
    - **Doel**: Check of de testdocumentatie compleet en aanwezig is.
    - **Testvereisten**: NF11
    - **Teststappen**:
        1. Ga naar MustafaDemir-auctionSite/documentation/testing.md 
      2. Controleer of de testplannen en resultaten zijn gedocumenteerd.
    - **Verwacht resultaat**: De documentatie is compleet en beschrijft alle uitgevoerde tests.

12. **Testcase T12: Automatisch Ingelogd na Registratie**
    - **Doel**: Check of de gebruiker niet nogmaals hoeft te inloggen na het registreren.
    - **Testvereisten**: NF12
    - **Teststappen**:
        1. Ga via naar de homepagina
      2. Klik op login rechtsboven
        3. Klik op registeren
         4. Vul de credentials in en klik op registeren
    - **Verwacht resultaat**: De gebruiker wordt automatisch ingelogd en gaat gelijk naar de veilingen pagina en ziet rechtsboven zijn mailadres.

13. **Testcase T13: Gebruik van Svelte voor de Frontend**
    - **Doel**: Check of de frontend gebouwd is met Svelte.
    - **Testvereisten**: NF13
    - **Teststappen**:
        1. Bekijk de broncode van de frontend in de client directory.
        2. Controleer of Svelte wordt gebruikt.
    - **Verwacht resultaat**: Svelte is gebruikt om de frontend te bouwen.

14. **Testcase T14: Gebruik van Node.js en Express voor de Backend**
    - **Doel**: Check of de backend gebouwd is met Express.js.
    - **Testvereisten**: NF14
    - **Teststappen**:
        1. Bekijk de broncode van de backend in de server directory.
        2. Controleer of Node.js en Express worden gebruikt.
    - **Verwacht resultaat**: Express.js is gebruikt om de backend te bouwen.

15. **Testcase T15: Herbruikbare Componenten in de Frontend**
    - **Doel**: Check of de frontend herbruikbare componenten bevat.
    - **Testvereisten**: NF15
    - **Teststappen**:
        1. Bekijk de broncode van de frontend in de client directory.
        2. Je zult zien dat als voorbeeld de searchbar component meerdere keren wordt gebruikt in andere componenten.
    - **Verwacht resultaat**: De componenten zijn herbruikbaar en worden meerdere keren gebruikt.

16. **Testcase T16: Gebruik van JWT voor Authenticatie**
    - **Doel**: Check of er JTW wordt gebruikt voor authenticatie.
    - **Testvereisten**: NF16
    - **Teststappen**:
        1. Verstuur een API-verzoek http://localhost:3000/games/2/bids in Postman.
        2. Check wat je terugkrijgt zonder token.
    - **Verwacht resultaat**: Zonder token krijg je een foutmelding dat je geen token hebt of dat je token is expired.

17. **Testcase T17: Gebruik van Bcrypt voor Wachtwoord Hashing**
    - **Doel**: Check of wachtwoorden worden gehasht met Bcrypt.
    - **Testvereisten**: NF17
    - **Teststappen**:
    1. Verstuur een API-verzoek http://localhost:3000/users/register in Postman.
    2. Check in de JSON-object wat je wachtwoord is.
    - **Verwacht resultaat**: Je zult zien dat je wachtwoord gehasht is.

18. **Testcase T18: Rol-gebaseerde Authenticatie en Autorisatie**
    - **Doel**: Check of rol-gebaseerde authenticatie en autorisatie werkt.
    - **Testvereisten**: NF18
    - **Teststappen**:
        1. Log in als admin zonder users-rechten.
        2. Probeer een bod te plaatsen.
    - **Verwacht resultaat**: De toegang wordt geweigerd voor niet-user gebruikers.

19. **Testcase T19: Meerdere Rollen voor Gebruikers**
    - **Doel**: Check of gebruikers meerdere rollen kan hebben.
    - **Testvereisten**: NF19
    - **Teststappen**:
        1. Ga naar MustafaDemir-auctionSite/server/src/data/data.js
        2. Check de users array en controleer of er meerdere rollen zijn.
    - **Verwacht resultaat**: De users hebben of een admin rol of een user rol.

## Test Results
<b> Functionele Requirements </b>

| Test | Resultaat  | Opermkingen                                                            |
|------|------------|------------------------------------------------------------------------|
| T1   | Passed     | Lijst van veilingen worden correct weergegeven.                        |
| T2   | Passed     | Productdetails worden correct weergegeven.                             |
| T3   | Passed     | Zoekfunctie retourneert de juiste resultaten.                          |
| T4   | Passed     | Biedingen kunnen niet worden verwijderd of gewijzigd.                  |
| T5   | Passed     | Client-side validatie geeft correcte foutmeldingen terug.              |
| T6   | Passed     | Server-side validatie geeft correcte foutmeldingen terug.              |
| T7   | Passed     | Filters op attributen werken zoals het hoort.                          |
| T8   | NOT Passed | Realtime biedingsupdates werken NIET zoals verwacht.                   |
| T9   | Passed     | Alleen gebruikers met 'user' rol kunnen bieden.                        |
| T10  | Passed     | Alleen gebruikers met een 'admin' rol kunnen in de admin paneel komen. |

<b> Niet-Functionele Requirements </b>

| Test | Resultaat | Opmerkingen                                                 |
|------|-----------|-------------------------------------------------------------|
| T1   | Passed    | JSON-responsen zijn correct.                                |
| T2   | Passed    | HTTP-statuscodes worden correct teruggegeven.               |
| T3   | Passed    | HTTP-methoden worden juist gebruikt.                        |
| T4   | Passed    | De API voldoet aan ReST Level 3.                            |
| T5   | Passed    | Query parameters worden gebruikt voor het filtering.        |
| T6   | Passed    | Query parameters worden gebruikt voor het sorteren.         |
| T7   | Passed    | Query parameters worden gebruikt voor het limiting.         |
| T8   | Passed    | Foutmeldingen worden correct weergegeven.                   |
| T9   | Passed    | Frontend en backend zijn juist gescheiden.                  |
| T10  | Passed    | GOOD en BAD weather  tests zijn aanwezig.                   |
| T11  | Passed    | Testdocumentatie is volledig en accuraat.                   |
| T12  | Passed    | Gebruikers worden automatisch ingelogd na het registreren.  |
| T13  | Passed    | Svelte wordt gebruikt in de frontend.                       |
| T14  | Passed    | Node.js en Express worden gebruikt in de backend.           |
| T15  | Passed    | Herbruikbare componenten worden gebruikt in de frontend.    |
| T16  | Passed    | JWT wordt correct gebruikt voor authenticatie.              |
| T17  | Passed    | Wachtwoorden worden correct gehasht met Bcrypt.             |
| T18  | Passed    | Rol-gebaseerde authenticatie en autorisatie werken correct. |
| T19  | Passed    | Gebruikers kunnen meerdere rollen hebben.                   |

