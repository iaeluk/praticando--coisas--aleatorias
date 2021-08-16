// const fetch = require('node-fetch');
const main = document.querySelector('.movies')


fetch('https://api.themoviedb.org/3/discover/movie?with_genres=27&language=pt-BR&api_key=b2568761987165acaa449c0511b534ea')
.then(response => response.json())
    .then(jsonObtido => jsonObtido.results.forEach(filme => {
        main.innerHTML += `
        <div class="moviesUnique">
        <div class="poster">
        <a target="_blank" href="https://www.youtube.com/results?search_query=${filme.title} trailer"><img src="https://image.tmdb.org/t/p/w300${filme.poster_path}"></a>
        </div>
        <h2 class="descricao">${filme.title}</h2>
        </div>
        `
    }))
        





