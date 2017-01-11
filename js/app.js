
//Create AJAX Request

$("form").submit(function(event) {
	event.preventDefault();
	var searchField = document.getElementById("search_box");
	var searchButton = document.getElementById("search_button");
	searchField.setAttribute("disabled", true);
	searchButton.setAttribute("disabled", true);
	searchButton.setAttribute("value", "Search in progress!");
	document.querySelector(".movie-gallery").innerHTML = "";
	var $url = "http://www.omdbapi.com/?";
	var $search = $("#search_box").val();
	var $movieData = {
		s: $search,
		r: "json",
		p: 100
	};

	function callback(response) {
		console.log(response);
		$.each(response.Search, function(index, movie) {
			var movieTitle = "<p id='movie-title-" + index + "' class='movie-title'>" + movie.Title + "</p>";
			document.querySelector(".movie-gallery").innerHTML += movieTitle;
		});
		searchField.removeAttribute("disabled");
		searchButton.removeAttribute("disabled");
		searchButton.setAttribute("value", "Search!");

		//Create a function for updating HTML with movie title, poster, year and type
		function showMovieDetails(i) {
			return function() {


				console.log(this);

				//Create an overlay

				var $overlay = $("<div id='overlay'></div>");


				//Create a div that will contain image and arrows

				var $movieContainer = $("<div class='movieContainer'></div>");


					//Append movieContainer to overlay

					$overlay.append($movieContainer);


				//Create div that will contain all the movie information

				var $informationContainer = $("<div class='infoContainer'></div>");

					//Append infoContainer to movieContainer

					$movieContainer.append($informationContainer);

				//Create arrows

				var $rightArrow = $("<span><a href='#' class='arrow' id='rightArrow'> > </a></span>");
				var $leftArrow = $("<span><a href='#' class='arrow' id='leftArrow'> < </a></span>");


					//Append arrows to movieContainer

					$movieContainer.append($rightArrow).append($leftArrow);
				
				//Create an overlay closing element

				var $close = $("<span><a class='close' href='#''>x</a></span>");

						//Append closing element to movieContainer

						$movieContainer.append($close);


					//Append overlay to the body of the page

					$("body").append($overlay);


				document.getElementById("overlay").style.display = "block";
				if (i === 0) {
					document.getElementById("leftArrow").style.visibility = "hidden";
				}
				else if (i == response.Search.length - 1) {
					document.getElementById("rightArrow").style.visibility = "hidden";
				}
				var currentMovie = response.Search[i];
				document.getElementsByClassName("infoContainer")[0].innerHTML = "";
				var movieDetails = "<img class='movie-poster' id='movie-poster' src='" + currentMovie.Poster + "' />";
				movieDetails += "<h3 class='movie-header' id='movie-header'>" + currentMovie.Title + "</h3>";
				movieDetails += "<p class='movie-type' id='movie-type'><strong>Type: </strong>" + currentMovie.Type + "</p>";
				movieDetails += "<p class='movie-year' id='movie-year'><strong>Year: </strong>" + currentMovie.Year + "</p>";
				document.getElementsByClassName("infoContainer")[0].innerHTML += movieDetails;
				//Add event listener for the arrows
				var x = i;
				document.getElementById("leftArrow").addEventListener("click" ,arrowClick);
				document.getElementById("rightArrow").addEventListener("click" ,arrowClick);

				//Add click event listener to the closing element
				$(".close").click(function(event){
					event.preventDefault();
					document.getElementById("overlay").style.display = "none";
					document.getElementById("leftArrow").style.visibility = "visible";
					document.getElementById("rightArrow").style.visibility = "visible";
					document.getElementById("leftArrow").removeEventListener("click" ,arrowClick);
					document.getElementById("rightArrow").removeEventListener("click" ,arrowClick);
				});

				//Create function for changing movies with arrows placed next to the posters

				function arrowClick(event) {
					event.preventDefault();
					if (event.target.getAttribute("id") == "leftArrow") {
						var previousMovie = response.Search[x - 1];
						x -= 1;
						console.log(x);
						document.getElementById("movie-poster").src = previousMovie.Poster;
						document.getElementById("movie-header").innerText = previousMovie.Title;
						document.getElementById("movie-type").innerText = previousMovie.Type;
						document.getElementById("movie-year").innerText = previousMovie.Year;
						if (x === 0) {
							document.getElementById("leftArrow").style.visibility = "hidden";
						}
						if (x < (response.Search.length - 1)) {
						document.getElementById("rightArrow").style.visibility = "visible";
						}
					}
					else if (event.target.getAttribute("id") == "rightArrow") {
						var nextMovie = response.Search[x + 1];
						x += 1;
						console.log(x);
						document.getElementById("movie-poster").src = nextMovie.Poster;
						document.getElementById("movie-header").innerText = nextMovie.Title;
						document.getElementById("movie-type").innerText = nextMovie.Type;
						document.getElementById("movie-year").innerText = nextMovie.Year;
						if (x == response.Search.length - 1) {
							document.getElementById("rightArrow").style.visibility = "hidden";
						}
						if (x > 0) {
							document.getElementById("leftArrow").style.visibility = "visible";
						}
					}
				}
			};
		}

		for (var i = 0; i < response.Search.length; i++) {
		//Add click event listener for elements containing movie title, poster, year, and type
			document.getElementById("movie-title-" + i).addEventListener("click" ,showMovieDetails(i));
		}

	}

	$.ajax($url, {
		data: $movieData,
		dataType: "json",
		success: callback,
		type: "GET",
		error: function() {
			console.log("request have failed");
		}
	});
});














