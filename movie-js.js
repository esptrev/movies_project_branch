(function () {

    const MOVIE_URL = `https://lateral-charming-rice.glitch.me/movies`;

    function getOMDb(movieTitle){
      return  fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${TREVOR_OMDb_key}`)
            .then(function (data){
                // console.log(data);
                return data.json();
            }).then(function (data){
            // console.log(data);
                return data;
        }).then(function (data){
            // console.log(data);
            let title = data.Title;
            let director = data.Director;
            let genres = data.Genre;
            let plot = data.Plot;
            let poster = data.Poster;
            let rating = data.Rating;
            let year = data.Year;
         return   addAMovie(title, director, genres, plot, poster, rating, year);
        })
    }


    // getOMDb('it').then(function (){
    //     populateMovieList();
    // });

    function fetchAllMovies() {
        return fetch(MOVIE_URL)
            .then(function (res) {
                return res.json()
            }).then(function (allMovies) {
                return allMovies;
            })
    }


    function addAMovie(title, director, genres, plot, poster, rating, year) {
        const MOVIE_INFO = {
            title: title,
            director: director,
            genre: genres,
            plot: plot,
            poster: poster,
            rating: rating,
            year: year,
        }

        const OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(MOVIE_INFO),
        };

        return fetch(MOVIE_URL, OPTIONS)
            .then(function (res) {
                alert('New Movie Posted')
            }).then(populateMovieList);
    }

    function deleteAMovie(title) {
        const OPTIONS = {
            method: 'DELETE',
        }
        return fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if (movie.title.toLowerCase() === title) {
                    alert('Movie Deleted')
                    let id = parseInt(movie.id)
                    fetch(`${MOVIE_URL}/${id}`, OPTIONS)
                        .then(populateMovieList)
                    ;
                }

            }
        })
    }
    // deleteAMovie(301);

    function editMovie(title, director, genres, plot, poster, rating, year) {
        const MOVIE_INFO = {
            title: title,
            director: director,
            genre: genres,
            plot: plot,
            poster: poster,
            rating: rating,
            year: year,
        }
        const OPTIONS = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(MOVIE_INFO),
        }
        return fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if ($('#editTitle').val().toLowerCase() === movie.title.toLowerCase()) {
                    alert('Movie Edited')
                    let id = parseInt(movie.id)
                    fetch(`${MOVIE_URL}/${id}`, OPTIONS)
                }
            }
        })
    }

    function populateMovie() {
        $('#movieSearchDiv').html('');
        return fetch(`${MOVIE_URL}`)

            .then(function (res) {
                return res.json()
            }).then(function (data) {
                for (const movie of data) {
                    if (movie.title.toLowerCase() === $('#searchBox').val().toLowerCase()) {
                        $('#movieSearchDiv').append(`<div class="card" style="width: 18rem;">
                         <div class="card-body">
                             <h5 class="card-title">${movie.title}</h5>
                             <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
                             <p class="card-text">${movie.plot}</p>
                             <div class="card-footer"><img src="${movie.poster}" alt="${movie.title} poster" width="200px"></div>
                       </div>
                     </div>`);
                    }
                }
            })
    }


    $('#searchButton').click(populateMovie)

// setTimeout(fetchAllMovies, 1000)




    function populateMovieList() {
        $("#moviePoster").html('');
        fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if (movie.poster !== '') {
                    $('#moviePoster').append(`${movie.title}<img class="posters" src="${movie.poster}" alt="${movie.title} poster">`)
                }
            }
            console.log(allMovies)
            $("#loadingScreen").text("Movies are loaded!")
        });

    }


    fetchAllMovies().then(function (allMovies) {
        for (const movie of allMovies) {
            if (movie.poster !== '') {
                $('#moviePoster').append(`<img title="${movie.title}" class="posters" src="${movie.poster}" alt="${movie.title} poster" width="200px">`)
            }
        }
        console.log(allMovies)
        $("#loadingScreen").text("Movies are loaded!")
    });


    $('#addMovieButton').click(function (e) {
        let title = $('#addTitle').val().split(' ')
        title = title.join('+');
        getOMDb(title);
        $('#addMovieModel').addClass('hide')
    })

    $('#editMovieButton').click(function () {
        // e.preventDefault();
        alert('form submitted');
        if ($('#editTitle').val() === '') {
            alert('Please Enter Title');
            return;
        }
        let title = $('#editTitle').val();
        let director = $('#editDirector').val();
        let genres = $('#editGenres').val();
        let plot = $('#editPlot').val();
        let poster = $('#editPoster').val();
        let rating = $('#editRating').val();
        let year = $('#editYear').val();
        editMovie(title, director, genres, plot, poster, rating, year).then(function () {
            populateMovieList();
        });

    })


    $("#showAddMovieForm").click(function () {
        $("#addMovieModel").toggleClass('hide')
    })

    $('#deleteButton').click(function () {
        let title = $('#deleteBox').val();
        deleteAMovie(title)

    })

    $('#editMovieButton').click(function (){
        $('#editMovieModel').addClass('hide');
    })
    $('#closeEditWindowButton').click(function (){
        $('#editMovieModel').addClass('hide');
    })
    $("#closeAddWindowButton").click(function (){
        $("#addMovieModel").addClass('hide');
    })
    var targetTitle;
    $('#moviePoster').dblclick(function (event){
        $('#dblClickDiv').html('')
        let target = event.target;
        targetTitle = target.title
        console.log(targetTitle);
        $('#dblClickModal').removeClass('hide');
        $('#dblClickDiv').append(target);
    })
    $('#dblclickCloseButton').click(function (event){
        $('#dblClickModal').addClass('hide');
    })

    $('#moviePoster').click(function (event){
        $('#dblClickModal').addClass('hide');
    })


    $('#dblclickEditbutton').click(function () {
        $('#dblClickModal').addClass('hide');
        $('#oldMovieInfo').html('')
        fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                console.log(movie.title);
                console.log(targetTitle);
                if (movie.title.toLowerCase() === targetTitle.toLowerCase()) {
                    $('#editMovieModel').removeClass('hide');
                  return  $('#oldMovieInfo').append(`
<!--//htmlformat--> 
<div id="editAMovieForm">
<span>Title: </span><input class="m-2 col-4" id="editTitle" type="text" value='${movie.title}'>
<label for="editTitle"></label>
<span>Director: </span><input class="m-2 col-4" id="editDirector" type="text" value='${movie.director}'><br>
<label for="editDirector"></label>
<tspan>Poster: </tspan><input class="m-2 col-10" id="editPoster" type="text" value='${movie.poster}'>
<label for="editPoster"></label>
<tspan>Rating: </tspan><input class="m-2 col-4" id="editRating" type="text" value='${movie.rating}'>
<label for="editRating"></label>
<tspan>Year: </tspan><input class="m-2 col-4" id="editYear" type="text" value='${movie.year}'><br>
<label for="editYear"></label>
<span>Genre: </span>
<input class="m-2 col-4" id="editGenres" type="text" value='${movie.genre}'>
<label for="editGenres"></label>
<span>Plot: </span><textarea rows="2" cols="60" id="editPlot"  placeholder='${movie.plot}'></textarea>
</div>`)
                }
            }
        })
    })




    // $('#selectTitle').val()
})();


// <div className="col-12">
//     <input type="checkbox" id="Action" name="Action" value="Action"><label htmlFor="action">Action</label>
//         <input type="checkbox" id="Comedy" name="Comedy" value="Comedy"><label htmlFor="Comedy">Comedy</label>
//             <input type="checkbox" id="Drama" name="Drama" value="Drama"><label htmlFor="Drama">Drama</label>
//                 <input type="checkbox" id="Western" name="Western" value="Western"><label
//                     htmlFor="Western">Western</label>
//                     <input type="checkbox" id="Sci-Fi" name="Sci-Fi" value="Sci-Fi"><label
//                         htmlFor="Sci-Fi">Sci-Fi</label>
//                         <input type="checkbox" id="Horror" name="Horror" value="Horror"><label
//                             htmlFor="Horror">Horror</label>
//                             <input type="checkbox" id="Bio" name="Bio" value="Bio"><label htmlFor="Bio">Bio</label>
//                                 <input type="checkbox" id="Crime" name="Crime" value="Crime"><label
//                                     htmlFor="Crime">Crime</label>
//                                     <input type="checkbox" id="Thriller" name="Thriller" value="Thriller"><label
//                                         htmlFor="Thriller">Thriller</label>
// </div>

// fetch('data')
//     //     .then(function (res){
//     //         return res.json()
//     //     }).then(function (movies){
//     //     return (movies);
//     // }).then(function (movies){
//     //     for (const movie of movies) {
//     //         addAMovie(movie.title, movie.director,movie.genres,movie.plot,movie.poster,movie.rating,movie.year)
//     //     }
//     // })

// $(document).ready(function (){
//
//
//ATTEMPT FOR CLICKABLE IMAGES
//
//
// $('.posters').dblclick(function (event){
//     // fetchAllMovies().then(function (allMovies){
//     //     for (const movie of allMovies) {
//     //         if(movie.poster === $(this.attr('src'))){
//     //             $('#movieSearchDiv').append(`<div class="card" style="width: 18rem;">
//     //                     <div class="card-body">
//     //                         <h5 class="card-title">${movie.title}</h5>
//     //                         <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
//     //                         <p class="card-text">${movie.plot}</p>
//     //                         <div class="card-footer"><img src="${movie.poster}" alt="${movie.title} poster" width="200px"></div>
//     //                   </div>
//     //                 </div>`)
//     //         }
//     //     }
//
//     // })
//     // $('#moviePoster').append(this);
//     console.log(event);
// })
//
// })
// addAMovie($('#addTitle').val(), $('#addDirector').val(),$('#addGenres').val(),$('#addPlot').val(),$('#addPoster').val(),$('#addRating').val(),$('#addYear').val())
// fetchAllMovies().then(function (allMovies) {
//     $('#movieSearchDiv').append(`${allMovies}`);
//
// });


// editMovie(6,'EDitMovieTEst', 'wesleyB');
// addAMovie();
// fetchAllMovies();