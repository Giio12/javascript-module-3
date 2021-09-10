const div = document.createElement('div')
div.className = "container-header"
const root = document.getElementById('root')
root.appendChild(div)
const containerHeader = document.querySelector('.container-header')
const img = document.createElement('img')
img.className = "img-logo"
containerHeader.appendChild(img)
img.src = "images/image4.png"

const divContainer = document.createElement('div')
divContainer.className = "container"
root.appendChild(divContainer)
const divRow = document.createElement('div')
divRow.className = "row mt-5"
divContainer.appendChild(divRow)
const divCol3 = document.createElement('div')
divCol3.className = "col-3"
divRow.appendChild(divCol3)

const ul = document.createElement('ul')
divCol3.appendChild(ul)
ul.className = "list-group";

const buttonLoadEpisodes = document.createElement('button');
buttonLoadEpisodes.id = 'buttons';
buttonLoadEpisodes.className = 'btn btn-primary col-12';
buttonLoadEpisodes.innerHTML = 'Load Episodes'
divCol3.appendChild(buttonLoadEpisodes)

const divCol9 = document.createElement('div')
divCol9.className = "col-9"
divRow.appendChild(divCol9)


const renderCharactersCards = (characters) => {
    const bodyCharacter = document.createElement('div');
    bodyCharacter.className = 'card row row-cols-1 row-cols-md-3 g-4';
    bodyCharacter.id = 'container-card';
    bodyCharacter.onclick = () => getCharacter(characters.id);
    
    const image = document.createElement('img');
    image.classList.add('card-img-top')
    image.src = characters.image
    
    
    const name = document.createElement('h5');
    name.classList.add('card-text' )
    name.innerHTML = characters.name;
    
    
    const status = document.createElement('p');
    status.classList.add('card-text')
    status.innerHTML = `${characters.species} | ${characters.status}`;
    
    bodyCharacter.appendChild(image)
    bodyCharacter.appendChild(name)
    bodyCharacter.appendChild(status)
    
    const bodyEpisode = document.getElementById('container-card')
    bodyEpisode.appendChild(bodyCharacter)
};

const renderSingleEpisode =  episode => {
    clearContent();
    
    const episodeContainer = document.createElement('div')
    episodeContainer.className = "card-container"
    divCol9.appendChild(episodeContainer)
    
    const headerEpisode = document.createElement('div');
    headerEpisode.innerHTML = `<h1 class="header-title">Episode ${episode.id}</h1> <h5 class="header-subtitle">${episode.air_date} | ${episode.episode}</h5>`;
    episodeContainer.prepend(headerEpisode);

    const bodyEpisode = document.createElement('div')
    bodyEpisode.className = "row row-cols-1 row-cols-md-3 g-4" //3columnas
    bodyEpisode.id = "container-card"
    episodeContainer.appendChild(bodyEpisode)
    
    episode.characters.forEach(async (characterUrl) => {
        try {
            const response = await fetch(characterUrl);
            const characters = await response.json();
            renderCharactersCards(characters);
            // charactersDiv.innerHTML="";
            
        } catch (error) {
            console.log(error)
        }
    })
}
const clearContent = () => {
    divCol9.innerHTML = '';
}

const renderEpisodeList = (episode) => {
    const liAllEpisodes = document.createElement('li');
    liAllEpisodes.classList.add(`episode-${episode.id}`, "list-group-item")
    document.querySelector(".list-group").appendChild(liAllEpisodes)
    liAllEpisodes.innerHTML = (`<button class="btn btn-link link-success"> Episode ${episode.id}</button>`)
    liAllEpisodes.onclick = () => renderSingleEpisode(episode);
}


