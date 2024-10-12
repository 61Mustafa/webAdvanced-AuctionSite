<script>
    import page from "page";

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';
    let registrationPromise = null;
    let isRegistering = false;  // Nieuwe boolean om te checken of registratie gestart is

    // Function to trigger user registration
    function registerUser() {
        // Check if passwords match
        if (password !== confirmPassword) {
            errorMessage = 'Wachtwoorden komen niet overeen';
            return;
        }

        // Zet isRegistering naar true om de await block te tonen
        isRegistering = true;

        // Initiate the registration promise to use in the await block
        registrationPromise = fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result && result.message === 'New user created') {
                    // Redirect or handle success
                    page("/");
                } else {
                    // Handle error from server
                    errorMessage = result.message || 'Er ging iets mis';
                    throw new Error(errorMessage);
                }
            })
            .catch(error => {
                console.error('Fout bij het registreren:', error);
                errorMessage = 'Er is een fout opgetreden tijdens de registratie';
                throw error;
            })
            .finally(() => {
                isRegistering = false;
            });
    }
</script>

<section class="bg-gray-200">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Registreer
                </h1>
                <form class="space-y-4 md:space-y-6" on:submit|preventDefault={registerUser}>
                    <div>
                        <label for="username"
                               class="block mb-2 text-sm font-medium text-gray-900">Gebruikersnaam</label>
                        <input type="text" name="username" id="username"
                               bind:value={username}
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               placeholder="Jouw gebruikersnaam" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Je email</label>
                        <input type="email" name="email" id="email"
                               bind:value={email}
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Wachtwoord</label>
                        <input type="password" name="password" id="password"
                               bind:value={password}
                               placeholder="••••••••"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               required>
                    </div>
                    <div>
                        <label for="confirm-password"
                               class="block mb-2 text-sm font-medium text-gray-900">Herhaal wachtwoord</label>
                        <input type="password" name="confirm-password" id="confirm-password"
                               bind:value={confirmPassword}
                               placeholder="••••••••"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               required>
                    </div>

                    {#if errorMessage}
                        <p class="text-red-500">{errorMessage}</p>
                    {/if}

                    <button type="submit"
                            class="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4">
                        Maak een account aan
                    </button>
                    <p class="text-sm font-light text-gray-500">
                        Heb je al een account? <a href="/login" class="font-medium text-primary-600 hover:underline">Log
                        hier in</a>
                    </p>
                </form>

                <!-- Await block only visible when isRegistering is true -->
                {#if isRegistering}
                    {#await registrationPromise}
                        <!-- Loading state -->
                        <p class="text-gray-500">Registreren...</p>
                    {:then result}
                        <!-- Success message -->
                        <p class="text-green-500">Registratie succesvol! Je wordt doorgestuurd...</p>
                    {:catch error}
                        <!-- Error state -->
                        <p class="text-red-500">{errorMessage}</p>
                    {/await}
                {/if}
            </div>
        </div>
    </div>
</section>
