import { h, render, Component } from 'preact';
import style from './style';
import $ from 'jquery';

import Temp from '../WeatherData/Temp'

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state.city = 'London'
		this.state.units = 'metric'
	}
	// the main render method for the iphone component
	render() {
		return (
			<div class={ style.container }>
				<div class={ style.content }>
					<p>{this.state.city}</p>
					<Temp city={this.state.city} units={this.state.units}/>
				</div>
			</div>
		);
	}


}
