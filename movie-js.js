(function (){
const MOVIE_URL = `https://lateral-charming-rice.glitch.me/movies`;

function fetchAllMovies(){
    fetch(MOVIE_URL)
        .then(function (res){
           return res.json()
        }).then(function(allMovies) {
        console.log(allMovies);
         })

}

function addAMovie(title,director){
    const MOVIE_INFO = {
        title: title,
        director: director,
    }

    const OPTIONS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(MOVIE_INFO),
    };

    fetch(MOVIE_URL,OPTIONS)
        .then(function(res){
            console.log('New Movie Posted')
        })
}

function deleteAMovie (id){
    const OPTIONS = {
        method: 'DELETE',
    }
    fetch(`${MOVIE_URL}/${id}`,OPTIONS)
}












 // deleteAMovie(257);
fetchAllMovies();
addAMovie('updated new movie', 'wesley');
fetchAllMovies();

})();