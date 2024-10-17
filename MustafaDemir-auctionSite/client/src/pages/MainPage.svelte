<script>
    import {onMount} from 'svelte';
    import Games from '../mainPageComponenten/GamesList.svelte';
    import FilterSection from '../mainPageComponenten/FilterSection.svelte';
    import SearchBar from '../commonComponents/SearchBar.svelte';
    import UserDropdown from "../commonComponents/UserDropdown.svelte";
    import Logo from "../commonComponents/Logo.svelte";
    import page from 'page';

    let selectedPrice = "";
    let selectedPublisher = "";
    let selectedGenre = "";
    let searchedGame = "";
    let gamesPromise;
    let loggedInUser = null;

    const fetchGames = async () => {
        let query = [];
        if (searchedGame) query.push(`title=${encodeURIComponent(searchedGame)}`);
        if (selectedGenre) query.push(`category=${encodeURIComponent(selectedGenre)}`);
        if (selectedPublisher) query.push(`publisher=${encodeURIComponent(selectedPublisher)}`);
        if (selectedPrice) query.push(`startPrice=${encodeURIComponent(selectedPrice)}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';

        const response = await fetch(`http://localhost:3000/games${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Failed to fetch games');
        }

        const gamesData = await response.json();
        return gamesData;
    };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            loggedInUser = storedUser.email;
        }

    gamesPromise = fetchGames();

    const handleSearch = () => {
        gamesPromise = fetchGames();
    };

    const handleFilterChange = (event) => {
        selectedPrice = event.detail.selectedPrice;
        selectedPublisher = event.detail.selectedPublisher;
        selectedGenre = event.detail.selectedGenre;
        gamesPromise = fetchGames();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        loggedInUser = null;
        page('/login');
    };

</script>

<div class="container w-full max-w-[1600px] mx-auto">

    <header class="flex justify-between items-center border-b pb-4 mt-12">
        <Logo/>
        <SearchBar bind:searchedGame={searchedGame} on:search={handleSearch}/>

        <UserDropdown/>
    </header>

    <div class="main-content flex">
        <FilterSection bind:selectedPrice={selectedPrice} bind:selectedPublisher={selectedPublisher}
                       bind:selectedGenre={selectedGenre} on:filterChange={handleFilterChange}/>

        <section class="items-flex flex flex-col md:flex-row lg:flex-row gap-5 p-5 w-3/4">
            {#await gamesPromise}
                <p class="text-center text-gray-700">Games worden geladen...</p>
            {:then games}
                {#if games && Array.isArray(games) && games.length > 0}
                    <Games {games}/>
                {:else if games && Array.isArray(games) && games.length === 0}
                    <p class="text-center text-gray-700">Geen games gevonden.</p>
                {:else}
                    <p class="text-center text-red-500">Er ging iets mis bij het laden van de games.</p>
                {/if}
            {:catch error}
                <p class="text-center text-red-500">{error.message}</p>
            {/await}
        </section>
    </div>
</div>