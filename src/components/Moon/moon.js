import { h, Component } from 'preact';
import $ from 'jquery';
import { route } from 'preact-router';
import { OpenWeatherMap as OWM } from '../api';
import Button from '../Button/Button';
import common from '../common.less';
import style from './moon.less';
import TempBanner from '../TempBanner/TempBanner';
import 'regenerator-runtime/runtime';


class Calendar extends Component {

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      month: today.getMonth(),
      year: today.getFullYear(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      moonPhases: {},
    };
  }

  componentDidMount() {
    this.fetchMoonPhases();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month || prevState.year !== this.state.year) {
      this.fetchMoonPhases();
    }
  }

  fetchMoonPhases = async () => {
    const { month, year } = this.state;
    const url = 'https://aa.usno.navy.mil/api/moon/phases/date?date=2023-03-01&nump=31';
	$.getJSON('https://aa.usno.navy.mil/api/moon/phases/date?date=2023-03-01&nump=31', function(data){
		console.log(data);
	});
    const response = await fetch(url);
    const data = await response.json();
    const moonPhases = {};
    data.phasedata.forEach((phase) => {
      moonPhases[new Date(phase.date).getDate()] = phase.phase;
    });
    this.setState({ moonPhases });
  };

  getDaysInMonth = () => {
    const { month, year } = this.state;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    for (let i = 0; i < firstDay; i++) {
      days.unshift(null);
    }
    return days;
  };

  prevMonth = () => {
    const { month, year } = this.state;
    if (month === 0) {
      this.setState({
        month: 11,
        year: year - 1,
      });
    } else {
      this.setState({
        month: month - 1,
      });
    }
  };

  nextMonth = () => {
    const { month, year } = this.state;
    if (month === 11) {
      this.setState({
        month: 0,
        year: year + 1,
      });
    } else {
      this.setState({
        month: month + 1,
      });
    }
  };

  selectDate = (date) => {
    console.log(date);
  };

  render() {
    const { month, year, daysOfWeek, moonPhases } = this.state;
    const daysInMonth = this.getDaysInMonth();
    return (
      <div>
        <h2>{`${month + 1}/${year}`}</h2>
        <button onClick={this.prevMonth}>{'<'}</button>
        <button onClick={this.nextMonth}>{'>'}</button>
        <table>
			<thead>
				<tr>
				{daysOfWeek.map((day) => (
					<th key={day}>{day}</th>
				))}
				</tr>
			</thead>	
		</table>
			<tbody>
			{/*	
			{daysInMonth.map((day, index) => (
					<td key={index} className={day ? 'active' : ''} onClick={() => day && this.selectDate(day)}>
						{day ? day.getDate() : ''}
						{moonPhases[day?.getDate()]}
					</td>
				))}
			*/}
			</tbody>
	  </div>
  	)}

}
                    
export default class Moon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.owm_id = OWM.addListener(() => {
      console.log('Moon called');
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    OWM.removeListener(this.owm_id);
  }

  selectDate = (date) => {
    console.log(date);
  }

  render() {
    return (
      <div class={common.container}>
        <TempBanner />
        <Button text="Home Page" pointer={() => route('/')} />
        <Calendar class={style.calendar} selectDate={this.selectDate} />
      </div>
    );
  }
}
