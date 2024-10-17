<script>
    import {createEventDispatcher} from 'svelte';

    export let searchedGame = "";
    const dispatch = createEventDispatcher();

    const handleInput = (event) => {
        searchedGame = event.target.value;
        dispatch('search', {searchedGame});
    };
</script>

<div class="hidden w-full lg:flex mt-10 lg:mt-0 items-center justify-center lg:pl-11" id="navbar-with-form">
    <form class="flex items-center max-lg:justify-center lg:w-[80%] lg:ml-auto gap-0">
        <div class="relative w-full lg:w-[75%]">
            <input
                    type="search"
                    id="default-search"
                    bind:value={searchedGame}
                    class="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border
                    border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
                    placeholder="zoek"
                    on:input={handleInput}
            >
        </div>
        <button class="p-1 px-2" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                        d="M21 21L18.5 18.5M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2006 19 15.1937 18.1115 16.6401 16.6736C18.0976 15.2246 19 13.2177 19 11Z"
                        stroke="black" stroke-width="1.6" stroke-linecap="round"></path>
            </svg>
        </button>
    </form>
</div>
