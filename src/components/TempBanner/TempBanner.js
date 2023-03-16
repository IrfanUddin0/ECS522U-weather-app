import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'

import bannerStyle from './TempBannerStyle'

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
				<p class={bannerStyle.city_text}>{OWM.city}</p>

				<p class={ bannerStyle.temp_style }>
					{Math.round(OWM.temp)}
					<p class={bannerStyle.unit}>°{OWM.units=='metric' ? 'C' : "F"}</p>
				</p>
			</div>
		);
    }
}