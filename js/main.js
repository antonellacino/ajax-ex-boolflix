$(document).ready(function() {
    var source = document.getElementById("films-template").innerHTML;
    var template = Handlebars.compile(source);
    var flags = ["it", "en", "es"];

    $('#search').click(function() {
        var userSearch = $('#userSearch').val();
        if (userSearch === "") {
            return
        }

        // //chiamata ajax films
        $.ajax({
            method: "GET",
            url: "https://api.themoviedb.org/3/search/movie",
            data: {
                api_key: "a7062847b5ee154e2868e4f86456d640",
                language: "it-IT",
                query: userSearch
            },
            success: function(data, stato) {
                var films = data.results;
                console.log(films);
                for (i = 0; i < films.length; i++) {
                    //selezione bandiera
                    var flag = selectedFlags(films[i].original_language);
                    var context = {
                        title: films[i].title,
                        originalTitle: films[i].original_title,
                        language: flag,
                        type: "Film",
                    };
                    var html = template(context);
                    var vote = parseInt(films[i].vote_average / 2);
                    $('.filmList').append(html);
                    //generazione delle stelle
                    generaStelle(vote);
                };
            },
            error: function(richiesta, stato, errori) {
                alert("E' avvenuto un errrore." + errore);
            }
        });



        //chiamata ajax serie tv
        $.ajax({
            method: "GET",
            url: "https://api.themoviedb.org/3/search/tv",
            data: {
                api_key: "a7062847b5ee154e2868e4f86456d640",
                language: "it-IT",
                query: userSearch
            },
            success: function(data, stato) {
                var films = data.results;
                console.log(films);
                for (i = 0; i < films.length; i++) {
                    //selezione bandiera
                    var flag = selectedFlags(films[i].original_language);

                    console.log("il voto " + vote);
                    var context = {
                        title: films[i].name,
                        originalTitle: films[i].original_name,
                        language: flag,
                        type: "Serie Tv"
                    };
                    var html = template(context);
                    var vote = parseInt(films[i].vote_average / 2);

                    $('.filmList').append(html);
                    generaStelle(vote);

                };
            },
            error: function(richiesta, stato, errori) {
                alert("E' avvenuto un errrore." + errore);
            }
        });
    });



    //-----------FUNZIONI-------------------------------------------------------

    function selectedFlags(type) {
        if (flags.includes(type)) {
            flag = "<img src='img/" + type + ".png'>";
        } else {
            flag = type;
        }
        return flag;
    }

    function generaStelle(number) {
        for (var i = 0; i < number; i++) {
            $(".film:last-child .fa-star").eq(i).addClass('background');
        }
    }

});