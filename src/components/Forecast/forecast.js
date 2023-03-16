import {h, Component} from 'preact';
import {OpenWeatherMap as OWM} from '../api'

import style from './style'

export default class Forecast extends Component{
    constructor(props){
        super(props);
    }

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('Forecast called')
			this.forceUpdate();
		});
	  }
	componentWillUnmount() {
		OWM.removeListener(this.owm_id);
		console.log('Forecast unmounted', OWM.listeners)
	}

    render()
    {
        return (
            <div class={style.forecast_outer}>
                {OWM.forecast.slice(0, 7).map(item =>{
                    return <div class={style.forecast_section}>{Math.round(item.temp)}°{OWM.units=='metric' ? 'C' : "F"}</div>
                })}
            </div>
        );
    }
}