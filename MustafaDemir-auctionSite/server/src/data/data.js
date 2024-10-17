import bcrypt from "bcryptjs";

export const games = [
    {
        gameId: 1,
        title: "Resident Evil Village",
        description: "Resident Evil Village is een meeslepende survival horror game waarin je een mysterieuze, gevaarlijke wereld verkent. Spelers worden geconfronteerd met angstaanjagende vijanden en moeten overleven met beperkte middelen. De game biedt een dynamische mix van spanning en actie, terwijl je op zoek gaat naar antwoorden in een dorp vol geheimen. Naast de intense gevechten zul je puzzels moeten oplossen en strategieën bedenken om verder te komen. Met verbluffende graphics en een meeslepende verhaallijn is het een van de meest geprezen games in de serie.",
        publisher: "Capcom",
        category: "Horror",
        startingPrice: 59,
        auctionEndDate: "2024-11-04",
        image_path: "/photos/Resident_Evil_Village.png",
        bids: [
            {bidId: 1, bidAmount: 60, bidTime: "2024-09-25T10:00:00Z", userId: 1, gameId: 1},
            {bidId: 2, bidAmount: 65, bidTime: "2024-09-26T12:00:00Z", userId: 2, gameId: 1}
        ]
    },
    {
        gameId: 2,
        title: "Returnal",
        description: "Returnal is een adembenemende rogue-like shooter die je meeneemt naar een vijandige buitenaardse planeet. Elke keer dat je sterft, begin je opnieuw, maar met de mogelijkheid om nieuwe vaardigheden te verwerven en je wapens te verbeteren. De omgevingen zijn prachtig, maar gevaarlijk, en je moet constant alert blijven om te overleven. Met zijn uitdagende gameplay en meeslepende verhaallijn biedt Returnal een unieke game-ervaring waarin elke beslissing telt. De mix van snelle actie en mysterieuze ontdekkingen houdt spelers continu op het puntje van hun stoel.",
        publisher: "Sony",
        category: "Shooter",
        startingPrice: 69,
        auctionEndDate: "2024-11-16",
        image_path: "/photos/Returnal_cover_art.jpg",
        bids: [
            {bidId: 3, bidAmount: 72, bidTime: "2024-09-27T14:30:00Z", userId: 1, gameId: 2},
            {bidId: 4, bidAmount: 75, bidTime: "2024-09-28T15:00:00Z", userId: 2, gameId: 2}
        ]
    },
    {
        gameId: 3,
        title: "Horizon Forbidden West",
        description: "Horizon Forbidden West is een episch actie-avontuur dat zich afspeelt in een prachtige post-apocalyptische wereld. Je speelt als Aloy, een jonge jager, die op zoek gaat naar antwoorden en bedreigingen moet bestrijden die haar wereld kunnen vernietigen. De game biedt een uitgebreide open wereld met verschillende landschappen, van weelderige bossen tot verlaten steden. Met innovatieve gevechtsmechanismen en adembenemende graphics is het een avontuur vol verrassingen en gevaar. Verken ruïnes van oude beschavingen, vecht tegen gigantische machines en ontdek verborgen mysteries.",
        publisher: "Sony",
        category: "RPG",
        startingPrice: 69,
        auctionEndDate: "2024-11-12",
        image_path: "/photos/Horizon_Forbidden_West_cover_art.jpg",
        bids: [
            {bidId: 5, bidAmount: 70, bidTime: "2024-09-28T17:00:00Z", userId: 1, gameId: 3}
        ]
    },
    {
        gameId: 4,
        title: "Final Fantasy XVI",
        description: "Final Fantasy XVI neemt je mee naar een betoverende fantasiewereld vol magie, politiek en intriges. Met een uitgebreide cast van personages en een meeslepend verhaal staat deze RPG bekend om zijn diepgang. De dynamische gevechten en strategische gameplay houden je continu bezig terwijl je je vijanden verslaat en het lot van koninkrijken beïnvloedt. Grafisch indrukwekkend en met een rijke soundtrack biedt deze game een complete ervaring voor zowel nieuwe als doorgewinterde fans van de serie. Bereid je voor op epische veldslagen en onvergetelijke avonturen.",
        publisher: "Square Enix",
        category: "RPG",
        startingPrice: 79,
        auctionEndDate: "2024-11-20",
        image_path: "/photos/Final_Fantasy_XVI_cover_art.png",
        bids: [
            {bidId: 6, bidAmount: 85, bidTime: "2024-09-29T12:00:00Z", userId: 2, gameId: 4},
            {bidId: 7, bidAmount: 90, bidTime: "2024-09-30T16:00:00Z", userId: 1, gameId: 4}
        ]
    },
    {
        gameId: 5,
        title: "Gran Turismo 7",
        description: "Gran Turismo 7 is de ultieme racesimulatie voor liefhebbers van snelheid en precisie. Met honderden auto's en realistische racecircuits biedt deze game een authentieke race-ervaring. Of je nu een casual speler bent of een doorgewinterde racer, er is voor elk wat wils. Je kunt auto's tunen, aanpassen en perfectioneren om je prestaties te optimaliseren op verschillende racebanen. Het spel combineert de spanning van realistische races met de diepgang van autotechniek, wat zorgt voor urenlang speelplezier.",
        publisher: "Sony",
        category: "Racing",
        startingPrice: 59,
        auctionEndDate: "2024-10-19",
        image_path: "/photos/Gran_Turismo_7_cover_art.jpg",
        bids: [
            {bidId: 8, bidAmount: 62, bidTime: "2024-09-30T14:30:00Z", userId: 1, gameId: 5}
        ]
    },
    {
        gameId: 6,
        title: "Ghost of Tsushima",
        description: "Ghost of Tsushima is een open-wereld actie-avontuur dat zich afspeelt in het feodale Japan. Spelers kruipen in de huid van Jin Sakai, een samoerai die zijn eer moet opofferen om zijn land te redden van de Mongoolse invasie. De game biedt prachtige landschappen, van bamboebossen tot besneeuwde bergen, die een ware ode vormen aan het Japan van die tijd. De vechtmechanieken zijn uitdagend en vereisen precisie en strategie om je vijanden te verslaan. Met een meeslepende verhaallijn en adembenemende visuals biedt deze game een onvergetelijke ervaring.",
        publisher: "Sony",
        category: "Adventure",
        startingPrice: 69,
        auctionEndDate: "2023-10-01", // Verleden datum
        image_path: "/photos/Ghost_of_Tsushima.jpg",
        bids: [
            {bidId: 9, bidAmount: 75, bidTime: "2023-09-25T15:00:00Z", userId: 2, gameId: 6},
            {bidId: 10, bidAmount: 80, bidTime: "2023-09-26T16:00:00Z", userId: 3, gameId: 6}
        ]
    },
    {
        gameId: 7,
        title: "Sackboy: A Big Adventure",
        description: "Sackboy: A Big Adventure is een vrolijke en kleurrijke platformer die geschikt is voor het hele gezin. Speel als Sackboy, een schattig figuurtje, terwijl je door fantasierijke werelden navigeert vol puzzels en uitdagingen. De game ondersteunt coöperatief spelen, wat het een perfecte keuze maakt voor samen spelen met vrienden of familie. Met zijn creatieve leveldesign en charmante personages is Sackboy een plezier om te spelen. Het spel biedt uren aan entertainment en een warme, vriendelijke sfeer.",
        publisher: "Sony",
        category: "Platformer",
        startingPrice: 49,
        auctionEndDate: "2023-09-28", // Verleden datum
        image_path: "/photos/Sackboy_-_A_Big_Adventure_cover_art.jpg",
        bids: [
            {bidId: 11, bidAmount: 50, bidTime: "2023-09-27T12:00:00Z", userId: 3, gameId: 7}
        ]
    },
    {
        gameId: 8,
        title: "Ratchet & Clank: Rift Apart",
        description: "Ratchet & Clank: Rift Apart brengt de klassieke franchise naar nieuwe hoogten met verbluffende graphics en innovatieve gameplay. Spelers kunnen door verschillende dimensies reizen, met naadloze overgangen die de spelervaring dynamisch maken. Het spel bevat een breed scala aan wapens en gadgets, wat zorgt voor chaotische en hilarische gevechten. De charmante personages en het humoristische verhaal maken deze game een feest voor zowel nieuwe als terugkerende spelers. Bereid je voor op een avontuur vol actie, spanning en een vleugje humor.",
        publisher: "Sony",
        category: "Adventure",
        startingPrice: 69,
        auctionEndDate: "2023-09-29", // Verleden datum
        image_path: "/photos/Ratchet_&_Clank_-_Rift_Apart.png",
        bids: [
            {bidId: 12, bidAmount: 70, bidTime: "2023-09-28T10:00:00Z", userId: 2, gameId: 8}
        ]
    },
    {
        gameId: 9,
        title: "FIFA 23",
        description: "FIFA 23 is de nieuwste toevoeging aan de populaire voetbalreeks van Electronic Arts. Het spel biedt realistische gameplay, vernieuwde AI, en verbeterde graphics die zorgen voor de ultieme voetbalervaring. Met verschillende spelmodi, waaronder carrièremodus en Ultimate Team, is er genoeg te doen voor elke voetbalfan. Je kunt zowel met vrienden als online spelen tegen tegenstanders van over de hele wereld. FIFA 23 bevat ook bijgewerkte teams en competities, wat de ervaring nog authentieker maakt.",
        publisher: "Electronic Arts",
        category: "Sports",
        startingPrice: 59,
        auctionEndDate: "2024-12-16",
        image_path: "/photos/FIFA_23_Cover.jpg",
        bids: []
    },
    {
        gameId: 10,
        title: "Call of Duty: MW II",
        description: "Call of Duty: Modern Warfare II keert terug met explosieve actie en een meeslepende verhaallijn in een moderne oorlogsomgeving. Spelers ervaren intense veldslagen op realistische slagvelden, waar teamwork en strategie cruciaal zijn. De multiplayer-modus biedt eindeloze mogelijkheden voor competities en samenwerking met vrienden. De graphics zijn verbluffend, met gedetailleerde omgevingen die het gevoel van oorlogsvoering versterken. Met tal van wapens, voertuigen en uitrusting biedt deze game een dynamische en spannende ervaring.",
        publisher: "Activision",
        category: "Shooter",
        startingPrice: 69,
        auctionEndDate: "2024-10-26",
        image_path: "/photos/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg",
        bids: []
    }
];

