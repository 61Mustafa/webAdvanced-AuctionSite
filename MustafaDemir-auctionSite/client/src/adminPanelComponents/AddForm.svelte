<script>
    import {createEventDispatcher} from 'svelte';
    import {validateDate, validateInteger, validateString} from '../commonComponents/inputValidation.js';

    export let newGame;
    export let showAddGameForm = false;

    const dispatch = createEventDispatcher();

    function handleAddGame() {
        if (!validateInputs()) {
            return;
        }
        dispatch('addGame');
        resetForm();
    }

    function handleClose() {
        dispatch('close');
        resetForm();
    }

    function validateInputs() {
        if (!validateString(newGame.title)) {
            alert('Titel moet een niet-lege string zijn.');
            return false;
        }
        if (!validateString(newGame.description)) {
            alert('Beschrijving moet een niet-lege string zijn.');
            return false;
        }
        if (!validateString(newGame.publisher)) {
            alert('Uitgever moet een niet-lege string zijn.');
            return false;
        }
        if (!validateString(newGame.category)) {
            alert('Categorie moet een niet-lege string zijn.');
            return false;
        }
        if (!validateInteger(parseInt(newGame.startingPrice))) {
            alert('Startprijs moet een positief geheel getal zijn.');
            return false;
        }
        if (!validateDate(newGame.auctionEndDate)) {
            alert('Einddatum veiling moet een geldige datum zijn.');
            return false;
        }

        return true;
    }

    function resetForm() {
        newGame.title = '';
        newGame.description = '';
        newGame.publisher = '';
        newGame.category = '';
        newGame.startingPrice = '';
        newGame.auctionEndDate = '';
        showAddGameForm = false;
    }
</script>

{#if showAddGameForm}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h3 class="text-xl font-bold mb-4">Nieuwe Game Toevoegen</h3>
            <div class="mb-4">
                <label class="block text-gray-700">Titel</label>
                <input type="text" bind:value={newGame.title} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Beschrijving</label>
                <textarea bind:value={newGame.description} class="w-full px-3 py-2 border rounded"></textarea>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Uitgever</label>
                <input type="text" bind:value={newGame.publisher} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Categorie</label>
                <input type="text" bind:value={newGame.category} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Startprijs</label>
                <input type="number" bind:value={newGame.startingPrice} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700">Einddatum Veiling</label>
                <input type="date" bind:value={newGame.auctionEndDate} class="w-full px-3 py-2 border rounded"/>
            </div>
            <div class="flex justify-end">
                <button on:click={handleClose} class="bg-red-500 text-white px-4 py-2 rounded mr-2">Annuleren</button>
                <button on:click={handleAddGame} class="bg-blue-500 text-white px-4 py-2 rounded">Toevoegen</button>
            </div>
        </div>
    </div>
{/if}