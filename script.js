fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/20")
    .then(response_obj => response_obj.json())
    .then(pokemon_arr => {
        const loadingTag_elem = document.querySelector(".loading");
        loadingTag_elem.remove();
        const backgroundblack_elem = document.querySelector(".background_espera");
        backgroundblack_elem.classList.remove("background_espera")
        const listPokemons_elem = document.querySelector(".listPokemons");


        /*variables pokemon detaille */

        const spanId_elem = document.querySelector(".spanId");
        const imgFull_elem = document.querySelector(".imgFull");
        const titlePokemon_elem = document.querySelector(".titlePokemon");
        const divTypes_elem = document.querySelector(".divTypes")
        spanId_elem.innerText = "N° " + pokemon_arr[0].id;
        imgFull_elem.setAttribute("src", pokemon_arr[0].image)
        titlePokemon_elem.innerText = pokemon_arr[0].name;


        pokemon_arr.forEach(pokemon_obj => {

            /*pokemon list*/
            const itemPokemon_elem = PokemonItem(pokemon_obj);
            itemPokemon_elem.style.opacity = "1";
            listPokemons_elem.appendChild(itemPokemon_elem)

            /* pokemon detallado*/

            itemPokemon_elem.addEventListener("click", () => {
                pokemonDetalles_func(pokemon_obj);
            })

        });

        /* search */

        const search = document.querySelector("#idsearch");
        search.addEventListener("change", search_func)
        function search_func() {
            fetch("https://pokebuildapi.fr/api/v1/pokemon/" + search.value)
                .then(resultado => resultado.json())
                .then(pokemon_obj => {
                    console.log("hola")
                    pokemonDetalles_func(pokemon_obj);

                })
        }
    });



/* pokemon list function */
function PokemonItem(pokemon_obj) {
    const itemPokemon_elem = document.createElement("li")

    itemPokemon_elem.classList.add("item_pokemon");
    const pPokemon_elem = document.createElement("p")
    pPokemon_elem.innerText = pokemon_obj.id + ' ' + pokemon_obj.name;
    itemPokemon_elem.appendChild(pPokemon_elem);
    const itemPokemonImg_elem = document.createElement("img");
    itemPokemonImg_elem.setAttribute("src", pokemon_obj.sprite)
    itemPokemonImg_elem.classList.add("img_item");
    itemPokemon_elem.appendChild(itemPokemonImg_elem)

    return itemPokemon_elem;
}
/* pokemon detalles */
function pokemonDetalles_func(pokemon_obj) {

    const spanId_elem = document.querySelector(".spanId");
    const imgFull_elem = document.querySelector(".imgFull");
    const titlePokemon_elem = document.querySelector(".titlePokemon");
    const divTypes_elem = document.querySelector(".divTypes")
    imgFull_elem.setAttribute("src", pokemon_obj.image)
    spanId_elem.innerText = "N° " + pokemon_obj.id;
    titlePokemon_elem.innerText = pokemon_obj.name

    /*types*/

    divTypes_elem.innerHTML = "";
    pokemon_obj.apiTypes.forEach(type_elem => {
        const iconoTypes_elem = document.createElement("img");
        iconoTypes_elem.classList.add("icono_img");
        iconoTypes_elem.setAttribute("src", type_elem.image);
        divTypes_elem.appendChild(iconoTypes_elem);
        return divTypes_elem;
    })

    /* evolution */

    const evolution_elem = document.querySelector(".evolution");
    evolution_elem.innerHTML = "";

    if (Array.isArray(pokemon_obj.apiEvolutions) && pokemon_obj.apiEvolutions.length > 0) {

        pokemon_obj.apiEvolutions.forEach(apievolution_elem => {
            evolution_elem.innerText = apievolution_elem.pokedexId + " " + apievolution_elem.name
            const imgEvolution_elem = document.createElement("img");
            const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${apievolution_elem.pokedexId}.png`;
            imgEvolution_elem.classList.add("img_item");
            imgEvolution_elem.setAttribute("src", url);
            evolution_elem.appendChild(imgEvolution_elem);
        });
    } else {
        evolution_elem.innerText = "Évolution maximale atteinte";
    }
    return evolution_elem
}
