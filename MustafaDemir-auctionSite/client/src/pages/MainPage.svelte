<script>
    import {Link} from 'svelte-routing';
    import Games from '../components/GamesList.svelte';
    import FilterSection from '../components/FilterSection.svelte';
    import SearchBar from '../components/SearchBar.svelte';

    let selectedPrice = "";
    let selectedPublisher = "";
    let selectedGenre = "";
    let searchedGame = "";
    let games = [];

    const fetchGames = async () => {
        try {
            let query = [];

            if (searchedGame) query.push(`title=${encodeURIComponent(searchedGame)}`);
            if (selectedGenre) query.push(`category=${encodeURIComponent(selectedGenre)}`);
            if (selectedPublisher) query.push(`publisher=${encodeURIComponent(selectedPublisher)}`);
            if (selectedPrice) query.push(`startPrice=${encodeURIComponent(selectedPrice)}`);

            const queryString = query.length > 0 ? `?${query.join('&')}` : '';
            const res = await fetch(`http://localhost:3000/games${queryString}`);

            if (!res.ok) {
                throw new Error('Failed to fetch games');
            }

            const fetchedGames = await res.json();
            games = fetchedGames.length > 0 ? fetchedGames : [];
        } catch (error) {
            console.error('Error fetching games:', error);
            games = [];
        }
    };

    const handleSearch = () => {
        fetchGames();
    };

    $: if (selectedPrice || selectedPublisher || selectedGenre || searchedGame) {
        fetchGames();
    }
    fetchGames();
</script>

<div class="container w-full max-w-[1600px] mx-auto">
    <header class="flex justify-between items-center p-5">
        <h1 class="text-4xl font-extrabold text-center text-gray-900 tracking-tight">GAMEBIDZ</h1>
        <SearchBar bind:searchedGame={searchedGame} on:search={handleSearch}/>
        <Link to="/login"
              class="text-md text-white bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out">
            Login
        </Link>
    </header>

    <div class="main-content flex">
        <FilterSection bind:selectedPrice={selectedPrice} bind:selectedPublisher={selectedPublisher}
                       bind:selectedGenre={selectedGenre}/>
        <section class="items-flex flex flex-col md:flex-row lg:flex-row gap-5 p-5 w-3/4">
            <Games {games}/>
        </section>
    </div>
</div>