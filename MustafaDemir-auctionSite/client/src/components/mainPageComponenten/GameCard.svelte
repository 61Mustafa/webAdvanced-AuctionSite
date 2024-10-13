<script>
    export let id;
    export let name;
    export let genre;
    export let publisher;
    export let price;
    export let auction_end_date;
    export let image_path;

    import {onMount} from 'svelte';

    const backendUrl = 'http://localhost:3000';
    const defaultImage = 'http://www.placeholder.com/150x150'; // Fallback image

    let timeRemaining = "";
    let interval;

    function calculateTimeRemaining() {
        const endTime = new Date(auction_end_date).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;

        if (timeDiff <= 0) {
            timeRemaining = "Veiling is afgelopen";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Start de timer bij het laden van de component
    onMount(() => {
        calculateTimeRemaining();
        interval = setInterval(calculateTimeRemaining, 1000); // Update elke seconde
    });
</script>

<a href={`/games/${id}`}
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
            <!-- Uitgever sectie, neemt 30% van de breedte -->
            <div class="flex flex-col gap-1 flex-shrink-0 flex-grow-0 basis-[34%]">
                <span class="text-gray-500">Uitgever:</span>
                <span class="font-medium">{publisher}</span>
            </div>

            <!-- Genre sectie, neemt 25% van de breedte -->
            <div class="flex flex-col gap-1 flex-shrink-0 flex-grow-0 basis-[26%]">
                <span class="text-gray-500">Genre:</span>
                <span class="font-medium">{genre}</span>
            </div>

            <!-- Resterende tijd sectie, neemt 45% van de breedte -->
            <div class="flex flex-col gap-1 flex-shrink-0 flex-grow-0 basis-[40%]">
                <span class="text-gray-500">Resterende tijd:</span>
                <span class="font-medium">{timeRemaining}</span> <!-- De tijd op een nieuwe regel -->
            </div>
        </div>


    </div>
</a>
