import $ from 'jquery';

class Temp {

    constructor(city, units){
		this.city = city;
		this.units = units;
		this.fetchWeatherData();
    }

	//static instance = new Temp('London', 'metric');

    // a call to fetch weather data via wunderground
	fetchWeatherData() {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+ this.city +"&units="+this.units+"&appid=42b2b12795d0e8746b90586151f0e9be";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

    parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var clarity = parsed_json['weather'][0]['main'];
		var rain = parsed_json['rain']&& parsed_json['rain']['1h'];
		var description = parsed_json['weather']['description'];
		var sunrise_time = parsed_json['sys']['sunrise']
		var sunset_time = parsed_json['sys']['sunset'];
		var visibility = parsed_json['visibility'];
		var humidity = parsed_json['main']['humidity'];
		var pressure = parsed_json['main']['pressure'];


		// set states for fields so they could be rendered later on
		this.locate = location;
		this.temp = temp_c;
		this.cond = conditions;
		this.clarity = clarity;
		if (rain) {
			this.rain = rain;
		} 
		this.desc = description;
		this.sunrise = sunrise_time;
		this.sunset = sunset_time;
		this.visibility = visibility;
		this.humidity = humidity;
		this.pressure = pressure;
	}
}

export default Temp;


const TempSingle = {

	city: '',
	units: '',

	debug() {
		console.log(city && units);
	},

    // a call to fetch weather data via wunderground
	fetchWeatherData() {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		if (city && units) {
			var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+units+"&appid=42b2b12795d0e8746b90586151f0e9be";
			$.ajax({
				url: url,
				dataType: "jsonp",
				success : parseResponse,
				error : function(req, err){ console.log('API call failed ' + err); }
			})
		}
	},

    parseResponse: function(parsed_json)  {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var clarity = parsed_json['weather'][0]['main'];
		var rain = parsed_json['rain']&& parsed_json['rain']['1h'];
		var description = parsed_json['weather']['description'];
		var sunrise_time = parsed_json['sys']['sunrise']
		var sunset_time = parsed_json['sys']['sunset'];
		var visibility = parsed_json['visibility'];
		var humidity = parsed_json['main']['humidity'];
		var pressure = parsed_json['main']['pressure'];


		// set states for fields so they could be rendered later on
		this.locate = location;
		this.temp = temp_c;
		this.cond = conditions;
		this.clarity = clarity;
		if (rain) {
			this.rain = rain;
		} 
		this.desc = description;
		this.sunrise = sunrise_time;
		this.sunset = sunset_time;
		this.visibility = visibility;
		this.humidity = humidity;
		this.pressure = pressure;

		setInterval(() => fetchWeatherData(), 1500);
	}
}