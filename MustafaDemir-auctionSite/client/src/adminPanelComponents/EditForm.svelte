<script>
    import {createEventDispatcher} from 'svelte';
    import {validateDate, validateInteger, validateString} from '../commonComponents/inputValidation.js';

    export let game;
    export let showEditForm = false;

    const dispatch = createEventDispatcher();

    function handleSave() {
        if (!validateInputs()) {
            return;
        }
        dispatch('saveGame', {game});
        resetForm();
    }

    function handleCancel() {
        dispatch('cancel');
        resetForm();
    }

    function validateInputs() {
        if (!validateString(game.title)) {
            alert('Titel moet een niet-lege string zijn.');
            return false;
        }
        if (!validateInteger(parseInt(game.startingPrice))) {
            alert('Startprijs moet een positief geheel getal zijn.');
            return false;
        }
        if (!validateDate(game.auctionEndDate)) {
            alert('Einddatum veiling moet een geldige datum zijn.');
            return false;
        }
        return true;
    }

    function resetForm() {
        showEditForm = false;
    }
</script>

{#if showEditForm}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h3 class="text-xl font-bold mb-4">Game Bewerken</h3>
            <div class="mb-4">
                <label class="block text-gray-700">Titel</label>
                <input type="text" bind:value={game.title} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Startprijs</label>
                <input type="number" bind:value={game.startingPrice} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Einddatum Veiling</label>
                <input type="date" bind:value={game.auctionEndDate} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="flex justify-end">
                <button on:click={handleCancel} class="bg-red-500 text-white px-4 py-2 rounded mr-2">Annuleren</button>
                <button on:click={handleSave} class="bg-blue-500 text-white px-4 py-2 rounded">Opslaan</button>
            </div>
        </div>
    </div>
{/if}