<script>
    import {Router, Route} from 'svelte-routing';
    import MainPage from './pages/MainPage.svelte';
    import LoginPage from './pages/LoginPage.svelte';
    import RegisterPage from './pages/RegisterPage.svelte';
    import GameDetails from './pages/GameDetails.svelte';
</script>

<Router>
    <main>
        <Route path="/" component={MainPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/game/:id" component={GameDetails}/>
    </main>
</Router>