import {h, Component } from 'preact';
import { route } from 'preact-router';

import Button from '../Button/Button'
import TempBanner from '../TempBanner/TempBanner';

import {OpenWeatherMap as OWM} from '../api'
import util from '../util'

import common from '../common.less'
import style from './timeStyle.less'


export default class TimeCycle extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('Morning/Evening called')
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}


	// the main render method for the iphone component
	render() {
		return (
			<div class={common.container}>
				<TempBanner />

				<div class={common.box}>
					<div class={style.detail_container}>
						<p class={style.title}>Morning</p>
						<table class={style.detail_table}>
							<tr>
								<td>
									<p class={style.left_morning_details}>Blue Hour</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise-2400)} - {util.formatTime(OWM.sunrise-1200)}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_morning_details}>Sunrise</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise)}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_morning_details}>Solar Noon</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunrise + (Math.abs(OWM.sunset-OWM.sunrise))/2)}</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class={common.box}>
					<div class={style.detail_container}>
						<p class={style.title}>Evening</p>
						<table class={style.detail_table}>
							<tr>
								<td>
									<p class={style.left_evening_details}>Golden Hour</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunset-3660)} - {util.formatTime(OWM.sunset)}</p>
								</td>
							</tr>
							<tr>
								<td>
									<p class={style.left_evening_details}>Sunset</p>
								</td>
								<td class={style.right_details}>
									<p>{util.formatTime(OWM.sunset)}</p>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<Button text="Home Page" pointer={()=>route('/')}/>
			</div>
		);
	}

}