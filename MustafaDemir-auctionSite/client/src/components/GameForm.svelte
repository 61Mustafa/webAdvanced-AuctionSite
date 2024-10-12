<script>
    import {createEventDispatcher} from 'svelte';
    import {writable} from 'svelte/store';

    // Opslag voor formuliergegevens en bewerkingsstatus
    let isEdit = writable(false);
    let game = writable({
        id: null,
        title: '',
        category: '',
        publisher: '',
        startingPrice: ''
    });

    const dispatch = createEventDispatcher();

    function handleSubmit() {
        dispatch('submit', {...$game, isEdit: $isEdit});
        resetForm();
    }

    function resetForm() {
        isEdit.set(false);
        game.set({
            id: null,
            title: '',
            category: '',
            publisher: '',
            startingPrice: ''
        });
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="border p-4 mb-4">
    <div class="mb-2">
        <label class="block mb-1">Titel</label>
        <input type="text" bind:value={$game.title} class="border p-2 w-full" placeholder="Spel titel" required/>
    </div>

    <div class="mb-2">
        <label class="block mb-1">Categorie</label>
        <input type="text" bind:value={$game.category} class="border p-2 w-full" placeholder="Categorie" required/>
    </div>

    <div class="mb-2">
        <label class="block mb-1">Uitgever</label>
        <input type="text" bind:value={$game.publisher} class="border p-2 w-full" placeholder="Uitgever" required/>
    </div>

    <div class="mb-2">
        <label class="block mb-1">Startprijs</label>
        <input type="number" bind:value={$game.startingPrice} class="border p-2 w-full" placeholder="Startprijs"
               required/>
    </div>

    <div class="flex justify-between mt-4">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
            {$isEdit ? 'Bewerk' : 'Voeg toe'} Spel
        </button>
        {#if $isEdit}
            <button type="button" on:click={resetForm} class="bg-gray-500 text-white px-4 py-2 rounded">
                Annuleren
            </button>
        {/if}
    </div>
</form>