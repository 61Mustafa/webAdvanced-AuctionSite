<script>
    import GameCard from '../components/GameCard.svelte';

    let games = [];

    // Haal games op uit de games.json file
    const fetchGames = async () => {
        try {
            const res = await fetch('/games.json');
            if (!res.ok) {
                throw new Error("Failed to fetch games");
            }
            games = await res.json();
            console.log(games);  // Voeg dit toe om te zien of de data correct wordt opgehaald
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    // Haal de games op zodra het component laadt
    fetchGames();
</script>

<!-- Render de games en geef het image_path door -->
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
</div>

<style>
    .games-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
</style>
