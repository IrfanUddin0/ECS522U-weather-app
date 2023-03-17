import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'

import style from './TempBannerStyle'

export default class TempBanner extends Component {
    constructor(props){
		super(props);
	}

    componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('TempBanner called')
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
	}

    render() {
        return (
			<div>
		  		<p>{OWM.test}</p>
				<p class={style.city_text}>{OWM.city}</p>

				<p class={style.temperature}>
					{Math.round(OWM.temp)}
					<p class={style.temp_unit}>°{OWM.getDegreeUnit()}</p>
				</p>
			</div>
		);
    }
}