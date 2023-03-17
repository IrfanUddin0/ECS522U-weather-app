import {h, Component} from 'preact';

import { route } from 'preact-router';

import {OpenWeatherMap as OWM} from '../api'
import Button from '../Button/Button'
import Forecast from './forecast'

import style from './homeStyle';

// import images
import rain from '../../assets/icons/rain.png';
import clarity from '../../assets/icons/clarity.png';
import pressure from '../../assets/icons/pressure.png';
import humidity from '../../assets/icons/humidity.png';
import visibility from '../../assets/icons/visibility.png';

export default class Home extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('Home called')
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
		console.log('Home unmounted', OWM.listeners)
	}

	// the main render method for the iphone component
	render() {
		return (
			<div class={style.container}>
					<p class={style.city_text}>{OWM.city}</p>
					<table>
						<tr>
							<td>
								{ /*html for temp */}
								<p class={style.temperature}>
									{Math.round(OWM.temp)}
									<p class={style.temp_unit}>°{OWM.getDegreeUnit()}</p>
								</p>
							</td>
							<td class={style.td_center}>
								{console.log(clarity)}
								<img class={style.clarity_img} src={clarity} width="50" height="50" alt="cloud-icon"/>
								<p class={style.clarity}>{OWM.clarity}</p>
								
							</td>
							<td class={style.td_center}>
								<img class={style.rain_img}  src={rain}  width="50" height="50"alt="rain-icon"/>
								<p class={style.rain}>{OWM.rain}%</p>
							</td>
						</tr>
					</table>
					
					<p class={style.sunset}>Sunset | {this.formatTime(OWM.sunset)}</p>
					<p class={style.sunset}>Day length | {this.getTimeDelta(OWM.sunset, OWM.sunrise)}</p>

					<div class={ style.forecast }>
						<div>
							<p>Next 24 hours</p>
						</div>
						<Forecast/>
					</div>
					
					<div class={style.weatherDetails}>
						<div class={style.inner_detail_div}>
						    <img class={style.visibility_icon} src={visibility}  width="30" height="30"/>
							<p >Visibility {OWM.visibility}m</p>
						</div>
						<div class={style.inner_detail_div}>
							<img class={style.humidity_icon} src={humidity}  width="30" height="30"/>
							<p >Humidity {OWM.humidity}%</p>
					    </div>
						<div class={style.inner_detail_div}>
							<img class={style.pressure_icon} src={pressure}  width="30" height="30"/>
						     <p >Pressure {OWM.pressure}mb</p>
					    </div>
					</div>
				<Button text="Morning details | Evening details" pointer={()=>route('/time')}/>
				<Button text="Sun details" pointer={()=>route('/sun')}/>
				<Button text="Moon cycle" pointer={()=>route('/moon')}/>
			</div>
		);
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
}