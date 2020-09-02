$(document).ready(function () {
//implementing 3rd party Framework
function contactUs() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
document.getElementById("myBtn").click();


// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
// function for creating a dropdown menu with a list of ages with a corresponding value
createAgeList();
function createAgeList() {
	for(i = 1; i < 100; i++) {
		select = "";
		select += "<option value=" + i + ">" + i + "</option>";
		$("#dropdown").append(select)
}};
// function for the weight dropdown list
createWeightList();
function createWeightList() {
	for(i = 5; i < 400; i=i+5){
		select = "";
		select += "<option value=" + i/2.2 + ">" + i + "lbs " + Math.floor(i/2.2) + "kg" + "</option>";
		$("#dropdown-weight").append(select);
	}
}
// function for the height dropdown list
createHeightList();
function createHeightList() {
	for(i = 5; i <= 250; i=i+5) {
	select = "";
	select += "<option value=" + i + ">" + i + " cm"+ "</option>";
	$("#dropdown-height").append(select);
	};
};
// Onclick button for BMI Form Submission
	$("#bmiSubmit").on("click", function (e) {
		e.preventDefault();
		var age = $(".dropdown-age").val();
		var height = $(".dropdown-height").val();
		var weight = $(".dropdown-weight").val();
		// Fit Cal Response
		var queryURLFitCal = "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&height=" + height + "&weight=" + weight;
		var responseFitCal =  {
			async : true,
			url: queryURLFitCal,
			method: "GET",
			"headers": {
				"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
				"x-rapidapi-key": "b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222"
			}
		};
		$.ajax(responseFitCal).done(function (response) {
		// setting bmi variable
		var bmi = response.bmi;
		bmi = Math.floor(bmi);
		// setting health description
		var bmiDescription = response.health;
		// setting healthy bmi range
		var bmiRange = response.healthy_bmi_range;
		// appending variables to the div
		$(".BMI").text("BMI: " + bmi);
		$(".health").text("BMI Description: " + bmiDescription);
		$(".range").text("Healthy BMI Range: " + bmiRange);	
});
});
	// Onclick function for Recipe Form Submission
	$("#recipeSubmit").on("click", function (e) {
		e.preventDefault();
		recipeInput = $("#dropdown-recipe").val();
		var queryURLRecipe = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + recipeInput;
		var recipeSearch = {
			"async": true,
			"crossDomain": true,
			"url": queryURLRecipe,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
				"x-rapidapi-key": "a1e9e9d373msh3ca1d0f878e9747p19baebjsn783a970a3456"
			}
		}
		$.ajax(recipeSearch).done(function (response) {
			console.log("Recipe Search response: ", response);
			let randomHit = response.hits[Math.floor(Math.random() * response.hits.length)];
			let recipeURL = randomHit.recipe.url;
			let recipeName = randomHit.recipe.label;
			let recipeSearchImg = randomHit.recipe.image;
			let healthLabel = [];
			let ingredients = [];
			let img = $("#imgSrc").attr({src: recipeSearchImg, id: "imgSrc" });
			let h1 = $("<h1 id='underPic'>");
			let p = $("<p id='desc'>");
			let healthText = $("<p id='healthText'>");
			let healthDesc = $("<p id='healthDesc'>");
			let anchor = $("#anchor").prop("href", recipeURL);
			
			
			$("#anchor").html(anchor)
			img.appendTo("#anchor");
			$("#foodTitle").html(recipeName);
			$("#imgSrc").html(img);
			$("#underPic").html(h1);
			$("#desc").html(p);
			$("#healthText").html(healthText);
			$("healthDesc").html(healthDesc);

			for (j = 0; j < randomHit.recipe.ingredientLines.length; j++){
				const list = randomHit.recipe.ingredientLines[j];
				ingredients.push(list);
			}
			$("#desc").html("<ul><li>" + ingredients.join("</li><li>"));
			$("#underPic").html("These are the ingredients you'll need: " );
			// for loop for store/listing health labels
			for (i = 0; i < randomHit.recipe.healthLabels.length; i++){
				const list = randomHit.recipe.healthLabels[i];
				healthLabel.push(list);
			}
			$("#healthText").html("Health Labels: ");
			$("#healthDesc").html("<ul><li>" + healthLabel.join("</li><li>"));
   		});
});
})