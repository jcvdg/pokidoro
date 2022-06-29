import React, { useState } from 'react';

const TimerOptions = ({ options, selected, onSelect }) => {
	const [clickedId, setClickedId] = useState(options[selected]);

	const renderOptions = options.map( (option) => {
		return (
			<button 
				key={option}
				className={ `${option===clickedId ? "active": ""}` }
				onClick={() => {
					setClickedId(option)
					onSelect(clickedId)
				}}
			>
				{option}
			</button>
		)
	});
	
	return (
		<>
			{renderOptions}
		</>
	)
}

export default TimerOptions;
