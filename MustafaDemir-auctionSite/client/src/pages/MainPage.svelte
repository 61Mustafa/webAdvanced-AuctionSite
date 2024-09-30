<script>
    import Games from '../components/GamesList.svelte';

    import { Link } from "svelte-routing";

    let selectedPrice = "";
    let selectedPublisher = "";
    let selectedGenre = "";
    let searchedGame = "";
</script>

<div class="container">
    <header>
        <div class="title">
            <h1>GameBidz</h1>
        </div>
        <div class="login">
            <Link to="/login">Login</Link>
        </div>
    </header>

    <div class="search-bar">
        <input type="text" placeholder="Search" bind:value={searchedGame}/>
    </div>

    <div class="main-content">
        <aside class="filters">
            <h3>Filters</h3>

            <!-- Prijs Dropdown -->
            <label class="filter-label">Prijs
                <select bind:value={selectedPrice}>
                    <option value="">Games die minder kosten dan</option>
                    <option value="50">50 EUR</option>
                    <option value="60">60 EUR</option>
                    <option value="70">70 EUR</option>
                </select>
            </label>

            <!-- Uitgeverij Dropdown -->
            <label class="filter-label">Uitgeverij
                <select bind:value={selectedPublisher}>
                    <option value="">Kies een uitgeverij</option>
                    <option value="Sony">Sony</option>
                    <option value="Activision">Activision</option>
                    <option value="Electronic Arts">Electronic Arts</option>
                    <option value="Capcom">Capcom</option>
                    <option value="Square Enix">Square Enix</option>
                </select>
            </label>

            <!-- Genre Dropdown -->
            <label class="filter-label">Genre
                <select bind:value={selectedGenre}>
                    <option value="">Kies een genre</option>
                    <option value="Horror">Horror</option>
                    <option value="Shooter">Shooter</option>
                    <option value="RPG">RPG</option>
                    <option value="Racing">Racing</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Sports">Sports</option>
                </select>
            </label>
        </aside>

        <section class="items-grid">
            <!-- Geef de filterwaarden door aan de Games component -->
            <Games {selectedPrice} {selectedPublisher} {selectedGenre} {searchedGame}/>
        </section>
    </div>
</div>
<style>
    .container {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .title h1 {
        margin: 0;
        font-size: 2.5em;
    }

    .login {
        margin-left: auto;
    }

    .login a {
        text-decoration: none;
        font-weight: bold;
    }

    .search-bar {
        margin: 20px 0;
        text-align: center;
    }

    .search-bar input {
        width: 50%;
        padding: 10px;
        font-size: 1.2em;
    }

    .main-content {
        display: flex;
    }

    .filters {
        display: flex;
        flex-direction: column;
        padding: 30px;
        gap: 10px;
    }

    .filter-label {
        display: flex;
        flex-direction: column;
    }

    .filter-label select {
        padding: 8px;
        font-size: 1em;
        margin-top: 5px;
    }

    .items-grid {
        flex-basis: 80%;
        display: flex;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
    }
</style>
