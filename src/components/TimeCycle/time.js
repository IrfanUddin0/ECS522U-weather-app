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
						<p class={style.morning_title}>Morning</p>
						<table class={style.detail_table}>
							<tr>
								<td class={style.morningDetails}>
									<ul>
										<li>Blue Hour</li>
										<li>Sunrise</li>
										<li>Solar Noon</li>
									</ul>
								</td>
								<td>
									<ul class={style.right_details}>
										<li>Blue Hour</li>
										<li>{util.formatTime(OWM.sunrise)}</li>
										<li>Solar Noon</li>
									</ul>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class={common.box}>
					<div class={style.detail_container}>
						<p>Evening</p>
						<table class={style.detail_table}>
							<tr>
								<td class={style.morningDetails}>
									<ul>
										<li>Golden Hour</li>
										<li>Sunset</li>
										<li>Blue Hour</li>
									</ul>
								</td>
								<td>
									<ul class={style.right_details}>
										<li>{util.formatTime(OWM.sunset-3660)} - {util.formatTime(OWM.sunset)}</li>
										<li>{util.formatTime(OWM.sunset)}</li>
										<li>{util.formatTime(OWM.sunrise-2400)} - {util.formatTime(OWM.sunrise-1200)}</li>
									</ul>
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