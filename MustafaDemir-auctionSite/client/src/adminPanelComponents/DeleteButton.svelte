<script>
    import {createEventDispatcher} from 'svelte';

    export let gameId;

    const dispatch = createEventDispatcher();

    function handleDelete() {
        const confirmed = window.confirm('Weet je zeker dat je deze game met ' + {gameId} + ' ID wil verwijderen?');
        if (confirmed) {
            dispatch('deleteGame', {gameId});
        }
    }
</script>

<button on:click={handleDelete} class="ml-4 text-red-500 hover:text-red-700 font-bold">
    Verwijderen
</button>