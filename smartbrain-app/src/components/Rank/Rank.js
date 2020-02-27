import React from 'react';

const Rank = ({ name, entries, upperCaseInput }) => {

	return(
		<div>
			<div className='white f3'>
				{`${upperCaseInput(name)}, your current entry count is`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</div>
	)
}

export default Rank;