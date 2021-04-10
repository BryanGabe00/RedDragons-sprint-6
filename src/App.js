import React from 'react';

class MosaicBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			text: "",
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
		/*Builds and returns a JS color rgb value randomly using JS Math library*/
		let colorArray = Array(3).fill(0).map(
			x => x = Math.round(Math.random()*255)
		);
		return colorArray.toString();
	}

	compareColors(text, bg) {
		/*Checks whether text and bg colors contrast well
		*this algorithm comes from css-tricks.com (see full link in README.md)*/
		
		/*convert rgb values to linear values between 0 and 1*/
		let getColor = x => x / 255;
		let textColor = text.split(',').map(getColor);
		let bgColor = bg.split(',').map(getColor);

		/*apply gamma correction to values*/
		let gammaCorrect = x => {
			if (x < 0.03928) {
				return x / 12.92;
			} else {
				let mod = (x + 0.055) / 1.055;
				return (mod**2.4);
			}
		}
		textColor = textColor.map(gammaCorrect);
		bgColor = bgColor.map(gammaCorrect);

		/*calculate luminance*/
		let calcLum = color => {
			return (color[0]*0.2126) + (color[1]*0.7152) + (color[2]*0.0722);
		}
		let textLum = calcLum(textColor);
		let bgLum = calcLum(bgColor);

		/*calculate contrast*/
		let score = 0;
		if (textLum > bgLum) {
			score = (textLum + 0.05) / (bgLum + 0.05);
		} else {
			score = (bgLum + 0.05) / (textLum + 0.05);
		}
		/*indicate whether contrast is sufficient*/
		return (score > 3 ? true : false);
	}

	generateRadius() {
		/*Returns a borderRadius value of 0 or 50px randomly*/
		const borderRadius = Math.round(Math.random())*50;
		return borderRadius + "px";
	}

	renderSmile() {
		/*Returns a button formatted to look like a smile*/
		return (
			<button className = "box"
				style = {{
					color: "black",
					backgroundColor: "yellow",
					borderRadius: "50px"
				}}
				onClick = {() => this.setState({isClicked: false})}
			>
				:)
			</button>
		);
	}

	renderState() {
		/*Returns a button formatted according to the MosaicBtn state*/
		return (
			<button	className = "box"
				style = {{
					color: "rgb(" + this.state.textColor + ")",
					backgroundColor: "rgb(" + this.state.bgColor + ")",
					borderRadius: this.state.radius
				}}
				onClick = {() => this.setState({isClicked: true})}
			>
				{this.state.text}
			</button>
		);
	}

	componentDidMount() {
		/*Updates this.state when component renders*/

		/*set letter and radius*/
		const letter = this.generateLetter();
		const radius = this.generateRadius();

		/*set contrasting colors*/
		let textColor = this.generateColor();
		let bgColor = this.generateColor();
		while (!this.compareColors(textColor, bgColor)) {
			textColor = this.generateColor();
			bgColor = this.generateColor();
		}

		this.setState({
			text: letter,
			radius: radius,
			textColor: textColor,
			bgColor: bgColor,
		});
	}

	render() {
		/*Renders a button with random text and colors OR a smiley-face*/
		let element;
		if (this.state.isClicked) {
			element = this.renderSmile();
		} else {
			element = this.renderState();
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
	constructor(props) {
		super(props);
		this.state = {rowIDs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]};
		this.currentRow = 0;
	}

	renderRow() {
		/*Returns a single pre-configured <MosaicRow /> component*/
		let index = this.currentRow;
		this.currentRow = (this.currentRow + 1) % 12;
		return (
			<MosaicRow className = "row"
				key = {this.state.rowIDs[index]}
			/>
		);
	}

	randomize() {
		/*Updates the rowIDs Array when called*/
		let newArray = this.state.rowIDs.map(x => x + 12)
		this.setState({rowIDs: newArray});
	}

	render() {
		/*Renders twelve rows of MosaicRow components*/
		return (
			<>
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				{this.renderRow()}
				<button className = "uiButton"
					onClick = {() => this.randomize()}
				>
					Randomize!
				</button>
			</>
		);
	}
}

function App() {
	return <Mosaic className="mosaic" />
}

export default App;
