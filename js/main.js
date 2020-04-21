$(document).ready(function() {

    $('#search').click(function() {
        var userSearch = $('#userSearch').val();
        if (userSearch === "") {
            return
        }
        var source = document.getElementById("films-template").innerHTML;
        var template = Handlebars.compile(source);

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
                    var context = {
                        title: films[i].title,
                        originalTitle: films[i].original_title,
                        language: films[i].original_language,
                        vote: films[i].vote_average
                    };
                    var html = template(context);
                    $('body').append(html);
                }
            },
            error: function(richiesta, stato, errori) {
                alert("E' avvenuto un errrore." + errore);
            }
        });
    });
});