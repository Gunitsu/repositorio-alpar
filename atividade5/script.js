const cards = document.querySelector(".cards");
const cardsPerPage = 12;
let offset = 0;
let currentPage = 1;
const btnFirst = document.getElementById("btnFirst");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnLast = document.getElementById("btnLast");
const paginationText = document.getElementById("paginationText");
const pokemonDetails = document.getElementById("pokemonDetails");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const fetchPokemons = async () => {
    cards.innerHTML = "";
    if (paginationText) {
        paginationText.innerHTML = `Página ${currentPage}`;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${cardsPerPage}`);
    const data = await response.json();
    for (const pokemon of data.results) {
        await getPokemon(pokemon);
    }
}

const getPokemon = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("card");
    const idStr = pokemon.id.toString().padStart(3, "0");
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
    pokemonEl.setAttribute("data-pokemon-id", pokemon.id);
    const pokemonInnerHTML = `
        <div class="card_container ${type1}">
            <div class="imageContainer">
              <img
                src="${pokemon.sprites.other['official-artwork'].front_default || 'imgs/desconhecido.png'}"
                alt=${pokemon.name} loading="lazy"
              />
            </div>
            <div class="infoContainer">
              <h2 class="id">#${idStr}</h2>
              <h2 class="name">${pokemon.name}</h2>
              <div class="typesContainer">
                <div class="typeDisplay">
                  <div class="typeName">
                    <p>Tipo</p>
                    <h3>${type1}</h3>
                  </div>
                  <div class="typeIcon">
                    <img src="imgs/icons/${type1}Icon.png" alt=${type1} />
                  </div>
                </div>
                ${type2 ? `
                <div class="typeDisplay">
                  <div class="typeName">
                    <p>Tipo</p>
                    <h3>${type2}</h3>
                  </div>
                  <div class="typeIcon">
                    <img src="imgs/icons/${type2}Icon.png" alt=${type2} />
                  </div>
                </div>
                ` : ''}
              </div>
            </div>
        </div>
    `;
    pokemonEl.innerHTML = pokemonInnerHTML;
    cards.appendChild(pokemonEl);
    pokemonEl.addEventListener("click", () => {
        displayPokemonDetails(pokemon);
        // Rolar para cima para ver os detalhes do Pokémon
        pokemonDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

const displayPokemonDetails = async (pokemon) => {
    const idStr = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0].type.name;
    try {
        const response = await fetch(pokemon.species.url);
        const data = await response.json();
        const description = data.flavor_text_entries.find(item => item.language.name === 'en');
        const cleanDescription = description.flavor_text.replace(/[^ -~]+/g, ' ');
        const detailsHTML = `
            <div class="card_container ${type} details">
                <div class="imageContainer">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt=${pokemon.name} loading="lazy" />
                </div>
                <div class="infoContainer">
                <h2 class="id">#${idStr}</h2>
                <h2 class="name">${pokemon.name}</h2>
                <p>Pontos de Vida: ${pokemon.stats[0].base_stat}</p>
                <p>Ataque: ${pokemon.stats[1].base_stat}</p>
                <p>Defesa: ${pokemon.stats[2].base_stat}</p>
                <p>Velocidade: ${pokemon.stats[5].base_stat}</p>
                <p>Altura: ${formatHeight(pokemon.height)} m</p>
                <p>Peso: ${formatWeight(pokemon.weight)} Kg</p>
                </div>
            </div>
            <div class="descriptionContainer ${type}">
                <h3>Descrição:</h3>
                <p class="description">${cleanDescription}</p>
            </div>
        </div>
    `;
        pokemonDetails.innerHTML = detailsHTML;
        pokemonDetails.classList.add("flexColumnCenter");
    } catch (error) {
        console.error("Error displaying Pokémon details:", error);
        pokemonDetails.innerHTML = "<p>Error displaying Pokémon details</p>";
    }
}

function formatWeight(weight) {
    var weightInKg = weight / 10;
    return weightInKg.toString().replace('.', ',');
}

function formatHeight(height) {
    var heightInMeters = height / 10;
    return heightInMeters.toString().replace('.', ',');
}

if (btnFirst) {
    btnFirst.addEventListener("click", () => {
        currentPage = 1;
        offset = 0;
        fetchPokemons();
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); 
        }, 500);
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            offset -= cardsPerPage;
            fetchPokemons();
            setTimeout(() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); 
            }, 500); 
        }
    });
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        currentPage++;
        offset += cardsPerPage;
        fetchPokemons();
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); 
        }, 500);
    });
}

if (btnLast) {
    btnLast.addEventListener("click", async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const totalPages = Math.ceil(data.count / cardsPerPage);
        currentPage = totalPages;
        offset = (totalPages - 1) * cardsPerPage;
        fetchPokemons();
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }, 500);
    });
}

if (searchButton) {
    searchButton.addEventListener("click", async () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
                const pokemon = await response.json();
                cards.innerHTML = "";
                createPokemonCard(pokemon);
            } catch (error) {
                console.error("Error searching Pokémon:", error);
                alert("Pokémon not found. Please enter a valid ID or name.");
            }
        } else {
            fetchPokemons();
        }
    });
}

fetchPokemons();

// Adicionar listener para rolar para cima quando um card de Pokémon é clicado
cards.addEventListener("click", (event) => {
    if (event.target.closest('.card')) {
        pokemonDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});