// api key b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222
var age = 0;
var height = 0;
var weight = 0;

var fitnessCal = {
	"async": true,
	"crossDomain": true,
	"url": "https://fitness-calculator.p.rapidapi.com/bmi?age=25&height=180&weight=65",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com",
		"x-rapidapi-key": "b469cb6cf6msh3da406e4c4c611dp13d77fjsnc9f693a4e222"
	}
}

$.ajax(fitnessCal).done(function (response) {
	console.log(response);
});