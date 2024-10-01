<script>
    export let selectedPrice;
    export let selectedGenre;
    export let selectedPublisher;
</script>

<aside class="filters flex flex-col p-2 mr-0 gap-5 w-full md:w-1/4 max-w-md">
    <section class="py-6 relative">
        <div class="w-full max-w-4xl mx-auto pr-20 mt-4">
            <div class="grid grid-cols-48">
                <div class="col-span-36 md:col-span-6 w-full max-md:max-w-md max-md:mx-auto">
                    <div class="box rounded-xl border-2 border-gray-300 bg-white p-7 w-full md:max-w-full">

                        <div class="mt-0 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-full">
                            <div class="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                                <p class="font-medium text-base leading-7 text-black">Filter</p>
                            </div>

                            <label for="Price"
                                   class="font-medium text-sm leading-8 text-gray-600 mb-1 pb-5 pl-2">Prijs</label>
                            <div class="relative w-full mb-7">
                                <select id="Price" bind:value={selectedPrice}
                                        class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                                    <option value="">Games minder kosten dan</option>
                                    <option value="50">50 EUR</option>
                                    <option value="60">60 EUR</option>
                                    <option value="70">70 EUR</option>
                                </select>
                                <svg class="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16"
                                     height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>

                            <label for="Publisher"
                                   class="font-medium text-sm leading-8 text-gray-600 mb-1 pb-5 pl-2">Uitgeverij</label>
                            <div class="relative w-full mb-7">
                                <select id="Publisher" bind:value={selectedPublisher}
                                        class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                                    <option value="">Kies een uitgeverij</option>
                                    <option value="Capcom">Capcom</option>
                                    <option value="Sony">Sony</option>
                                    <option value="Square Enix">Square Enix</option>
                                    <option value="Electronic Arts">EA</option>
                                    <option value="Activision">Activision</option>
                                </select>
                                <svg class="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16"
                                     height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>

                            <label for="Categorie"
                                   class="font-medium text-sm leading-8 text-gray-600 mb-1 pb-5 pl-2">Categorie</label>
                            <div class="relative w-full mb-7">
                                <select id="Categorie" bind:value={selectedGenre}
                                        class="h-12 border border-gray-300 text-gray-900 text-xs font-medium rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white">
                                    <option value="">Kies een categorie</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Shooter">Shooter</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Racing">Racing</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Platformer">Platformer</option>
                                    <option value="Sports">Sports</option>
                                </select>
                                <svg class="absolute top-1/2 -translate-y-1/2 right-4 z-50" width="16"
                                     height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827"
                                          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</aside>