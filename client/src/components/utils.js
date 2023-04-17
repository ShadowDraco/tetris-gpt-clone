// Checks if the block collides with the walls or other blocks on the board
export const collides = (block, board) => {
	const { shape, position } = block

	for (let row = 0; row < shape.length; row++) {
		for (let col = 0; col < shape[0].length; col++) {
			const blockCell = shape[row][col]

			if (blockCell !== 0) {
				const boardRow = position.y + row
				const boardCol = position.x + col

				if (
					boardRow < 0 ||
					boardRow >= board.length ||
					boardCol < 0 ||
					boardCol >= board[0].length ||
					board[boardRow][boardCol] !== 0
				) {
					return true
				}
			}
		}
	}
}

export const createEmptyBoard = () => {
	const rows = 20
	const cols = 10
	return Array.from({ length: rows }, () => Array(cols).fill(0))
}

// Returns a new block object with the specified position and shape
const createBlock = (position, shape, isFalling = true) => {
	return { position, shape, isFalling }
}
// Returns a new block object with a random shape and starting position
export const generateRandomBlock = () => {
	const shapes = [
		// Shape I
		[
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0],
		],
		[
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],

		// Shape J
		[
			[0, 0, 1],
			[0, 0, 1],
			[0, 1, 1],
		],
		[
			[0, 0, 0],
			[0, 1, 0],
			[0, 1, 1],
			[0, 1, 0],
		],

		// Shape L
		[
			[1, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
		[
			[0, 0, 0],
			[0, 0, 1],
			[0, 1, 1],
			[0, 0, 1],
		],

		// Shape O
		[
			[1, 1],
			[1, 1],
		],

		// Shape S
		[
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		],
		[
			[1, 0, 0],
			[1, 1, 0],
			[0, 1, 0],
		],

		// Shape T
		[
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0],
		],
		[
			[0, 1, 0],
			[0, 1, 1],
			[0, 1, 0],
		],
		[
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
		[
			[0, 1, 0],
			[1, 1, 0],
			[0, 1, 0],
		],

		// Shape Z
		[
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		],
		[
			[0, 1, 0],
			[1, 1, 0],
			[1, 0, 0],
		],
	]

	const shape = shapes[Math.floor(Math.random() * shapes.length)]
	const position = { x: 4, y: 0 }

	return createBlock(position, shape)
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
	return createBlock(newPosition, block.shape, block.isFalling)
}

// Adds the current block to the board and returns a new board state
export const addBlockToBoard = (block, board) => {
	const newBoard = board.map(row => [...row])
	block.shape.forEach((row, rowIndex) => {
		row.forEach((cell, cellIndex) => {
			if (cell !== 0) {
				const y = block.position.y + rowIndex
				const x = block.position.x + cellIndex
				const color = block.isFalling ? 'rgba(0, 0, 0, 0.3)' : 'black'
				newBoard[y][x] = color
			}
		})
	})
	return newBoard
}
