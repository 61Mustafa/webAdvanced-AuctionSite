<script>
    export let images = [];
    const backendUrl = 'http://localhost:3000';
    const defaultImage = 'http://www.placeholder.com/150x150'; // Fallback image

</script>

<div class="flex space-x-2">
    {#if images.length > 0}
        {#each images as image}
            <img
                    src={image.image_path && image.image_path.length > 0 ? `${backendUrl}${image.image_path}` : defaultImage}
            >
        {/each}
    {:else}
        <p>Geen afbeeldingen beschikbaar.</p>
    {/if}
</div>
