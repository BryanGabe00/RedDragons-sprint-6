import React, { useLayoutEffect, useState } from "react";

const createArray = length => [...Array(length)];

function MosaicBtn() {
	/* SETUP STATEFULNESS */
	const [clicked, setClicked] = useState(false);
	const [radius, setRadius] = useState('0px');
	const [text, setText] = useState('#');
	const [color, setColor] = useState('0,0,0');
	const [bgColor, setBGColor] = useState('255,255,255');

	/* RANDOMIZE ON FIRST RENDER */
	useLayoutEffect(() => {
		setRadius(genRadius());
		setText(genLetter());

		let textColor = genColor();
		let bgColor = genColor();
		while (!validateColors(textColor, bgColor)) {
			textColor = genColor();
			bgColor = genColor();
		}
		setColor(textColor);
		setBGColor(bgColor);
	}, []);

	/* GENERATE A RANDOM UPPERCASE LETTER */
	const genLetter = () => {
		let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
		'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		let letterIndex = Math.round(Math.random()*(letters.length - 1));
		return letters[letterIndex];
	}

	/* GENERATE A RADIUS VALUE OF 0px OR 50px */
	const genRadius = () => {
		let radius = Math.round(Math.random())*50;
		return `${radius}px`;
	}

	/* GENERATE A RANDOM RGB COLOR VALUE */
	const genColor = () => {
		let colorArray = Array(3).fill(0).map(
			x => x = Math.round(Math.random()*255)
		);
		return colorArray.toString();
	}

	/* INDICATE WHETHER TEXT AND BACKGROUND COLORS CONTRAST WELL*/
	const validateColors = (text, bg) => {
		/* CONVERT RGB STRINGS TO ARRAYS, CONVERT RGB VALUES TO LINEAR VALUES */
		let getColor = x => x / 255;

		/* APPLY GAMMA CORRECTION TO EACH COLOR */
		let gammaCorrect = x => {
			if (x < 0.03928) {
				return x / 12.92;
			} else {
				let mod = (x + 0.055) / 1.055;
				return (mod**2.4);
			}
		}
		let textColor = text.split(',').map(getColor).map(gammaCorrect);
		let bgColor = bg.split(',').map(getColor).map(gammaCorrect);
		
		/* CALCULATE LUMINANCE OF EACH COLOR */
		let calcLum = color => {
			return (color[0]*0.2126) + (color[1]*0.7152) + (color[2]*0.0722);
		}
		let textLum = calcLum(textColor);
		let bgLum = calcLum(bgColor);

		/* CALCULATE COLOR CONTRAST */
		let score = (textLum > bgLum) ? (textLum + 0.05) / (bgLum + 0.05) : (bgLum + 0.05) / (textLum + 0.05);

		/* RETURN TRUE/FALSE BASED ON CONTRAST */
		return (score > 3 ? true : false);
	}

	/* RETURN ELEMENT */
	return (
		<button 
			className='box'
			style={{
				backgroundColor: (clicked) ? 'yellow' : `rgb(${bgColor})`,
				color: (clicked) ? 'black' : `rgb(${color})`,
				borderRadius: (clicked) ? '50px' : radius
			}}
			onClick={() => setClicked(!clicked)}
		>
			{(clicked) ? ':)' : text}
		</button>
	);
}

function MosaicRow() {
	/* RETURN ELEMENT */
	return (
		<div>
			{createArray(12).map( (b, i) => (
				<MosaicBtn key={i} />
			))}
			<div className='clearfix' />
		</div>
	);
}

function Clock() {
	const [date] = useState(new Date());
	/* RETURN ELEMENT */
}

function Mosaic() {
	const [updates, setUpdates] = useState(0);
	/* RETURN ELEMENT */
	return (
		<>
			{createArray(12).map( (r, i) => (
				<MosaicRow key={i + updates} />
			))}
			<button onClick={() => setUpdates(updates + 12)}>
				Randomize!
			</button>
		</>
	);
}

export default function App() {
	return <Mosaic />;
}