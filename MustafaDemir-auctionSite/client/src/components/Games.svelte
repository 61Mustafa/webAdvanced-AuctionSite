<script>
    import GameCard from '../components/GameCard.svelte';

    let games = [];
    export let selectedPrice = "";
    export let selectedPublisher = "";
    export let selectedGenre = "";
    export let searchedGame = "";

    // Haal de games op van de server
    const fetchGames = async () => {
        try {
            let query = [];

            if (searchedGame) query.push(`name=${encodeURIComponent(searchedGame)}`);
            if (selectedGenre) query.push(`genre=${encodeURIComponent(selectedGenre)}`);
            if (selectedPublisher) query.push(`publisher=${encodeURIComponent(selectedPublisher)}`);

            if (selectedPrice) query.push(`price=${encodeURIComponent(selectedPrice)}`); // Voeg prijsfilter toe


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

    // Elke keer als een filter verandert, haal de games opnieuw op
    $: fetchGames();
</script>

<div class="games-container">
    {#each games as game}
        <GameCard
                name={game.name}
                genre={game.genre}
                publisher={game.publisher}
                price={game.price}
                auction_end_date={game.auction_end_date}
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
