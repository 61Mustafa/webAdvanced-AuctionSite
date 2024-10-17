<script>
    let wonAuctions = [];
    let totalPayment = 0;
    let userId = JSON.parse(localStorage.getItem('user')).userId; // Get the user ID
    let wonAuctionsPromise;
    let errorMessage = '';
    const backendUrl = 'http://localhost:3000';

    const fetchWonAuctions = async () => {
        try {
            const res = await fetch(`${backendUrl}/won-auctions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            wonAuctions = data.wonAuctions;
            totalPayment = data.totalPayment;
            return data;
        } catch (error) {
            console.error('Error fetching won auctions:', error);
            throw error;
        }
    };
    wonAuctionsPromise = fetchWonAuctions();
</script>
<div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold mb-4">Gewonnen veilingen</h1>

    {#await wonAuctionsPromise}
        <p class="text-gray-700">Gegevens worden geladen...</p>

    {:then data}
        {#if wonAuctions.length === 0}
            <p class="text-gray-500">Je hebt nog geen veilingen gewonnen.</p>
        {:else}
            <div class="flex w-6/12 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each wonAuctions as auction}
                    <div class="border rounded-lg shadow-lg bg-white p-6" style="width: 300px; height: 400px;">
                        <img class="w-full h-48 object-cover rounded-md mb-4"
                             src={auction.image_path ? `${backendUrl}${auction.image_path}` : 'http://www.placeholder.com/150x150'}
                             alt={auction.title}>
                        <h2 class="text-xl font-semibold mb-2">{auction.title}</h2>
                        <p class="text-gray-700 mb-2">Categorie: {auction.category}</p>
                        <p class="text-gray-700 mb-2">Uitgever: {auction.publisher}</p>
                        <p class="text-gray-700 mb-4">Eindprijs:
                            €{auction.highestBid ? auction.highestBid.bidAmount : 'N/A'}</p>
                        <p class="text-gray-500 text-sm">Geëindigd
                            op: {new Date(auction.auctionEndDate).toLocaleDateString()}</p>
                    </div>
                {/each}
            </div>
            <div class="mt-6">
                <h2 class="text-2xl font-bold">Totale betaling: €{totalPayment}</h2>
            </div>
        {/if}

    {:catch error}
        <p class="text-red-500">Fout bij het laden van de gegevens: {error.message}</p>
    {/await}
</div>