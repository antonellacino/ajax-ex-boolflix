$(document).ready(function() {
    var apiKey = "a7062847b5ee154e2868e4f86456d640";
    var source = document.getElementById("films-template").innerHTML;
    var template = Handlebars.compile(source);

    $('#search').click(function() {
        var userSearch = $('#userSearch').val();
        if (userSearch === "") {
            return
        }

        //chiamata ajax films
        callFilmList("https://api.themoviedb.org/3/search/movie", apiKey, userSearch, "Movie");
        //chiamata ajax serieTv
        callFilmList("https://api.themoviedb.org/3/search/tv", apiKey, userSearch, "SerieTv");

    });

    //-----------FUNZIONI-------------------------------------------------------

    //funzione chiamate ajax
    function callFilmList(url, apikey, queryString, type) {
        $.ajax({
            method: "GET",
            url: url,
            data: {
                api_key: apikey,
                language: "it-IT",
                query: queryString
            },
            success: function(data, stato) {
                var series = data.results;
                console.log(series);
                //-------------genera lista (film,"serieTv")
                generaFilmList(series, type)
            },
            error: function(richiesta, stato, errori) {
                alert("E' avvenuto un errrore." + errore);
            }
        });
    }

    //------------------------------------------------------------------------   
    function generaFilmList(films, type) {
        for (i = 0; i < films.length; i++) {
            //controllo se si tratta di un film o di una serie tv
            var title, originalTitle;
            if (type === "Movie") {
                title = films[i].title;
                originalTitle = films[i].original_title;
            } else if (type === "SerieTv") {
                title = films[i].name;
                originalTitle = films[i].original_name;
            }
            var context = {
                cover: generateCover(films[i].poster_path),
                title: title,
                originalTitle: originalTitle,
                language: selectedFlags(films[i].original_language),
                vote: generaStelle(films[i].vote_average),
                type: type
            };
            var html = template(context);
            $('.filmList').append(html);

        }
    }
    //-----------------------------------------------------------------------
    function generateCover(url) {
        var cover = "<img src='https://image.tmdb.org/t/p/w185/" + url + "'>";
        if (url === null) {
            cover = "<img src='img/immagine-non-disponibile.jpg' class='no-disponible'>";
        }
        return cover;
    }
    //-----------------------------------------------------------------------
    function selectedFlags(type) {
        var flags = ["it", "en", "es"];
        var flag;
        if (flags.includes(type)) {
            flag = "<img src='img/" + type + ".png'>";
            return flag;
        }
        return type;
    }
    //-------------------------------------------------------------------------
    function generaStelle(number) {
        //dividere il voto in base 5
        var voto = Math.ceil(number / 2);
        var stars = "";
        for (var i = 1; i <= 5; i++) {
            if (i <= voto) {
                //inserisci stella piena
                stars += '<i class="fas fa-star"></i>';
            } else {
                //inserisci stella vuota
                stars += '<i class="far fa-star"></i>'
            }
        }
        return stars;
    }

});