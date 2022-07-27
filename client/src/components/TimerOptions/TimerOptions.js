import React, { useState } from 'react';
import './TimerOptions.css';

const TimerOptions = ({ label, options, onSelect, selected }) => {
	const [clickedId, setClickedId] = useState(selected);

	const renderOptions = options.map( (option,i) => {
		return (
			<button 
				key={ option }
				className={ `${option === clickedId ? "active": ""}` }
				onClick={ () => 
					{
						setClickedId(option)
						onSelect(option)
					}
				}
			>
				{ option }
			</button>
		)
	});
	
	return (
		<div className="TimerOptions">
			<div className="sessionType">
				<span>{ label }</span>
			</div>
			<div className="timeSelector">
				{ renderOptions }
			</div>
		</div>
	)
}

export default TimerOptions;
