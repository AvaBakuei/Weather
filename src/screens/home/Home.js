import React, { useState } from "react";
import Axios from "axios";
import $ from "jquery";
//local
import "./Home.scss";

const Home = () => {
	const lastWeatherInfo = localStorage.getItem("weatherInfo");

	const [stateLat, setStateLat] = useState("");
	const [stateLng, setStateLng] = useState("");
	const [stateWeatherInfo, setStateWeatherInfo] = useState(
		JSON.parse(lastWeatherInfo)
	);

	const handleChangeLat = e => {
		setStateLat(e.target.value);
	};
	const handleChangeLang = e => {
		setStateLng(e.target.value);
	};

	const APP_ID = "U6Lh7y0gRKIcSjTlGUbS";
	const APP_CODE = "vFvDzzeTS8sulGz9UfTTqw";
	// Axios.get("https://weather.cit.api.here.com/weather/1.0/report.json", {
	// 	params: {
	// 		product: "observation",
	// 		latitude: "52.516",
	// 		longitude: "13.389",
	// 		oneobservation: "true",
	// 		app_id: APP_ID,
	// 		app_code: APP_CODE,
	// 	},
	// })
	// 	.then(response => {
	// 		console.log(response);
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});

	const responseSuccess = function(data) {
		console.log(data.observations);
		const location = data.observations.location;
		location.forEach(element => {
			const observation = element.observation;
			observation.forEach(el => {
				const weatherInfo = {
					city: el.city,
					country: el.country,
					state: el.state,
					description: el.description,
					temp: el.temperature,
					icon: el.iconLink,
				};

				setStateWeatherInfo(weatherInfo);
				localStorage.setItem(
					"weatherInfo",
					JSON.stringify(weatherInfo)
				);
			});
		});

		localStorage.setItem("lat", stateLat);
		localStorage.setItem("lng", stateLng);
	};
	const handleClick = () => {
		$.ajax({
			url: "https://weather.cit.api.here.com/weather/1.0/report.json",
			type: "GET",
			dataType: "jsonp",
			jsonp: "jsonpcallback",
			data: {
				product: "observation",
				latitude: stateLat,
				longitude: stateLng,
				oneobservation: "true",
				app_id: APP_ID,
				app_code: APP_CODE,
			},
			success: responseSuccess,
		});
	};

	return (
		<div className="weather">
			<img
				className="weather__bg"
				src={require("../../assets/images/bg.png")}
				alt="background"
			/>
			<div className="weather-info">
				<div className="weather-location">
					<h1>Weather Info</h1>
					<input
						className="weather-location__input"
						type="text"
						value={stateLat}
						onChange={handleChangeLat}
						placeholder="lat"
					/>
					<input
						className="weather-location__input"
						type="text"
						value={stateLng}
						onChange={handleChangeLang}
						placeholder="lang"
					/>
					<button
						className="weather-location__btn"
						onClick={handleClick}>
						Submit
					</button>
				</div>
				<div className="weather-observation">
					{stateWeatherInfo ? (
						<img src={stateWeatherInfo.icon} alt="icon" />
					) : (
						""
					)}
					{stateWeatherInfo ? (
						<div>
							City: <span>{stateWeatherInfo.city}</span>
						</div>
					) : (
						""
					)}
					{stateWeatherInfo ? (
						<div>
							Country: <span>{stateWeatherInfo.country}</span>
						</div>
					) : (
						""
					)}
					{stateWeatherInfo ? (
						<div>
							State: <span>{stateWeatherInfo.state}</span>
						</div>
					) : (
						""
					)}
					{stateWeatherInfo ? (
						<div>
							Description:{" "}
							<span>{stateWeatherInfo.description}</span>
						</div>
					) : (
						""
					)}
					{stateWeatherInfo ? (
						<div>
							Temp: <span>{stateWeatherInfo.temp}</span>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export { Home };
