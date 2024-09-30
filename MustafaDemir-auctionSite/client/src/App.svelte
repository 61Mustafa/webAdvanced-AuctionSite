<script>
    import {Router, Route, Link} from "svelte-routing";  // Importeer de router en route componenten
    import MainPage from './pages/MainPage.svelte';        // Zorg ervoor dat MainPage wordt geïmporteerd
    import LoginPage from './pages/LoginPage.svelte';      // Zorg ervoor dat LoginPage wordt geïmporteerd
</script>

<Router>
    <!-- Definieer je routes -->
    <Route path="/" component={MainPage}/>    <!-- Standaard pagina (MainPage) -->
    <Route path="/login" component={LoginPage}/> <!-- Login pagina (LoginPage) -->
</Router>
