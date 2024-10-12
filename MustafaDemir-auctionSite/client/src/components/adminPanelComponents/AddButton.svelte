<script>
    export let label;
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('openAddForm');
    }
</script>

<button on:click={handleClick} class="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
    {label}
</button>
