import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

//local
import "./MapBox.scss";

const MapBox = () => {
	const Map = ReactMapboxGl({
		accessToken:
			"pk.eyJ1IjoiaXRpbmFhYXIiLCJhIjoiY2syOHo3cHYwMHVkYTNjcGJ5N2w5djZmaSJ9.9leIJZc8mrrsdqtowI7IIg",
	});
	return (
		<div>
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				className="map-view"
				containerStyle={{
					height: `calc(100vh - 48px)`,
					width: "100%",
				}}
				center={[51.389, 35.6892]}></Map>
			;
		</div>
	);
};

export { MapBox };
