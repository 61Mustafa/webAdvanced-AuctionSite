<script>
    import EditButton from "./EditButton.svelte";
    import DeleteButton from "./DeleteButton.svelte";
    import {createEventDispatcher} from 'svelte';

    export let gamelist = [];
    let selectedGame = null;
    let showEditForm = false;

    const dispatch = createEventDispatcher();

    function handleEditGame(event) {
        const {gameId} = event.detail;
        selectedGame = gamelist.find(game => game.gameId === gameId);
        showEditForm = true;
    }

    async function handleDeleteGame(event) {
        const {gameId} = event.detail;
        try {
            const response = await fetch(`http://localhost:3000/games/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete game');
            }

            gamelist = gamelist.filter(game => game.gameId !== gameId);
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    }

    async function handleSave() {
        try {
            const response = await fetch(`http://localhost:3000/games/${selectedGame.gameId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedGame),
            });

            if (!response.ok) {
                throw new Error('Failed to update game');
            }

            const updatedGame = await response.json();
            const index = gamelist.findIndex(game => game.gameId === updatedGame.gameId);
            gamelist[index] = updatedGame;
            showEditForm = false;
        } catch (error) {
            console.error('Error updating game:', error);
        }
    }

    function handleCancel() {
        showEditForm = false;
    }
</script>

<table class="min-w-full">
    <thead>
    <tr>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Game ID
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Title
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Starting Price
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Auction End Date
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Actions
        </th>
    </tr>
    </thead>
    <tbody class="bg-white">
    {#each gamelist as game}
        <tr>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{game.gameId}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{game.title}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{game.startingPrice}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{game.auctionEndDate}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="flex space-x-2">
                    <EditButton gameId={game.gameId} on:editGame={handleEditGame}/>
                    <DeleteButton gameId={game.gameId} on:deleteGame={handleDeleteGame}/>
                </div>
            </td>
        </tr>
    {/each}
    </tbody>
</table>

{#if showEditForm}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h3 class="text-xl font-bold mb-4">Edit Game</h3>
            <div class="mb-4">
                <label class="block text-gray-700">Title</label>
                <input type="text" bind:value={selectedGame.title} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Starting Price</label>
                <input type="number" bind:value={selectedGame.startingPrice} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Auction End Date</label>
                <input type="date" bind:value={selectedGame.auctionEndDate} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="flex justify-end">
                <button on:click={handleCancel} class="bg-red-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                <button on:click={handleSave} class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    </div>
{/if}