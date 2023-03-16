import {h, Component } from 'preact';
import style from './sunStyle';
import $ from 'jquery';

//import Temp from '../WeatherData/Temp'
import TempSingle from '../WeatherData/Temp'
import Button from '../Button/Button'

import { route } from 'preact-router';

export default class Sun extends Component {
	constructor(props){
		super(props);
		this.state.city = 'London'
		this.state.units = 'metric'
		TempSingle.debug()
	}


	// the main render method for the iphone component
	render() {
		return (
			<div class={ style.container }>
        <div>
          Sun Page
        </div>
				<div class={ style.content }>
					<p class={ style.city_text }>{this.state.city}</p>
					<Button text="Home Page" pointer={()=>route('/')}/>
				</div>
			</div>
		);
	}

}
//<Temp city={this.state.city} units={this.state.units}/><a class={style.unit}>°{this.state.units=='metric' ? 'C' : "F"}</a>
					