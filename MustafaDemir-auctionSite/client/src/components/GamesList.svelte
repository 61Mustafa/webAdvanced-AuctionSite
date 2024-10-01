<script>
    import GameCard from '../components/GameCard.svelte';
    import {Link} from "svelte-routing";

    export let games = [];
</script>


<div class="games-container flex flex-wrap gap-5 justify-center sm:justify-start">
    {#if games.length > 0}
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
    {:else}
        <p class="text-center text-gray-700">Geen games gevonden.</p>
    {/if}
</div>

<style>
    .games-container {
        width: 100%;
    }
</style>

