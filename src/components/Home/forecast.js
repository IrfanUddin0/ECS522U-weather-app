import {h, Component} from 'preact';
import {OpenWeatherMap as OWM} from '../api'

import style from './forecastStyle'

export default class Forecast extends Component{
    constructor(props){
        super(props);
    }

	componentDidMount() {
        console.log('Forecast loaded');
		this.interval = setInterval(() => {
            this.forceUpdate();
        }, 3 * 60 * 60 * 1000); // Weather forecast only updates every 3 hours
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

    render()
    {
        return (
            <div class={style.forecast_outer}>
                {OWM.forecast.map(item =>{
                    return <div class={style.forecast_section}>{Math.round(item.temp)}°{OWM.getDegreeUnit()}</div>
                })}
            </div>
        );
    }
}