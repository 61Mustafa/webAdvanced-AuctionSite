<script>
    import AuctionHeader from '../components/gameDetailComponents/AuctionHeader.svelte';
    import AuctionDescription from '../components/gameDetailComponents/AuctionDescription.svelte';
    import ThumbnailGallery from '../components/gameDetailComponents/ThumbnailGallery.svelte';
    import BidsList from '../components/gameDetailComponents/BidsList.svelte';
    import UsernameDropdownMenu from "../components/UserDropdown.svelte";

    export let id;

    let bidAmount = null; // Variabele om het bodbedrag op te slaan
    let token = localStorage.getItem('token'); // Haal de JWT-token op
    let bids = []; // Biedingenlijst
    let highestBid = 0; // Variabele om het hoogste bod bij te houden

    // Functie om de gamegegevens op te halen
    const fetchGame = async () => {
        try {
            const res = await fetch(`http://localhost:3000/games/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Failed to fetch game data');
            }

            const data = await res.json();
            bids = data.bids || [];

            // Bereken het hoogste bod
            if (bids.length > 0) {
                highestBid = Math.max(...bids.map(bid => bid.bidAmount));
            } else {
                highestBid = data.startingPrice; // Gebruik startprijs als er geen biedingen zijn
            }

            return data;
        } catch (error) {
            console.error('Error fetching game data:', error);
            throw error;
        }
    };

    const fetchBids = async () => {
        try {
            const res = await fetch(`http://localhost:3000/games/${id}/bids`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Failed to fetch bids data');
            }

            bids = await res.json();
            highestBid = Math.max(...bids.map(bid => bid.bidAmount));
        } catch (error) {
            console.error('Error fetching bids data:', error);
            throw error;
        }
    };

    // Functie om een bod te plaatsen
    const placeBid = async () => {

        // Controleer of de gebruiker is ingelogd
        if (!token) {
            alert("Je moet ingelogd zijn om een bod te plaatsen.");
            return;
        }
        // Controleer of het bodbedrag geldig is
        if (!bidAmount || bidAmount <= 0) {
            alert("Vul een geldig bodbedrag in.");
            return;
        }

        // Controleer of het bodbedrag hoger is dan het huidige hoogste bod
        if (bidAmount <= highestBid) {
            alert(`Je bod moet hoger zijn dan het huidige hoogste bod van €${highestBid}.`);
            return;
        }

        // Extract de userId uit de JWT-token
        const payload = JSON.parse(atob(token.split('.')[1])); // Payload uit de JWT-token halen
        const userId = payload.id; // Neem aan dat de 'id' het userId is, pas aan als nodig

        // Genereer automatisch de tijd van het bod
        const bidTime = new Date().toISOString();

        // Stel de bid-data samen die naar de backend gestuurd moet worden
        const bidData = {
            bidAmount,
            bidTime,
            userId, // Stuur de userId mee
        };

        console.log("Sending bid data:", bidData); // Logging om te controleren wat er wordt verstuurd

        try {
            const res = await fetch(`http://localhost:3000/games/${id}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Voeg de Bearer token toe voor authenticatie
                },
                body: JSON.stringify(bidData),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                console.error("Server response:", errorResponse); // Log de serverresponse
                throw new Error(errorResponse.message || 'Failed to place bid');
            }

            const result = await res.json();
            bids.push(result.bid); // Voeg de nieuwe bieding toe aan de lijst
            highestBid = result.bid.bidAmount; // Werk het hoogste bod bij
            bidAmount = null; // Reset het bodveld
            let bidsPromise = fetchBids(); // Fetch de biedingenlijst direct
        } catch (error) {
            console.error('Error placing bid:', error); // Log de volledige fout
            alert(error.message);
        }
    };

    let gameDetailsPromise = fetchGame(); // Ophaal gamegegevens direct

</script>

<div class="bg-white min-h-screen p-8">
    {#await gameDetailsPromise}
        <p class="text-center text-gray-700">Productgegevens worden geladen...</p>
    {:then gameDetails}
        <!-- Header met titel en "RB"-pictogram -->
        <div class="flex justify-between items-center border-b pb-4 mb-8">
            <div>
                <AuctionHeader title={gameDetails.title}/>
            </div>
            <UsernameDropdownMenu/>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Afbeelding sectie met thumbnails -->
            <div class="col-span-1 flex justify-center">
                <div class="border rounded-lg shadow-md bg-white w-auto h-auto">
                    <ThumbnailGallery images={[{ image_path: gameDetails.image_path }]}/>
                </div>
            </div>

            <!-- Beschrijvingssectie -->
            <div class="col-span-1">
                <div class="border rounded-lg p-6 bg-gray-50 shadow-md">
                    <AuctionDescription description={gameDetails.description || 'Geen beschrijving beschikbaar'}/>
                </div>
            </div>


            <!-- Biedingssectie -->
            <div class="col-span-1">
                <div class="border rounded-lg p-6 bg-gray-50 shadow-md">
                    <h1 class="text-2xl font-semibold mb-2 text-gray-800">Startprijs:
                        <b>€{gameDetails.startingPrice || 'Prijs niet beschikbaar'}</b></h1>
                    <h2 class="text-xl mb-2">Huidige hoogste bod: €{highestBid}</h2>
                    <BidsList bids={bids}/>
                </div>
                <div class="mt-6">
                    <input class="w-full border rounded-lg p-3 text-lg" placeholder="Vul je bod in" type="number"
                           bind:value={bidAmount}>
                </div>
                <button on:click={placeBid}
                        class="bg-black text-white font-semibold w-full px-5 py-3 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-300">
                    Plaats een bod
                </button>
            </div>
        </div>

    {:catch error}
        <p class="text-red-500">Er is een fout opgetreden bij het laden van de productgegevens: {error.message}</p>
    {/await}
</div>
