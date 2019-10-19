import React, { useState } from "react";
import Axios from "axios";
import $ from "jquery";
//local
import "./Home.scss";

const Home = () => {
	const lastWeatherInfo = localStorage.getItem("weatherInfo");
	const lastLat = localStorage.getItem("lat");
	const lastLong = localStorage.getItem("long");

	const [stateLat, setStateLat] = useState("");
	const [stateLong, setStateLong] = useState("");
	const [stateWeatherInfo, setStateWeatherInfo] = useState(
		JSON.parse(lastWeatherInfo)
	);

	const handleChangeLat = e => {
		setStateLat(e.target.value);
	};
	const handleChangeLang = e => {
		setStateLong(e.target.value);
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
		localStorage.setItem("long", stateLong);
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
				longitude: stateLong,
				oneobservation: "true",
				app_id: APP_ID,
				app_code: APP_CODE,
			},
			success: responseSuccess,
		});
	};

	return (
		<div>
			<h1>Location</h1>
			<input
				type="text"
				value={stateLat}
				onChange={handleChangeLat}
				placeholder="lat"
			/>
			<input
				type="text"
				value={stateLong}
				onChange={handleChangeLang}
				placeholder="lang"
			/>
			<div>Lat: {stateLat || lastLat} </div>
			<div>Long: {stateLong || lastLong}</div>
			<button onClick={handleClick}>Submit</button>
			<div>
				Weather Info:
				<div>city: {stateWeatherInfo ? stateWeatherInfo.city : ""}</div>
				<div>
					country: {stateWeatherInfo ? stateWeatherInfo.country : ""}
				</div>
				<div>
					state: {stateWeatherInfo ? stateWeatherInfo.state : ""}
				</div>
				<div>
					description:{" "}
					{stateWeatherInfo ? stateWeatherInfo.description : ""}
				</div>
				<div>temp: {stateWeatherInfo ? stateWeatherInfo.temp : ""}</div>
				<img
					src={stateWeatherInfo ? stateWeatherInfo.icon : ""}
					alt="icon"
				/>
			</div>
		</div>
	);
};

export { Home };
