<script>
    export let gameId;
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function handleDelete() {
        const confirmed = window.confirm('Weet je zeker dat je deze game wilt verwijderen?');
        if (confirmed) {
            dispatch('deleteGame', {gameId});
        }
    }
</script>

<button on:click={handleDelete} class="ml-4 text-red-500 hover:text-red-700 font-bold">
    Delete
</button>
