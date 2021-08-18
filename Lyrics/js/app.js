const baseURL = 'https://api.genius.com/'
const searchGenius = 'search?q='
const songGenius = 'songs/'
const tokenCover = '&access_token=PU8tECUfPg3ZQHSDy32TYY7abhIrBz_d9KUi0eBg8leV3UsfJSZ4m8o1qnvtH0Dg'
const tokenSong = '?access_token=o2OfEJGD9f--xjv3NfeqvbfUurzELlba2kmfjW2VPbWiA1u7Mhiaa_fT3i2yu5rd'
const body = document.querySelector('body')
const cover = document.querySelector('.coverImg')
const input = document.querySelector('input')
const spotify = document.querySelector('.spotify')


function getInputValue() {
    let inputVal = document.getElementById("myInput").value;
    let search = inputVal

    fetch(baseURL + searchGenius + search + tokenCover).then(res => res.json()).then(arq => {
        const info = arq.response.hits[0].result
       
        return info
    })
        .then(res => {
            cover.innerHTML = `<a target="_blank" href="${res.url}"><img src="${res.header_image_url}"></a>`
            body.style.backgroundColor = res.song_art_primary_color

            return res
        }).then(info => {

            fetch(`${baseURL}${songGenius}${info.id}${tokenSong}`)
                .then(res => res.json()
                    .then(arq => {

                        let media = arq.response.song.media
                        let spotifyPosition = media.findIndex(x => x.native_uri);
                        let youtubePosition = media.findIndex(x => x.type === 'video');

                        if (spotifyPosition >= 0) {
                            let uri = arq.response.song.media[spotifyPosition].native_uri
                            let fullURL = uri.replace('spotify:track:', 'https://open.spotify.com/embed/track/')
                            
                            spotify.innerHTML = `<iframe src="${fullURL}" width="315" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
                            console.log(arq.response.song.media)
                        } else if (youtubePosition >= 0) {
                            let youURL =  arq.response.song.media[youtubePosition].url

                            spotify.innerHTML = `<a target="_blank" href="${youURL}"><button type="button">Youtube Video</button></a>`
                        } else {
                            spotify.innerHTML = ''
                        }
                    }))
        })
}

input.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault()
        getInputValue()
    }
})












// corpo.innerHTML += `<div id='rg_embed_link_49378' class='rg_embed_link' data-song-id='49378'>Read <a href='https://genius.com/The-weeknd-the-knowing-lyrics'>“The Knowing” by The Weeknd</a> on Genius</div> <script crossorigin src='//genius.com/songs/49378/embed.js'></script>`