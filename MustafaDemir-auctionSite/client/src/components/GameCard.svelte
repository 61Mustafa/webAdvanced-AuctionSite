<script>
    import {Link} from "svelte-routing";

    export let name;
    export let genre;
    export let publisher;
    export let price;
    export let auction_end_date;
    export let image_path;

    const backendUrl = 'http://localhost:3000';
    const defaultImage = 'http://www.placeholder.com/150x150'; // Fallback image
</script>


<a href="#"
   class="block rounded-lg shadow-sm shadow-indigo-100 h-100 w-full sm:w-80 hover:shadow-lg transition-shadow duration-200">
    <div class="h-4/5">
        <img
                alt={name}
                src={image_path ? `${backendUrl}${image_path}` : defaultImage}
                class="w-full h-full rounded-t-lg object-cover"
        />
    </div>

    <div class="h-1/5 p-4 bg-white rounded-b-lg flex flex-col justify-between">
        <dl class="flex justify-between text-sm text-gray-500">
            <div>
                <dt class="sr-only">Prijs</dt>
                <strong>
                    <dd>€{price}</dd>
                </strong>
            </div>
            <div>
                <dt class="sr-only">Naam</dt>
                <dd class="font-medium">{name}</dd>
            </div>
        </dl>

        <div class="flex items-center justify-between text-xs mt-2">
            <div class="flex items-center gap-2">
                <svg
                        class="h-5 w-5 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                </svg>
                <span class="text-gray-500">Uitgever: <span class="font-medium">{publisher}</span></span>
            </div>

            <div class="flex items-center gap-2 pl-2">
                <svg
                        class="h-5 w-5 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                </svg>
                <span class="text-gray-500">Genre: <span class="font-medium">{genre}</span></span>
            </div>

            <div class="flex items-center gap-2 pl-5">
                <svg
                        class="h-5 w-5 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                >
                    <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
                <span class="text-gray-500">Einddatum: <span class="font-medium">{auction_end_date}</span></span>
            </div>
        </div>
    </div>
</a>
