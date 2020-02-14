import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
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
		}
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
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			`${this.state.input}`
		)
			.then(function(response) {
    			console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    		}, 
    		function(err) {console.log('there was an error')}
		);
	}

	//PREDICT new??
	// app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
 	//      .then(generalModel => {
 	//        return generalModel.predict("@@sampleTrain");
 	//      })
 	//      .then(response => {
 	//        var concepts = response['outputs'][0]['data']['concepts']
 	//      })

	render() {
		return(
			<div className="tc">
				<Particles params={particlesOptions} className='particles'/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm 
					onInputChange={this.onInputChange} 
					onButtonSubmit={this.onButtonSubmit}/>
				<FaceRecognition imageUrl={this.state.imageUrl}/>
			</div>
		)
	}
}

export default App;