export const users = [
    {
        userId: 1,
        username: "john_doe",
        email: "john@example.com",
        password: bcrypt.hashSync("hashedpassword1"),
        role : "user",
        bids: [
            {
                bidId: 1,
                bidAmount: 60,
                bidTime: "2024-09-25T10:00:00Z",
                userId: 1,
                gameId: 1
            },
            {
                bidId: 3,
                bidAmount: 72,
                bidTime: "2024-09-27T14:30:00Z",
                userId: 1,
                gameId: 2
            },
            {
                bidId: 5,
                bidAmount: 70,
                bidTime: "2024-09-28T17:00:00Z",
                userId: 1,
                gameId: 3
            },
            {
                bidId: 7,
                bidAmount: 90,
                bidTime: "2024-09-30T16:00:00Z",
                userId: 1,
                gameId: 4
            }
        ]
    },
    {
        userId: 2,
        username: "jane_smith",
        email: "jane@example.com",
        password: bcrypt.hashSync("hashedpassword2"),
        role: "user",
        bids: [
            {
                bidId: 2,
                bidAmount: 65,
                bidTime: "2024-09-26T12:00:00Z",
                userId: 2,
                gameId: 1
            },
            {
                bidId: 4,
                bidAmount: 75,
                bidTime: "2024-09-28T15:00:00Z",
                userId: 2,
                gameId: 2
            }
        ]
    },
    {
        userId: 3,
        username: "emma_jones",
        email: "emma@example.com",
        password: bcrypt.hashSync("hashedpassword3"),
        role: "user",
        bids: []
    },

    {
        userId: 4,
        username: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("hashedpassword4"),
        role: "admin",
        bids: []
    }
];





