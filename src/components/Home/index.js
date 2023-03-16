import {h, Component} from 'preact';
import style from './style';
import $ from 'jquery';

import { route } from 'preact-router';

import Temp from '../WeatherData/Temp'
import Button from '../Button/Button'

const icon = new Image();
icon.src = cloudy;

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			city: 'London',
			units:'metric',
			weather_info: new Temp('London', 'metric') // temp data from API
		};

		//setInterval(() => {return this.updateTimer(this)}, 1000);
		setInterval(() => this.updateTimer(), 1500);
	}

	updateTimer()
	{
		//console.log(this)
		/*home.time = new Date();
		home.state.weather_info.fetchWeatherData();
		home.forceUpdate();*/

		this.state.weather_info.fetchWeatherData();
		this.forceUpdate();
	}

	formatTime(timeStr) {
        const time = new Date(timeStr * 1000);

        let hours = time.getHours();
        let minutes = time.getMinutes();

        // Add leading zero to single-digit minutes
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        // Determine AM/PM
        let ampm = "AM";
        if (hours > 12) {
            hours -= 12;
            ampm = "PM";
        }

        // Format time string
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return formattedTime;
    }

	getTimeDelta(time1, time2) {
		let diff = new Date(time1).getTime() - new Date(time2).getTime();
		let hours = Math.floor(diff / 3600);
		let minutes = Math.floor((diff % 3600) / 60);

		return hours + "h " + minutes + "m";
	}

	// the main render method for the iphone component
	render() {
		console.log("updating component");
		return (
			<div class={ style.container }>
				<div class={ style.content }>
					<p class={ style.city_text }>{this.state.city}</p>
					<table>
						<tr>
							<td>
								{ /*html for temp */}
								<p class={ style.temp_style }>
									{Math.round(this.state.weather_info.temp)}
									<p class={style.unit}>°{this.state.units=='metric' ? 'C' : "F"}</p>
								</p>
							</td>
							<td>
								<img class={style.cloud_icon} alt="cloud-icon"/>
								<p class={style.clarity}>{this.state.weather_info.clarity}</p>
							</td>
							<td>
								<img class={style.rain_icon} alt="rain-icon"/>
								<p class={style.rain}>{this.state.weather_info.rain}%</p>
							</td>
						</tr>
					</table>
					
					<p class={style.sunset}>Sunset: {this.formatTime(this.state.weather_info.sunset)}</p>
					<p class={style.details}>Day length | {this.getTimeDelta(this.state.weather_info.sunset, this.state.weather_info.sunrise)} </p>

					<div class={ style.forecast }>
						<div>
							<p>Next 24 hours</p>
						</div>
						<div>
						</div>
					</div>
					
					<div class={style.weatherDetails}>
						<p class={style.visibility}>Visibility {this.state.weather_info.visibility}m</p>
						<p class={style.humidity}>Humidity {this.state.weather_info.humidity}%</p>
						<p class={style.pressure}>Pressure {this.state.weather_info.pressure}mb</p>
					</div>
				</div>
				<Button text="Morning details | Evening details" pointer={()=>route('/time')}/>
				<Button text="Sun details" pointer={()=>route('/sun')}/>
				<Button text="Moon cycle" pointer={()=>route('/moon')}/>
			</div>
		);
	}

}