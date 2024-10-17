<script>
    export let bids = [];
</script>

<div class="p-4 border rounded-lg bg-gray-50 shadow-md">
    <h2 class="font-bold text-xl mb-4">Biedingen</h2>
    <ul>
        {#if bids.length > 0}
            {#each bids as bid}
                <li class="mb-2">
                    {bid.username ? bid.username : 'Onbekende gebruiker'}:
                    <b>€{bid.bidAmount}</b>
                </li>
            {/each}
        {:else}
            <li class="text-gray-500">Geen biedingen gevonden.</li>
        {/if}
    </ul>
</div>
