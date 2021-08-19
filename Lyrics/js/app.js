const baseURL = 'https://api.genius.com/'
const searchGenius = 'search?q='
const songGenius = 'songs/'
const token = 'PU8tECUfPg3ZQHSDy32TYY7abhIrBz_d9KUi0eBg8leV3UsfJSZ4m8o1qnvtH0Dg'
const body = document.querySelector('body')
const cover = document.querySelector('.coverImg')
const input = document.querySelector('input')
const spotify = document.querySelector('.spotify')


function getData() {
    let search = document.getElementById("myInput").value;

    fetch(baseURL + searchGenius + search + "&access_token=" + token)
        .then(response => response.json())
        .then(data => {
            const info = data.response.hits[0].result

            return info
        })
        .then(info => {
            cover.innerHTML = `<a class="link-img" target="_blank" href="${info.url}"><img src="${info.song_art_image_url}"></a>`
            body.style.backgroundColor = info.song_art_primary_color

            return info
        })
        .then(info => {
            fetch(baseURL + songGenius + info.id + "?access_token=" + token)
                .then(response => response.json()
                    .then(data => {
                        let media = data.response.song.media
                        let spotifyPosition = media.findIndex(x => x.native_uri);
                        let youtubePosition = media.findIndex(x => x.type === 'video');

                        if (spotifyPosition >= 0) {
                            let uri = data.response.song.media[spotifyPosition].native_uri
                            let fullURL = uri.replace('spotify:track:', 'https://open.spotify.com/embed/track/')

                            spotify.innerHTML = `<iframe src="${fullURL}" width="315" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
                        } else if (youtubePosition >= 0) {
                            // let youURL =  arq.response.song.media[youtubePosition].url

                            spotify.innerHTML = `<a target="_blank" href="https://www.youtube.com/results?search_query=${data.response.song.full_title}"><button type="button">Youtube Video</button></a>`
                        } else {
                            spotify.innerHTML = ''
                        }
                    }))
        })
}

input.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault()
        getData()
    }
})