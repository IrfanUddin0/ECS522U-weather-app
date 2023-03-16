import {h, Component } from 'preact';

import {OpenWeatherMap as OWM} from '../api'
import Button from '../Button/Button'

import { route } from 'preact-router';

import common from '../common.less'
import TempBanner from '../TempBanner/TempBanner';

export default class Moon extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.owm_id = OWM.addListener(() => {
			console.log('Moon called')
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
				<Button text="Home Page" pointer={()=>route('/')}/>
			</div>
		);
	}

}
					