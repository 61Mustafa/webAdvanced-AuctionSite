<script>
    export let name;
    export let genre;
    export let publisher;
    export let price;
    export let auction_end_date;
    export let image_path;
    const backendUrl = 'MustafaDemir-auctionSite/server/src/data/photos';
</script>

<div class="game-card">
    <img src={`${backendUrl}${image_path}`} alt={name} width="125"/>
    <h2>{name}</h2>
    <p><strong>Prijs:</strong> €{price}</p>
    <p><strong>Publisher:</strong> {publisher}</p>
    <p><strong>Genre:</strong> {genre}</p>
    <p><strong>Veiling einddatum:</strong> {auction_end_date}</p>
    <button>Bekijk veiling</button>
</div>

<style>
    .game-card {
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
        text-align: center;
    }

    h2 {
        margin-bottom: 10px;
        font-size: 1.5em;
    }

    p {
        margin: 5px 0;
    }

    img {
        margin-bottom: 10px;
        border-radius: 8px;
    }

    button {
        margin-top: 10px;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>
