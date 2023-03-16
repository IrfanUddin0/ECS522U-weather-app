import {h, Component} from 'preact';

import { route } from 'preact-router';

import {OpenWeatherMap as OWM} from '../api'
import Button from '../Button/Button'

import style from './style';
import common from '../common';

const icon = new Image();
//icon.src = cloudy;

export default class Home extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('Home called')
			OWM.test += 1;
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
		console.log('Home unmounted', OWM.listeners)
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
		return (
			<div class={common.container}>
					<p class={ style.city_text }>{OWM.city}</p>
					<table>
						<tr>
							<td>
								{ /*html for temp */}
								<p class={ style.temp_style }>
									{Math.round(OWM.temp)}
									<p class={style.unit}>°{OWM.units=='metric' ? 'C' : "F"}</p>
								</p>
							</td>
							<td>
								<img class={style.cloud_icon} alt="cloud-icon"/>
								<p class={style.clarity}>{OWM.clarity}</p>
							</td>
							<td>
								<img class={style.rain_icon} alt="rain-icon"/>
								<p class={style.rain}>{OWM.rain}%</p>
							</td>
						</tr>
					</table>
					
					<p class={style.sunset}>Sunset: {this.formatTime(OWM.sunset)}</p>
					<p class={style.details}>Day length | {this.getTimeDelta(OWM.sunset, OWM.sunrise)} </p>

					<div class={ style.forecast }>
						<div>
							<p>Next 24 hours</p>
						</div>
						<div>
						</div>
					</div>
					
					<div class={style.weatherDetails}>
						<p class={style.visibility}>Visibility {OWM.visibility}m</p>
						<p class={style.humidity}>Humidity {OWM.humidity}%</p>
						<p class={style.pressure}>Pressure {OWM.pressure}mb</p>
					</div>
				<Button text="Morning details | Evening details" pointer={()=>route('/time')}/>
				<Button text="Sun details" pointer={()=>route('/sun')}/>
				<Button text="Moon cycle" pointer={()=>route('/moon')}/>
			</div>
		);
	}

}