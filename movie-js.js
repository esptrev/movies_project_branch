(function (){
const MOVIE_URL = `https://lateral-charming-rice.glitch.me/movies`;

 function fetchAllMovies(){
    return fetch(MOVIE_URL)
        .then(function (res){
           return res.json()
        }).then(function(allMovies) {
        return allMovies;
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








// setTimeout(fetchAllMovies, 1000)



 // deleteAMovie(257);
 fetchAllMovies().then(function (allMovies) {
    console.log(allMovies)
    $("#loadingScreen").text("Movies are loaded!")
});
// addAMovie('updated new movie', 'wesley')
// fetchAllMovies();

})();