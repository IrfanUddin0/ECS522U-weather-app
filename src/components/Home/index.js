import {h, Component } from 'preact';
import style from './style';
import $ from 'jquery';


import { route } from 'preact-router';

import Temp from '../WeatherData/Temp'
import Button from '../Button/Button'

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
					<p class={ style.city_text }>{this.state.city}</p>
					<Temp city={this.state.city} units={this.state.units}/><a class={style.unit}>°{this.state.units=='metric' ? 'C' : "F"}</a>

					
				</div>

				<Button text="Morning details | Evening details" pointer={()=>console.log("test")}/>
				<Button text="Sun details" pointer={()=>route('/sun')}/>
				<Button text="Moon cycle" pointer={()=>route('/moon')}/>
				<Button text="test" pointer={()=>console.log(Temp.state)}></Button>
			</div>
		);
	}

}
