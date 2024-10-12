<script>
    export let gameId;
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('editGame', {gameId});
    }
</script>

<button on:click={handleClick} class="text-blue-500 hover:text-blue-700 font-bold">
    Edit
</button>