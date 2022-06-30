import React, { useState } from 'react';
import './TimerOptions.css';

const TimerOptions = ({ label, options, selected, onSelect }) => {
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
		<div className="TimerOptions">
			<div className="sessionType">
				<span>{ label }</span>
			</div>
				<div className="timeSelector">
					{renderOptions}
				</div>
		</div>
	)
}

export default TimerOptions;
