<script>
    export let bids = [];
    console.log('Bids ontvangen in BidsList:', bids);
</script>

<div class="p-4">
    <h2 class="font-bold text-xl">Bids</h2>
    <ul>
        {#if bids.length > 0}
            {#each bids as bid}
                <li>{bid.username ? bid.username : 'Onbekende gebruiker'}: €{bid.bidAmount}</li>
            {/each}
        {:else}
            <li>Er zijn nog geen biedingen geplaatst.</li>
        {/if}
    </ul>
</div>
