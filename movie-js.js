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

function editMovie(id,title,director){
     const MOVIE_INFO = {
         title: title,
         director: director,
     }
     const OPTIONS = {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(MOVIE_INFO),
     }
    fetch(`${MOVIE_URL}/${id}`,OPTIONS)
}

function populateMovie (){
     $('#movieSearchDiv').html('');
     return fetch(`${MOVIE_URL}`)
         .then(function (res){
            return res.json()
         }).then(function (data){
             for (const movie of data) {
                 if(movie.title === $('#searchBox').val()){
                     $('#movieSearchDiv').append(`<div class="card" style="width: 18rem;">
                         <div class="card-body">
                             <h5 class="card-title">${movie.title}</h5>
                             <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
                             <p class="card-text">${movie.plot}</p>
                       </div>
                     </div>`);
                 }
             }
         })
}


$('#searchButton').click(populateMovie)

// setTimeout(fetchAllMovies, 1000)



 // deleteAMovie(258);



 fetchAllMovies().then(function (allMovies) {
    console.log(allMovies)
    $("#loadingScreen").text("Movies are loaded!")
});




 // fetchAllMovies().then(function (allMovies) {
 //     $('#movieSearchDiv').append(`${allMovies}`);
 //
 // });


 // editMovie(6,'EDitMovieTEst', 'wesleyB');
// addAMovie('updated new movie', 'wesley')
// fetchAllMovies();

})();