$(document).ready(function () {
	var birds = ["ostrich", "owl", "eagle", "swift", "seagull", "hawk", "sparrow", "woodpecker"];

	// Add buttons for original birds array
	function renderButtons() {
		$("#bird-buttons").empty();
		for (i = 0; i < birds.length; i++) {
			$("#bird-buttons").append("<button class='btn btn-success' data-bird='" + birds[i] + "'>" + birds[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for new bird name entered
	$("#add-bird").on("click", function () {
		event.preventDefault();
		var newBird = $("#bird-input").val().trim();
		birds.push(newBird );
		renderButtons();
		return;
	});


	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var newBird  = $(this).attr("data-bird");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        newBird  + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#birds").empty();
			for (var i = 0; i < results.length; i++) {
				var birdDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var birdImg = $("<img>");

				birdImg.attr("src", results[i].images.original_still.url);
				birdImg.attr("data-still", results[i].images.original_still.url);
				birdImg.attr("data-animate", results[i].images.original.url);
				birdImg.attr("data-state", "still");
				birdImg.attr("class", "gif");
				birdDiv.append(p);
				birdDiv.append(birdImg);
				$("#birds").append(birdDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	
	$(document).on("click", ".gif", changeState);

});