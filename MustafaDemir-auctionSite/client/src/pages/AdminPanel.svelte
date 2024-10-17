<script>
    import AddForm from "../adminPanelComponents/AddForm.svelte";
    import Dashboard from "../adminPanelComponents/gamesDashboard.svelte";
    import SearchBar from "../commonComponents/SearchBar.svelte";
    import UserDropdown from "../commonComponents/UserDropdown.svelte";
    import {checkAdminRole} from "../commonComponents/auth.js";

    let gamelist = [];
    let newGame = {
        title: '',
        description: '',
        publisher: '',
        category: '',
        startingPrice: '',
        auctionEndDate: ''
    };
    let searchedGame = "";  // Zoekterm
    let isAdmin = false;
    let tokenValid = false;
    let showAddGameForm = false;  // Bepaalt of het AddForm zichtbaar is

    const fetchGames = async () => {
        let query = [];

        if (searchedGame) query.push(`title=${encodeURIComponent(searchedGame)}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        try {
            const res = await fetch(`http://localhost:3000/games${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Kon games niet ophalen');
            }

            const data = await res.json();
            gamelist = data;
        } catch (error) {
            alert('Fout bij het ophalen van games: ' + error.message);
            throw error;
        }
    };

    const addGame = async () => {
        try {
            const res = await fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newGame),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Kon game niet toevoegen');
            }

            const data = await res.json();
            gamelist.push(data);
            showAddGameForm = false;
            gamePromise = fetchGames();
        } catch (error) {
            alert('Fout bij het toevoegen van game: ' + error.message);
            throw error;
        }
    };


    let gamePromise = checkAdminRole()
        .then(() => {
            isAdmin = true;
            tokenValid = true;
            return fetchGames();
        })
        .catch(error => {
            alert('Toegang geweigerd: ' + error.message);
            isAdmin = false;
            tokenValid = false;
        });

    function handleSearch() {
        fetchGames();
    }

    function handleAddGame() {
        addGame();
    }

    function handleAddGameClose() {
        showAddGameForm = false;
    }
</script>

<main class="container mx-auto p-4">
    {#await gamePromise}
        <p>Toegang controleren...</p>
    {:then games}
        {#if isAdmin}
            <nav class="flex justify-between items-center mb-4">
                <SearchBar bind:searchedGame={searchedGame} on:search={handleSearch}/>
                <UserDropdown/>
            </nav>
            <div>
                <button on:click={() => showAddGameForm = true}
                        class="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
                    Game Toevoegen
                </button>
                <AddForm {newGame} {showAddGameForm} on:addGame={handleAddGame} on:close={handleAddGameClose}/>
                <Dashboard {gamelist}/>
            </div>
        {:else}
            <p>Je hebt geen toegang tot deze pagina.</p>
        {/if}
    {:catch error}
        <p class="text-red-500">Fout: {error.message}</p>
    {/await}
</main>