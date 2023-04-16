// Checks if the block collides with the walls or other blocks on the board
export const collides = (block, board) => {
	const { shape, position } = block

	for (let row = 0; row < shape.length; row++) {
		for (let col = 0; col < shape[0].length; col++) {
			// Check if the block is outside the board boundaries
			if (
				position.x + col < 0 ||
				position.x + col >= board[0].length ||
				position.y + row >= board.length
			) {
				return true
			}

			// Check if the block collides with another block on the board
			if (
				shape[row][col] !== 0 &&
				board[position.y + row][position.x + col] !== 0
			) {
				return true
			}
		}
	}
	return false
}

export const createEmptyBoard = () => {
	const rows = 20
	const cols = 10
	return Array.from({ length: rows }, () => Array(cols).fill(0))
}

// Returns a new block object with the specified position and shape
const createBlock = (position, shape) => {
	return { position, shape }
}

// Returns a new block object with a random shape and starting position
export const generateRandomBlock = () => {
	const shapes = [
		[
			[1, 1],
			[1, 1],
		],
		[
			[1, 1, 1],
			[0, 1, 0],
		],
		[
			[0, 1, 1],
			[1, 1, 0],
		],
		[
			[1, 1, 0],
			[0, 1, 1],
		],
		[
			[1, 0, 0],
			[1, 1, 1],
		],
		[
			[0, 0, 1],
			[1, 1, 1],
		],
		[
			[1, 0, 0],
			[1, 0, 0],
			[1, 1, 1],
		],
	]
	const shape = shapes[Math.floor(Math.random() * shapes.length)]
	const position = { x: 4, y: 0 }
	return createBlock(position, shape, true)
}
// Returns a new block object with the specified position
export const moveBlock = (block, direction) => {
	const newPosition = { ...block.position }
	if (direction === 'left') {
		newPosition.x--
	} else if (direction === 'right') {
		newPosition.x++
	} else if (direction === 'down') {
		newPosition.y++
	}
	return createBlock(newPosition, block.shape, true)
}

// Adds the current block to the board and returns a new board state
export const addBlockToBoard = (block, board) => {
	const newBoard = board.map(row => [...row])
	block.shape.forEach((row, rowIndex) => {
		row.forEach((cell, cellIndex) => {
			if (cell !== 0) {
				const position = block.position
				if (position) {
					const y = position.y + rowIndex
					const x = position.x + cellIndex
					const color = block.isFalling ? 'rgba(0, 0, 0, 0.3)' : 'black'
					newBoard[y][x] = new Block(color, [position.x, position.y])
				}
			}
		})
	})
	return newBoard
}
