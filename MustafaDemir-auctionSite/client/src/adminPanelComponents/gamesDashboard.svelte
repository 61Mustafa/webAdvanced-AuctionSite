<script>
    import EditForm from './EditForm.svelte';
    import DeleteButton from './DeleteButton.svelte';

    export let gamelist = [];
    let selectedGame = null;
    let showEditForm = false;

    function handleEditGame(game) {
        selectedGame = {...game};
        showEditForm = true;
    }

    function handleSaveGame(event) {
        const updatedGame = event.detail.game;
        const index = gamelist.findIndex(game => game.gameId === updatedGame.gameId);
        gamelist[index] = updatedGame;
        showEditForm = false;
    }

    function handleCancelEdit() {
        showEditForm = false;
    }

    function handleDeleteGame(event) {
        const gameId = event.detail.gameId;
        gamelist = gamelist.filter(game => game.gameId !== gameId);
    }
</script>

<table class="min-w-full">
    <thead>
    <tr>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Game ID
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Titel
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Startprijs
        </th>
        <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
            Einddatum veiling
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
                    <button on:click={() => handleEditGame(game)} class="text-blue-500 hover:text-blue-700 font-bold">
                        Bewerken
                    </button>
                    <DeleteButton gameId={game.gameId} on:deleteGame={handleDeleteGame}/>
                </div>
            </td>
        </tr>
    {/each}
    </tbody>
</table>

{#if showEditForm}
    <EditForm game={selectedGame} showEditForm={showEditForm} on:saveGame={handleSaveGame}
              on:cancel={handleCancelEdit}/>
{/if}