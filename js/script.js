let pokemonName=document.querySelector(".pokemon-name");
let pokemonNumber = document.querySelector(".pokemon-number");
let pokemonImage = document.querySelector(".pokemon-image");

let btnNext = document.querySelector('.btn-next')
let btnPrev = document.querySelector('.btn-prev')
let buscar = document.querySelector('.buscar')
let form = document.querySelector('.form');

let pokemonAtual = 1 ;

// função que realiza requisição na api 

async function fetchPokemon(pokemon){
        const url =` https://pokeapi.co/api/v2/pokemon/${pokemon}`;
         const resposta = await fetch(url);
         if (resposta.status === 200){
            const data = await resposta.json()
            return data 
         }
        }
         
async function renderPokemon(pokemon){
        pokemonName.innerText = "Carregando ...";
        pokemonNumber.innerText = "";
      // enviando o pokemon para o método fectpokemon 
    let data = await fetchPokemon(pokemon);
    if (data){
        pokemonName.innerText = data['name'];
        pokemonNumber.innerText = data ['id'];
        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        buscar.value="";
        pokemonAtual=data['id'];
        buscar.focus();
        
    }  
    else {
        pokemonImage.style.display='none';
        pokemonName.innerText = "Não encontrado ;(";
        pokemonNumber.innerText = "";

    }
}

// adicionando evento ao formulario 

form.addEventListener('submit',(e) => {
    e.preventDefault();
    renderPokemon(buscar.value);

})
// Eventos de click dos botões 

btnNext.addEventListener('click',() => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
})
btnPrev.addEventListener('click', () => {
    if (pokemonAtual>1){
        pokemonAtual--;
        renderPokemon(pokemonAtual)
    }
})
renderPokemon(pokemonAtual);
