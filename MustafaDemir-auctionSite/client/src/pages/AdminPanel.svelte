<script>
    import AddButton from "../components/adminPanelComponents/AddButton.svelte";
    import Dashboard from "../components/adminPanelComponents/gamesDashboard.svelte";
    import SearchBar from "../components/commonComponents/SearchBar.svelte";
    import {onMount} from "svelte";

    let gamelist = [];
    let showAddGameForm = false;
    let newGame = {
        title: '',
        description: '',
        publisher: '',
        category: '',
        startingPrice: '',
        auctionEndDate: ''
    };
    let searchedGame = "";  // Search term
    let isAdmin = false;
    let tokenValid = false;
    let gamePromise;

    // Functie om de token te controleren en te valideren
    const checkAdminRole = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Geen token gevonden, dus geen toegang
            return Promise.reject('Geen toegang: Je bent niet ingelogd');
        }

        try {
            // Decodeer de JWT-token
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('Decoded token payload:', payload);

            // Controleer of de gebruiker een admin is
            if (payload.role === 'admin') {
                isAdmin = true;
                tokenValid = true;
            } else {
                throw new Error('Geen toegang: Je bent geen admin');
            }
        } catch (error) {
            console.error('Error checking admin role:', error);
            throw error;
        }
    };

    // Functie om de lijst met games op te halen
    const fetchGames = async () => {
        let query = [];

        if (searchedGame) query.push(`title=${encodeURIComponent(searchedGame)}`);

        const queryString = query.length > 0 ? `?${query.join('&')}` : '';
        console.log('Fetching games from URL: ', `http://localhost:3000/games${queryString}`);

        try {
            const res = await fetch(`http://localhost:3000/games${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Failed to fetch games data');
            }

            gamelist = await res.json();
        } catch (error) {
            console.error('Error fetching games data:', error);
        }
    };

    const addGame = async () => {
        try {
            // Log om te zien of het nieuwe spel correct wordt gestuurd
            console.log('New game data: ', newGame);

            const res = await fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGame),
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.message || 'Failed to add game');
            }

            // Wacht op de respons en voeg de nieuwe game toe aan de gamelist
            const addedGame = await res.json();
            console.log('Added game response:', addedGame);

            // Zorg ervoor dat de game-lijst wordt bijgewerkt
            gamelist = [...gamelist, addedGame];

            // Reset het formulier
            showAddGameForm = false;
            newGame = {
                title: '',
                description: '',
                publisher: '',
                category: '',
                startingPrice: '',
                auctionEndDate: ''
            };

            // Ververs de lijst om zeker te zijn dat alles klopt
            await fetchGames();
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    onMount(() => {
        // Eerst token controleren, daarna de games ophalen
        gamePromise = checkAdminRole()
            .then(() => fetchGames())
            .catch((error) => {
                console.error(error);
                tokenValid = false;
            });
    });

    function handleOpenAddForm() {
        showAddGameForm = true;
    }

    function handleAddGameClose() {
        showAddGameForm = false;
    }

    function handleSearch() {
        fetchGames();  // Update the games based on the search term
    }
</script>

<main class="container mx-auto p-4">
    <!-- Wacht tot de token validatie is voltooid -->
    {#await gamePromise}
        <p>Bezig met het controleren van toegang...</p>
    {:then games}
        {#if isAdmin}
            <!-- Search Bar -->
            <SearchBar bind:searchedGame={searchedGame} on:search={handleSearch}/>

            <!-- Add Button and Add Game Form -->
            <div class="flex justify-end mt-4 mr-48">
                <AddButton label="Add Game" on:openAddForm={handleOpenAddForm}/>
            </div>

            {#if showAddGameForm}
                <div class="mt-4 p-4 bg-gray-100 border rounded-md shadow-lg">
                    <h3 class="text-xl font-bold mb-4">Add New Game</h3>
                    <div class="mb-4">
                        <label class="block text-gray-700">Title</label>
                        <input type="text" bind:value={newGame.title} class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Description</label>
                        <input type="text" bind:value={newGame.description} class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Publisher</label>
                        <input type="text" bind:value={newGame.publisher} class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Category</label>
                        <input type="text" bind:value={newGame.category} class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Starting Price</label>
                        <input type="number" bind:value={newGame.startingPrice}
                               class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700">Auction End Date</label>
                        <input type="date" bind:value={newGame.auctionEndDate} class="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div class="flex justify-end">
                        <button on:click={handleAddGameClose} class="bg-red-500 text-white px-4 py-2 rounded mr-2">
                            Cancel
                        </button>
                        <button on:click={addGame} class="bg-blue-500 text-white px-4 py-2 rounded">Add Game</button>
                    </div>
                </div>
            {/if}

            <!-- Dashboard Container -->
            <div class="mt-8 max-w-screen-2xl">
                <div class="bg-white p-6 border border-gray-200 rounded-lg shadow-md max-w-6xl mx-auto">
                    <Dashboard {gamelist}/>
                </div>
            </div>
        {:else}
            <p class="text-red-500">Je hebt geen toestemming om deze pagina te bekijken.</p>
        {/if}
    {:catch error}
    <p class="text-red-500">Er is een fout opgetreden: {error}</p>
    {/await}
</main>
