import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'

import style from './TempBannerStyle'
import common from '../common'

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
				<p class={common.city_text}>{OWM.city}</p>

				<div class={style.banner}>
					<p class={style.temperature}>
						{Math.round(OWM.temp)}
						<p class={style.temp_unit}>°{OWM.getDegreeUnit()}</p>
					</p>
					
					<p class={style.clarity}> | {OWM.clarity}</p>
				</div>
				
			</div>
		);
    }
}