<script>
    import page from "page";
    import {onMount} from "svelte";

    import MainPage from './pages/MainPage.svelte';
    import LoginPage from './pages/LoginPage.svelte';
    import RegisterPage from './pages/RegisterPage.svelte';
    import GameDetails from './pages/GameDetails.svelte';
    import AdminPanel from './pages/AdminPanel.svelte';
    import WonAuctions from "./pages/WonAuctions.svelte";

    let currentPage = null;
    let params = {};


    function mount(component, p = {}) {
        currentPage = component;
        params = p;
    }

    onMount(() => {
        page('/', () => mount(MainPage));
        page('/login', () => mount(LoginPage));
        page('/register', () => mount(RegisterPage));
        page('/games/:id', (context) => {
            console.log("Navigating to game details with ID:", context.params.id);
            mount(GameDetails, {id: context.params.id});
        });
        page('/admin', () => mount(AdminPanel));
        page('/won-auctions', () => {
            console.log('Navigating to won auctions page');
            mount(WonAuctions);
        });
        page();
    });
</script>

<main>
    {#if currentPage}
        <svelte:component this={currentPage} {...params}/>
    {/if}
</main>
