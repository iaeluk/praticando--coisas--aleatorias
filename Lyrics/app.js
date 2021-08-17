const baseURL = 'https://api.genius.com/search?q='
const token = '&access_token=PU8tECUfPg3ZQHSDy32TYY7abhIrBz_d9KUi0eBg8leV3UsfJSZ4m8o1qnvtH0Dg'
const body = document.querySelector('body')
const cover = document.querySelector('.coverImg')
const input = document.querySelector('input')


function getInputValue(){
   let inputVal = document.getElementById("myInput").value;
   let search = inputVal

   fetch(baseURL+search+token).then(res => res.json()).then(arq => {
      const info = arq.response.hits[0].result
      console.log(info)
      return info
   })
   .then(res => {
      cover.innerHTML = `<a target="_blank" href="${res.url}"><img src="${res.header_image_url}"></a>`
      body.style.backgroundColor = res.song_art_primary_color
})
}

input.addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            getInputValue();
        }
    });












// corpo.innerHTML += `<div id='rg_embed_link_49378' class='rg_embed_link' data-song-id='49378'>Read <a href='https://genius.com/The-weeknd-the-knowing-lyrics'>“The Knowing” by The Weeknd</a> on Genius</div> <script crossorigin src='//genius.com/songs/49378/embed.js'></script>`