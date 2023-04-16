const Block = ({ x, y, shape }) => {
	const blockStyle = {
		top: `${y * 20}px`,
		left: `${x * 20}px`,
		width: '20px',
		height: '20px',
		backgroundColor: 'red',
		border: '1px solid black',
		position: 'absolute',
	}

	return (
		<>
			{shape.map((row, rowIndex) =>
				row.map((cell, cellIndex) =>
					cell === 1 ? (
						<div key={`${rowIndex}-${cellIndex}`} style={blockStyle}></div>
					) : null
				)
			)}
		</>
	)
}
export default Block
