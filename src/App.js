import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//local
import "./styles/app.scss";
import { Home, MapBox } from "./screens";
import { NavBar } from "./components/elements";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/mapbox" component={MapBox} />
				</Switch>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
