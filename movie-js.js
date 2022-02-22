(function () {
    const MOVIE_URL = `https://lateral-charming-rice.glitch.me/movies`;

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
            })
    }

    function deleteAMovie(title) {
        const OPTIONS = {
            method: 'DELETE',
        }
        return fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if (movie.title === title) {
                    alert('Movie Deleted')
                    let id = parseInt(movie.id)
                    fetch(`${MOVIE_URL}/${id}`, OPTIONS)
                }

            }
        })
    }

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
                if ($('#editTitle').val() === movie.title) {
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
                    if (movie.title === $('#searchBox').val()) {
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


    //  deleteAMovie(282);

    function populateMovieList() {
        $("#moviePoster").html('');
        fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if (movie.poster !== '') {
                    $('#moviePoster').append(`<img class="posters" src="${movie.poster}" alt="${movie.title} poster" width="200px">`)
                }
            }
            console.log(allMovies)
            $("#loadingScreen").text("Movies are loaded!")
        });

    }


    fetchAllMovies().then(function (allMovies) {
        for (const movie of allMovies) {
            if (movie.poster !== '') {
                $('#moviePoster').append(`<img class="posters" src="${movie.poster}" alt="${movie.title} poster" width="200px">`)
            }
        }
        console.log(allMovies)
        $("#loadingScreen").text("Movies are loaded!")
    });


    $('#addAMovieForm').submit(function (e) {
        e.preventDefault();
        if ($('#addTitle').val() === '') {
            alert('Please Enter Title');
            return;
        }
        let title = $('#addTitle').val();
        let director = $('#addDirector').val();
        let genres = $('#addGenres').val();
        let plot = $('#addPlot').val();
        let poster = $('#addPoster').val();
        let rating = $('#addRating').val();
        let year = $('#addYear').val();
        addAMovie(title, director, genres, plot, poster, rating, year).then(function () {
            populateMovieList();
        });

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
        $("#addAMovieForm").toggleClass('hide')
    })

    $('#deleteButton').click(function () {
        let title = $('#deleteBox').val();
        deleteAMovie(title).then(function () {
            populateMovieList();
        });
    })

    $('#showEditMovieForm').click(function () {
        $('#oldMovieInfo').html('')
        fetchAllMovies().then(function (allMovies) {
            for (const movie of allMovies) {
                if (movie.title === $('#selectTitle').val()) {
                    $('#oldMovieInfo').append(`
<!--//htmlformat--> 
<div id="editAMovieForm">
<span>Movie Title: </span><input id="editTitle" type="text" value=${movie.title}>
<label for="editTitle"></label>
<span>Director: </span><input id="editDirector" type="text" value=${movie.director}><br>
<label for="editDirector"></label>
<span>Genre: </span><input id="editGenres" type="text" value=${movie.genre}>
<label for="editGenres"></label>
<span>Plot: </span><input id="editPlot" type="text" value=${movie.plot}><br>
<label for="editPlot"></label>
<tspan>Poster: </tspan><input id="editPoster" type="text" value=${movie.poster}>
<label for="editPoster"></label>
<tspan>Rating: </tspan><input id="editRating" type="text" value=${movie.rating}><br>
<label for="editRating"></label>
<tspan>Year: </tspan><input id="editYear" type="text" value=${movie.year}>
<label for="editYear"></label>

</div>`)
                }
            }
        })
    })


    // addAMovie($('#addTitle').val(), $('#addDirector').val(),$('#addGenres').val(),$('#addPlot').val(),$('#addPoster').val(),$('#addRating').val(),$('#addYear').val())
    // fetchAllMovies().then(function (allMovies) {
    //     $('#movieSearchDiv').append(`${allMovies}`);
    //
    // });


    // editMovie(6,'EDitMovieTEst', 'wesleyB');
// addAMovie();
// fetchAllMovies();

})();


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