const fetchEpisode = async (id) => {
    try {
        const url = `https://rickandmortyapi.com/api/episode/${id}`
        const response = await fetch(url);
        const episodes = await response.json();
        renderEpisodeList(episodes);
        
    } catch (error) {
        console.log(error)
    }
}
let offset = 1;
let limit = 9;

 function fetchEpisodes(offset, limit){ //Para que me muestre los episodios de 10 en 10 
    
    for (let i = offset; i <= offset + limit; i++) {
        if (i <= 41) {
            fetchEpisode(i)
        } else {
            
            buttonLoadEpisodes.style.display = 'none'
        }
    }
}

buttonLoadEpisodes.addEventListener("click", () => { //Este es el botón de Cargar más episodios
    offset += 10
    fetchEpisodes (offset, limit);
})

fetchEpisodes(offset, limit)


const renderCharacterCard = async (character) => {
    clearContent();

    const characterDiv = document.createElement('div');
    characterDiv.className = 'card mt-2'
    characterDiv.id = 'card-character'

    divCol9.appendChild(characterDiv)
  
    const characterDivRow = document.createElement('div');
    characterDivRow.className = 'row g-0'
    characterDiv.appendChild(characterDivRow)
    
   const imageDiv = document.createElement('div');
    imageDiv.className = 'col-md-5'
    characterDivRow.appendChild(imageDiv) 

    const image = document.createElement('img');
    image.className = 'img-fluid rounded-start'
    image.src = character.image
    imageDiv.appendChild(image)
    
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'col-md-7'
    characterDivRow.appendChild(bodyDiv)
    
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body'
    bodyDiv.appendChild(cardBodyDiv)

    const name = document.createElement('h1');
    name.classList.add('card-title')
    name.innerHTML = character.name;
    cardBodyDiv.appendChild(name)
    
    const description = document.createElement('p');
    description.classList.add('card-text')
    description.innerHTML = `${character.species} | ${character.status} | ${character.gender} | ${character.origin.name}`;//********************** */
    cardBodyDiv.appendChild(description)
    const buttonLocation= document.createElement('button')
    buttonLocation.innerHTML = 'Get Location'
    buttonLocation.className='btn btn-primary col-8'
    buttonLocation.id='buttons'
    cardBodyDiv.appendChild(buttonLocation)
    buttonLocation.onclick = () => renderLocationCard(character.origin.name);//////*******AQUI HAY QUE MANDAR AL FETCH NUEVO */

    const episodesDiv = document.createElement('div');
    episodesDiv.className = "row row-cols-1 row-cols-md-4 mt-5 g-4"
    divCol9.appendChild(episodesDiv)
    
    character.episode.forEach(async (episodeUrl) => {
        try {
            const resp = await fetch(episodeUrl);
            const episodes = await resp.json();
            renderEpisodesCard(episodes);
            
        } catch (error) {
            console.log(error)
        }
    })
    
    const renderEpisodesCard = (episodes) => {
        const episodesDivCol = document.createElement('div');
        episodesDivCol.classList.add('card')
        episodesDiv.appendChild(episodesDivCol)
        episodesDivCol.onclick = () => renderSingleEpisode(episodes);

        const name = document.createElement('h5');
        name.classList.add('card-text', )
        name.innerHTML = `Episode ${episodes.id}`;
        episodesDivCol.appendChild(name)

        const episode = document.createElement('p');
        episode.classList.add('card-text')
        episode.innerHTML = `${episodes.episode}`;
        episodesDivCol.appendChild(episode)
    }
}
const getCharacter = async (id) => {

    try {
        const url = `https://rickandmortyapi.com/api/character/${id}`
        const response = await fetch(url);
        const character = await response.json();

        renderCharacterCard(character);
    } catch (error) {
        console.log(error)
    }
}
const renderLocationCard=(location)=>{
    console.log(location.id)
}
const getLocation = async (id) => {
   
    try {
        const url = `https://rickandmortyapi.com/api/location/${id}`
        const response = await fetch(url);
        const location = await response.json();

        renderLocationCard(location);
    } catch (error) {
        console.log(error)
    }
}