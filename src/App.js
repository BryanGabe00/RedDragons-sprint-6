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

	updateState() {
		/*Updates this.state when called*/
		const letter = this.generateLetter();
		const radius = this.generateRadius();
		const textColor = this.generateColor();
		const bgColor = this.generateColor();

		this.setState({
			text: letter,
			radius: radius,
			textColor: textColor,
			bgColor: bgColor,
		});
	}

	componentDidMount() {
		/*Updates this.state when component renders*/
		this.updateState();
	}

	render() {
		/*Renders a button with random text and colors OR a smiley-face*/
		let element;
		if (this.state.isClicked) {
			element = (
				<button
					className = "box"
					style = {{
						color: "black",
						backgroundColor: "yellow",
						borderRadius: "50px",
					}}
					onClick = {() => this.setState({isClicked: false})}
				>
					:)
				</button>
			);
		} else {
			element = (
				<button
					className = "box"
					style = {{
						color: this.state.textColor,
						backgroundColor: this.state.bgColor,
						borderRadius: this.state.radius,
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
	constructor(props) {
		super(props);
		this.state = {rowIDs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]};
		this.currentRow = 0
	}

	renderRow() {
		/*Returns a single pre-configured <MosaicRow /> component*/
		let index = this.currentRow
		this.currentRow = (this.currentRow + 1) % 12;
		return (
			<MosaicRow 
				className = "row"
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
				<button 
					className = "uiButton"
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
