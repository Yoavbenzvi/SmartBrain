import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey: '2bcd9ce77860499e8ddcf71bd7d417a9'
});

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
	constructor() {
		super()

		this.state = {
			input: '',
			imageUrl: '',
			box: {},
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height),
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({
			box: box
		})
	}

	onInputChange = (event) => {
		this.setState({
			input: event.target.value
		})
	}

	onButtonSubmit = () => {
		this.setState({
			imageUrl: this.state.input
		})
		app.models.predict(Clarifai.FACE_DETECT_MODEL,`${this.state.input}`)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	render() {
		return(
			<div className="tc">
				<Particles params={particlesOptions} className='particles'/>
				<Navigation />
				<SignIn />
				<Logo />
				<Rank />
				<ImageLinkForm 
					onInputChange={this.onInputChange} 
					onButtonSubmit={this.onButtonSubmit}/>
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>
		)
	}
}

export default App;