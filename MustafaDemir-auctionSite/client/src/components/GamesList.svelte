<script>
    import GameCard from '../components/GameCard.svelte';

    let games = [];
    export let selectedPrice = "";
    export let selectedPublisher = "";
    export let selectedGenre = "";
    export let searchedGame = "";

    // Fetch the games from the server
    const fetchGames = async () => {
        try {
            let query = [];

            if (searchedGame) query.push(`title=${encodeURIComponent(searchedGame)}`);
            if (selectedGenre) query.push(`category=${encodeURIComponent(selectedGenre)}`);
            if (selectedPublisher) query.push(`publisher=${encodeURIComponent(selectedPublisher)}`);

            if (selectedPrice) query.push(`startPrice=${encodeURIComponent(selectedPrice)}`); // Add price filter

            const queryString = query.length > 0 ? `?${query.join('&')}` : '';
            const res = await fetch(`http://localhost:3000/games${queryString}`);
            if (!res.ok) {
                throw new Error("Failed to fetch games");
            }
            games = await res.json();
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    // Re-fetch the games whenever any filter changes
    $: fetchGames();
</script>

<div class="games-container">
    {#each games as game}
        <GameCard
            name={game.title}
            genre={game.category}
            publisher={game.publisher}
            price={game.startingPrice}
            auction_end_date={game.auctionEndDate}
            image_path={game.image_path}
        />
    {/each}

    {#if games.length === 0}
        <p>Geen games gevonden.</p>
    {/if}
</div>

<style>
    .games-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
</style>
