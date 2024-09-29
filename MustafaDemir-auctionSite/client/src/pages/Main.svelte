<script>
    import Games from '../components/Games.svelte'; // Hier worden de items geladen
</script>

<div class="container">
    <header>
        <div class="title">
            <h1>Auction Site</h1>
            <p>Subtitle should also be in the header</p>
        </div>
        <div class="login">
            <a href="/login">Login</a>
        </div>
    </header>

    <!-- Zoekbalk -->
    <div class="search-bar">
        <input type="text" placeholder="Search"/>
    </div>

    <!-- Layout met filter en items -->
    <div class="main-content">
        <aside class="filters">
            <h3>Filters</h3>
            <!-- Voeg hier later filteropties toe -->
        </aside>

        <!-- Grid van items -->
        <section class="items-grid">
            <Games/> <!-- Hier renderen we de GameCards -->
        </section>
    </div>
</div>

<style>
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }

    .title h1 {
        margin: 0;
        font-size: 2.5em;
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
        flex-basis: 20%;
        padding: 30px;
    }

    .items-grid {
        flex-basis: 80%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
    }
</style>
