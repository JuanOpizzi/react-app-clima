import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PropTypes } from 'prop-types';
import getUrlWeatherByCity from '../../services/getUrlWeatherByCity';
import transformWeather from "./../../services/transformWeather";
// se pone llaves cuando al exportar no se utiliza la palabra "default"
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';

class  WeatherLocation extends Component {

	constructor(props) {
		super(props);
		const { city } = props;
		// this.state es el estado local (parcial) de nuestro componente que
		// va a ayudar que nuestro componente se renderice
		//? con 'this.' hago referencia a cosas que son propias del componente
		this.state = {
			city,
			data: null,
		}
	}

	componentDidMount() {
		console.log("componentDidMount");
		this.handleUpdateClick();		
	}
	

	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate");
	}
	

	handleUpdateClick = () => {
		// fetch trae los datos del server para poder
		// usarlos en nuestro navegador
		const api_weather = getUrlWeatherByCity(this.state.city);
		fetch(api_weather).then( resolve => {
			// esto va a devolver una promises, con los datos del clima que
			// recibo del server, sino hago esto solo voy a ver la informacion
			// de cabecera, pero no los datos que quiero
			return resolve.json();
		}).then(data => {
			const newWeather = transformWeather(data);
			//console.log(newWeather);
			//debugger;
			//! si no uso setState, la informacion no se actualiza nunca
			// No hace falta pasar todos los datos, solo los que se van a cambiar
			// es decir, no le paso city porque no lo voy a cambiar
			this.setState({ 
				data: newWeather,
			})
		});

	}
	render() {
		// aprovecho destructuring para no poner todo el tiempo this.state
		// no perder de vista a donde se hace referencia
		const { city, data } = this.state; 	
		return (
			<div className="weatherLocationCont">
				<Location city={city}></Location>
				{data ?
					<WeatherData data={data}></WeatherData> :
					<CircularProgress size={50}/>
				}
			</div>
		);
	}
}

WeatherLocation.propTypes = {
	 city: PropTypes.string.isRequired,
}

export default WeatherLocation;