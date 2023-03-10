import { h, render, Component } from 'preact';
import $ from 'jquery';

import style from './style';

class Temp extends Component{
    constructor(props){
        super(props);
        this.state = {city: props.city, units:props.units, temp: ""};
    }

    componentDidMount()
    {
        this.fetchWeatherData();
    }

    render()
    {
        return (
            <a class={ style.temp_style }>
                {this.state.temp ? this.state.temp : "API ERROR"}
            </a>
        )
    }

    // a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?q="+ this.state.city +"&units="+this.state.units+"&appid=42b2b12795d0e8746b90586151f0e9be";
        console.log(url);
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

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}

export default Temp;