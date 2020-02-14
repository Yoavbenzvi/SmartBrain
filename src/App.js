import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
	particles: {
		number: {
			//amount of polygons
			value: 100,
			density: {
				enable: true,
				value_area: 800
			}
		}
    }
}

class App extends React.Component {
	render() {
		return(
			<div className="tc">
				<Particles params={particlesOptions} className='particles'/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm />
			</div>
		)
	}
}

export default App;