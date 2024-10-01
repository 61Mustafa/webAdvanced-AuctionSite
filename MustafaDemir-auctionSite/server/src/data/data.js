export const games = [
    {
        gameId: 1,
        title: "Resident Evil Village",
        description: "Survival horror game set in a mysterious village.",
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
        description: "Action-packed rogue-like shooter game.",
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
        description: "Epic action RPG set in a post-apocalyptic world.",
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
        description: "Fantasy RPG with an immersive world and deep story.",
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
        description: "Realistic racing simulation game.",
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
        description: "Open-world adventure set in feudal Japan.",
        publisher: "Sony",
        category: "Adventure",
        startingPrice: 69,
        auctionEndDate: "2024-10-29",
        image_path: "/photos/Ghost_of_Tsushima.jpg",
        bids: []
    },
    {
        gameId: 7,
        title: "Sackboy: A Big Adventure",
        description: "Family-friendly platformer game.",
        publisher: "Sony",
        category: "Platformer",
        startingPrice: 49,
        auctionEndDate: "2024-10-20",
        image_path: "/photos/Sackboy_-_A_Big_Adventure_cover_art.jpg",
        bids: []
    },
    {
        gameId: 8,
        title: "Ratchet & Clank: Rift Apart",
        description: "Action-adventure game with fast-paced gameplay.",
        publisher: "Sony",
        category: "Adventure",
        startingPrice: 69,
        auctionEndDate: "2024-09-30",
        image_path: "/photos/Ratchet_&_Clank_-_Rift_Apart.png",
        bids: []
    },
    {
        gameId: 9,
        title: "FIFA 23",
        description: "Popular soccer simulation game.",
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
        description: "First-person shooter with modern warfare setting.",
        publisher: "Activision",
        category: "Shooter",
        startingPrice: 69,
        auctionEndDate: "2024-10-26",
        image_path: "/photos/Call_of_Duty_Modern_Warfare_II_Key_Art.jpg",
        bids: []
    }
];

export const bids = [
    {
        bidId: 1,
        bidAmount: 60,
        bidTime: "2024-09-25T10:00:00Z",
        userId: 1,
        gameId: 1
    },
    {
        bidId: 2,
        bidAmount: 65,
        bidTime: "2024-09-26T12:00:00Z",
        userId: 2,
        gameId: 1
    },
    {
        bidId: 3,
        bidAmount: 72,
        bidTime: "2024-09-27T14:30:00Z",
        userId: 3,
        gameId: 2
    },
    {
        bidId: 4,
        bidAmount: 75,
        bidTime: "2024-09-28T15:00:00Z",
        userId: 4,
        gameId: 2
    },
    {
        bidId: 5,
        bidAmount: 70,
        bidTime: "2024-09-28T17:00:00Z",
        userId: 5,
        gameId: 3
    },
    {
        bidId: 6,
        bidAmount: 85,
        bidTime: "2024-09-29T12:00:00Z",
        userId: 6,
        gameId: 4
    },
    {
        bidId: 7,
        bidAmount: 90,
        bidTime: "2024-09-30T16:00:00Z",
        userId: 7,
        gameId: 4
    },
    {
        bidId: 8,
        bidAmount: 62,
        bidTime: "2024-09-30T14:30:00Z",
        userId: 8,
        gameId: 5
    }
];

export const users = [
    {
        userId: 1,
        username: "john_doe",
        email: "john@example.com",
        password: "$2b$12$mwfv4Kd0vzQdhPTogN0iBuPIfGNzNxA2hAprW2t4L1cfmV9G7xtFS",
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
        password: "hashedpassword2",
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
        password: "hashedpassword3",
        role: "user",
        bids: [] // No bids placed by this user
    },
    ///the password of admin is hashedpassword4 !!!!
    {
        userId: 4,
        username: "admin_user",
        email: "admin@example.com",
        password: "$2b$12$A.c5dY.I3c15RPbCl.k62eazNUS0pg/u7NnHZsiDrYwVXnC9qz3Ay",
        role: "admin",
        bids: [] // Admin user does not place bids
    }
];





