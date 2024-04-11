const cards = document.querySelector(".cards");
const cardsPerPage = 12;
let offset = 0;
let currentPage = 1;
let pokemonMaxId = 0;
const btnFirst = document.getElementById("btnFirst");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnLast = document.getElementById("btnLast");
const paginationText = document.getElementById("paginationText");
const pokemonDetails = document.getElementById("pokemonDetails");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const getMaxPokemonId = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();
    pokemonMaxId = data.count;
    fetchPokemons(offset, cardsPerPage, currentPage);
}

getMaxPokemonId();

const fetchPokemons = async (offset, cardsPerPage, currentPage) => {
    cards.innerHTML = "";

    if (paginationText) {
        paginationText.innerHTML = `Página ${currentPage} de ${Math.ceil(pokemonMaxId / cardsPerPage)}`;
    }

    const lastPokemonOnPage = Math.min(offset + cardsPerPage, pokemonMaxId);
    if (lastPokemonOnPage < offset + 1) {
        return;
    }

    for (let i = offset + 1; i <= lastPokemonOnPage; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    createPokemonCard(pokemon);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("card");

    const idStr = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0].type.name;

    pokemonEl.setAttribute("data-pokemon-id", pokemon.id);

    const pokemonInnerHTML = `
        <div class="card_container ${type}">
            <div class="imageContainer">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                alt=${pokemon.name} loading="lazy"
              />
            </div>

            <div class="infoContainer">
              <h2 class="id">#${idStr}</h2>
              <h2 class="name">${pokemon.name}</h2>
            </div>

            <div class="typesContainer">
              <div class="typeDisplay">
                <div class="typeName">
                  <p>Tipo</p>
                  <h3>${type}</h3>
                </div>
                <div class="typeIcon">
                  <img src="imgs/icons/${type}Icon.png" alt=${type} />
                </div>
              </div>
            </div>
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    cards.appendChild(pokemonEl);

    pokemonEl.addEventListener("click", () => {
        displayPokemonDetails(pokemon);
        scrollToTopAndCenter();
    });
}

const displayPokemonDetails = async (pokemon) => {
    const idStr = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0].type.name;
    try {
        const description = await getPokemonDescription(pokemon);

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
                <p class="description">${description}</p>
            </div>
        </div>
    `;
        pokemonDetails.innerHTML = detailsHTML
        pokemonDetails.classList.add("flexColumnCenter");
    } catch (error) {
        console.error("Error displaying Pokémon details:", error);
        pokemonDetails.innerHTML = "<p>Error displaying Pokémon details</p>";
    }
}

function formatWeight(weight) {
    // Convertendo gramas para quilogramas
    var weightInKg = weight / 10;
    // Formatando o peso com uma vírgula para separar as unidades
    return weightInKg.toString().replace('.', ',');
}

function formatHeight(height) {
    // Convertendo decímetros para metros
    var heightInMeters = height / 10;
    // Formatando a altura com uma vírgula para separar as unidades
    return heightInMeters.toString().replace('.', ',');
}

const getPokemonDescription = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        const data = await response.json();
        const description = data.flavor_text_entries.find(item => item.language.name === 'en');
        const cleanDescription = description.flavor_text.replace(/[^ -~]+/g, ' ');
        return cleanDescription;
    } catch (error) {
        console.error("Error fetching Pokémon description:", error);
        return "Description not available";
    }
}

const scrollToTopAndCenter = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

if (btnFirst) {
    btnFirst.addEventListener("click", () => {
        currentPage = 1;
        offset = 0;
        fetchPokemons(offset, cardsPerPage, currentPage);
    });
}

if (btnPrev) {
    btnPrev.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            offset -= cardsPerPage;
            fetchPokemons(offset, cardsPerPage, currentPage);
        }
    });
}

if (btnNext) {
    btnNext.addEventListener("click", () => {
        if (currentPage < Math.min(Math.ceil(pokemonMaxId / cardsPerPage), 86)) {
            currentPage++;
            offset += cardsPerPage;
            fetchPokemons(offset, cardsPerPage, currentPage);
        }
    });
}

if (btnLast) {
    btnLast.addEventListener("click", () => {
        currentPage = Math.min(Math.ceil(pokemonMaxId / cardsPerPage), 86);
        offset = (currentPage - 1) * cardsPerPage;
        fetchPokemons(offset, cardsPerPage, currentPage);
    });
}

// Adiciona evento de clique para o botão de filtro
if (searchButton) {
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            searchPokemon(searchTerm);
        } else {
            // Se o campo de pesquisa estiver vazio, exibe todos os Pokémon novamente
            getMaxPokemonId();
        }
    });
}

// Função para pesquisar um Pokémon com base no termo de pesquisa
const searchPokemon = async (term) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term}`);
        const pokemon = await response.json();
        cards.innerHTML = ""; // Limpa as cartas atuais
        createPokemonCard(pokemon); // Cria uma carta para o Pokémon encontrado
    } catch (error) {
        console.error("Erro ao pesquisar Pokémon:", error);
        alert("Pokémon não encontrado. Por favor, insira um ID ou nome válido.");
    }
};