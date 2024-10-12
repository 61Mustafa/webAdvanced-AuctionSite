<script>
    import {onMount} from "svelte";
    import page from "page";

    let email = "";
    let password = "";
    let errorMessage = "";

    function admin_only(context, next) {
        const user = JSON.parse(localStorage.getItem('user')); // Haal de user uit localStorage
        if (!user || user.role !== 'admin') {
            page.redirect('/login'); // Redirect als gebruiker geen admin is of niet ingelogd
        } else {
            next(); // Ga verder naar de route handler als de gebruiker admin is
        }
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form action

        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,  // Ensure this matches what the server expects
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the user data in localStorage or session
                const payload = JSON.parse(atob(data.token.split('.')[1]));
                console.log(payload);

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({
                    id: payload.id,
                    email: payload.email,
                    role: payload.role
                }));


                // Redirect to the appropriate page based on user role
                // Use window.location.href to navigate to admin backend on port 3000
                if (payload.role === "admin") {
                    page("/admin");  // Redirect to the admin backend
                } else {
                    page("/");  // Redirect to the regular frontend page
                }
            } else {
                // Show error message
                errorMessage = data.message;
            }
        } catch (error) {
            errorMessage = "An error occurred. Please try again later.";
        }
    }


</script>

<section class="bg-gray-200">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-4xl font-extrabold text-center text-gray-900 mt-5 tracking-tight">GAMEBIDZ</h1>
                <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in or register
                </h2>

                {#if errorMessage}
                    <p class="text-red-500 text-center">{errorMessage}</p>
                {/if}

                <form class="space-y-6" on:submit={handleSubmit}>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="text" bind:value={email} required
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder="name@company.com">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" bind:value={password} required
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                   placeholder="••••••••">
                        </div>
                    </div>

                    <button type="submit"
                            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Log in
                    </button>
                </form>

                <p class="text-sm font-light text-gray-500">
                    Want to bid on auctions?
                    <a href="/register" class="font-semibold leading-6 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    </div>
</section>
