<script>
    import {onMount} from "svelte";
    import page from "page";

    let loggedInUser = null;
    let showDropdown = false;

    // Haal de ingelogde gebruiker op uit localStorage zodra de component wordt geladen
    onMount(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.email) {
            loggedInUser = storedUser.email;  // Stel de email in als de gebruiker is ingelogd
        }
    });

    function logout() {
        // Verwijder token en user-gegevens uit localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        loggedInUser = null;
        page("/login");
    }

    function toggleDropdown() {
        // Toggle de dropdown zichtbaar/onzichtbaar
        showDropdown = !showDropdown;
    }

    function goToWonAuctions() {
        // Navigeer naar de "gewonnen veilingen" pagina
        page('/won-auctions');
    }
</script>

<!-- HTML: Weergave van de gebruiker of login-knop -->
{#if loggedInUser}
    <div class="relative inline-block">
        <!-- Dropdown trigger -->
        <button class="text-md flex text-white bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
                id="user-menu-button" aria-expanded={showDropdown} aria-haspopup="true" on:click={toggleDropdown}>
            <span>{loggedInUser}</span>
            <svg class="w-6 h-6 pl-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <!-- Dropdown content, alleen tonen wanneer showDropdown true is -->
        {#if showDropdown}
            <div class="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-full"
                 role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                   on:click={goToWonAuctions}>
                    Gewonnen veilingen
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
                   on:click={logout}>Log out</a>
            </div>
        {/if}
    </div>
{:else}
    <!-- Als de gebruiker niet is ingelogd, toon een login-knop -->
    <a href="/login"
       class="text-md text-white bg-black hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out">
        Login
    </a>
{/if}
