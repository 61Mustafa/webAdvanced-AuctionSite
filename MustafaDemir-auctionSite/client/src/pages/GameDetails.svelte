<script>
    import AuctionHeader from '../gameDetailComponents/AuctionHeader.svelte';
    import AuctionDescription from '../gameDetailComponents/AuctionDescription.svelte';
    import ThumbnailGallery from '../gameDetailComponents/ThumbnailGallery.svelte';
    import BidsList from '../gameDetailComponents/BidsList.svelte';
    import UsernameDropdownMenu from "../commonComponents/UserDropdown.svelte";
    import Logo from "../commonComponents/Logo.svelte";
    import {validateBidAmount} from "../commonComponents/inputValidation.js";

    export let id;

    let bidAmount = null;
    let token = localStorage.getItem('token');
    let bids = [];
    let highestBid = 0;
    let gameDetailsPromise;
    let bidsPromise;


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


            if (bids.length > 0) {
                highestBid = Math.max(...bids.map(bid => bid.bidAmount));
            } else {
                highestBid = data.startingPrice;
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


            const data = await res.json();
            bids = data || [];
            if (bids.length === 0)
                highestBid = Math.max(...bids.map(bid => bid.bidAmount));
            return bids;
        } catch (error) {
            console.error('Error fetching bids data:', error);
            return [];
        }
    };


    const placeBid = async () => {


        if (!token) {
            alert("Je moet ingelogd zijn om een bod te plaatsen.");
            return;
        }



        if (!validateBidAmount(bidAmount)) {
            alert("Vul een geldig bodbedrag in.");
            return;
        }


        if (bidAmount <= highestBid) {
            alert(`Je bod moet hoger zijn dan het huidige hoogste bod van €${highestBid}.`);
            return;
        }


        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;


        const bidTime = new Date().toISOString();


        const bidData = {
            bidAmount,
            bidTime,
            userId,
        };

        console.log("Sending bid data:", bidData);

        try {
            const res = await fetch(`http://localhost:3000/games/${id}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bidData),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                console.error("Server response:", errorResponse);
                throw new Error(errorResponse.message || 'Failed to place bid');
            }
            const result = await res.json();
            bids.push(result.bid);
            highestBid = result.bid.bidAmount;
            bidAmount = null;


            bidsPromise = fetchBids();
        } catch (error) {
            console.error('Error placing bid:', error);
            alert(error.message);
        }
    };

    gameDetailsPromise = fetchGame();
    $: bidsPromise = fetchBids();
</script>

<div class="bg-white min-h-screen p-8">
    {#await gameDetailsPromise}
        <p class="text-center text-gray-700">Productgegevens worden geladen...</p>
    {:then gameDetails}
        <div class="flex justify-between items-center border-b pb-4 mb-8">
            <div>
                <Logo/>
            </div>
            <div>
                <AuctionHeader title={gameDetails.title}/>
            </div>
            <UsernameDropdownMenu/>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="col-span-1 flex justify-center">
                <div class="border rounded-lg shadow-md bg-white w-auto h-auto">
                    <ThumbnailGallery images={[{ image_path: gameDetails.image_path }]}/>
                </div>
            </div>

            <div class="col-span-1">
                <div class="border rounded-lg p-6 bg-gray-50 shadow-md">
                    <AuctionDescription description={gameDetails.description || 'Geen beschrijving beschikbaar'}/>
                </div>
            </div>


            {#await bidsPromise}
                <p class="text-center text-gray-700">Biedingen worden geladen...</p>
            {:then bids}
                <div class="col-span-1">
                    <div class="border rounded-lg p-6 bg-gray-50 shadow-md">
                        <h1 class="text-2xl font-semibold mb-2 text-gray-800">Startprijs:
                            <b>€{gameDetails.startingPrice || 'Prijs niet beschikbaar'}</b></h1>
                        <h2 class="text-xl mb-2">Huidige hoogste bod: €{highestBid}</h2>

                        {#if bids.length > 0}
                            <BidsList bids={bids}/>
                        {:else}
                            <div class="p-4 border rounded-lg bg-gray-50 shadow-md">
                                <h2 class="font-bold text-xl">Geen biedingen gevonden</h2>
                            </div>
                        {/if}
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
            {:catch error}
                <div class="col-span-1">
                    <div class="border rounded-lg p-6 bg-gray-50 shadow-md">
                        <h1 class="text-2xl font-semibold mb-2 text-gray-800">Startprijs:
                            <b>€{gameDetails.startingPrice || 'Prijs niet beschikbaar'}</b></h1>
                        <h2 class="text-xl mb-2">Huidige hoogste bod: €{highestBid}</h2>
                        <div class="p-4 border rounded-lg bg-gray-50 shadow-md">
                            <h2 class="font-bold text-xl">Geen biedingen gevonden</h2>
                        </div>
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
            {/await}
        </div>

    {:catch error}
        <p class="text-red-500">Er is een fout opgetreden bij het laden van de productgegevens: {error.message}</p>
    {/await}
</div>