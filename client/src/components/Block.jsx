const Block = ({ currentBlock }) => {
	if (!currentBlock) {
		return null
	}

	return currentBlock.shape.map((row, rowIndex) =>
		row.map((cell, cellIndex) =>
			cell === 1 ? (
				<div
					key={`${rowIndex}-${cellIndex}`}
					style={{
						position: 'absolute',
						left: `${(currentBlock.position.x + cellIndex) * 30 + 1}px`,
						top: `${(currentBlock.position.y + rowIndex) * 30 + 1}px`,
						width: '28px',
						height: '28px',
						backgroundColor: '#333',
						border: '1px solid #333',
					}}
				/>
			) : null
		)
	)
}
export default Block
