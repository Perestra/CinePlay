const API_KEY = '875eb7acef457f17217538c2f06f2cec'
const LANGUAGE = 'pt-br'
const MOVIES_ID = ['361743', '453395', '507086', '634649', '718789', '616037', '526896', '414906', '705861', '406759']


function getUrlMovie(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
}

function setMoviePage(movieId){
    fetch(getUrlMovie(movieId))
    .then(res => res.json())
    .then(data => {
                
        const bgPage = document.querySelector('.page')
        const bgMovieURL = `background-image: linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0e0f0f 100%),
        url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
        bgPage.setAttribute('style', bgMovieURL) 

        const ratingValue = document.querySelector('.rating span')
        ratingValue.innerHTML = data.vote_average

        const nameMovie = document.querySelector('.item_info h1')
        nameMovie.innerHTML = data.title

        const infoMovie = document.querySelector('.item_info strong')
        const yearReleased = data.release_date.split('-')[0]
        const genre = data.genres[0].name
        infoMovie.innerHTML = yearReleased + ' • ' + genre + ' • Movie'

        const overviewMovie = document.querySelector('.item_info p')
        overviewMovie.innerHTML = data.overview 
    })
}

function setBtnPlay(movieId){
    const btnPlay = document.createElement('button')
    btnPlay.setAttribute('onclick', `setMoviePage('${(movieId)}')`)
    btnPlay.innerHTML = `<i class="fa-solid fa-circle-play"></i>`
    return btnPlay
}

function setListMovie(movieId){
    fetch(getUrlMovie(movieId))
    .then(res => res.json())
    .then(data => {
    
        const ulElement = document.querySelector('.movies_items ul')

        const liElement = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const name = `<strong>${data.title}</strong>`
        liElement.innerHTML = genre + name 

        const bgMovieURL = `background-image: linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0e0f0f 100%),
        url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
        liElement.setAttribute('style', bgMovieURL) 

        liElement.appendChild(setBtnPlay(movieId))
        ulElement.appendChild(liElement)
    })
}

function listIdMovies() {
    MOVIES_ID.map(setListMovie)
}
listIdMovies()
setMoviePage(MOVIES_ID[0])





