import React from 'react';

class MosaicBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			isClicked: false,
		};
		this.style = {
			textColor: "#000",
			bgColor: "#fff",
			radius: "0",
		};
	}

	generateLetter() {
		/*Selects and returns one letter randomly from the letters Array*/
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
		'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		const letterIndex = Math.round(Math.random()*(letters.length - 1));
		return letters[letterIndex];
	}

	generateColor() {
		/*Builds and returns a JS color hex value randomly using the colorVals Array*/
		const colorVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd',
		'e', 'f'];

		let colorValue = "#";
		for (let i = 0; i < 6; i++) {
			let colorIndex = Math.round(Math.random()*(colorVals.length - 1));
			colorValue += colorVals[colorIndex];
		}
		return colorValue;
	}

	generateRadius() {
		/*Returns a borderRadius value of 0 or 50px randomly*/
		const borderRadius = Math.round(Math.random())*50;
		return borderRadius + "px";
	}

	componentDidMount() {
		/*Updates this.style and this.state.text when component renders*/
		const letter = this.generateLetter();
		this.style.textColor = this.generateColor();
		this.style.bgColor = this.generateColor();
		this.style.radius = this.generateRadius();
		this.setState({text: letter});
	}

	render() {
		/*Renders a button with random text and colors OR a smiley-face*/
		let element;
		if (this.state.isClicked) {
			element = (
				<button
					style = {{
						color: "black",
						backgroundColor: "yellow",
						borderRadius: "50px",
					}}
					onClick = {() => this.setState({isClicked: false})}
				>
					{":)"}
				</button>
			);
		} else {
			element = (
				<button
					style = {{
						color: this.state.textColor,
						backgroundColor: this.style.bgColor,
						borderRadius: this.style.radius,
					}}
					onClick = {() => this.setState({isClicked: true})}
				>
					{this.state.text}
				</button>
			)
		}
		return element;
	}
}

class MosaicRow extends React.Component {
	render() {
		/*Renders a row of twelve MosaicBtn components*/
		return (
			<div>
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<MosaicBtn />
				<div className="clearfix" />
			</div>
		)
	}
}

class Mosaic extends React.Component {
	render() {
		/*Renders twelve rows of MosaicRow components*/
		return (
			<div>
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
				<MosaicRow className="row" />
			</div>
		);
	}
}

function App() {
	return <Mosaic className="mosaic" />
}

export default App;
