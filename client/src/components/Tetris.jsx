import React, { useState, useEffect } from 'react'
import { generateRandomBlock, collides, moveBlock } from './utils'

const Tetris = () => {
	const [board, setBoard] = useState([])
	const [currentBlock, setCurrentBlock] = useState(null)
	const [isGameOver, setIsGameOver] = useState(false)
	const [score, setScore] = useState(0)

	// create new board on game start
	useEffect(() => {
		const newBoard = Array.from({ length: 20 }, () =>
			Array.from({ length: 10 }, () => 0)
		)
		setBoard(newBoard)
		setCurrentBlock(generateRandomBlock())
	}, [])

	// game loop
	useEffect(() => {
		const interval = setInterval(() => {
			move('down')
		}, 1000)

		return () => clearInterval(interval)
	}, [currentBlock])

	const move = direction => {
		if (!currentBlock) {
			return
		}

		const newBlock = moveBlock(currentBlock, direction)

		if (collides(newBlock, board)) {
			if (direction === 'down') {
				const newBoard = [...board]
				currentBlock.shape.forEach((row, rowIndex) => {
					row.forEach((cell, cellIndex) => {
						if (cell === 1) {
							newBoard[currentBlock.position.y + rowIndex][
								currentBlock.position.x + cellIndex
							] = 1
						}
					})
				})
				setBoard(newBoard)
				setCurrentBlock(generateRandomBlock())
				updateScore()
				if (collides(currentBlock, board, -currentBlock.position.y)) {
					if (currentBlock.position.y < 1) {
						setIsGameOver(true)
					}
				}
			}
			return
		}

		setCurrentBlock(newBlock)
	}

	const handleKeyDown = event => {
		if (event.keyCode === 37) {
			move('left')
		} else if (event.keyCode === 39) {
			move('right')
		} else if (event.keyCode === 40) {
			move('down')
		} else if (event.keyCode === 38) {
			rotateBlock()
		}
	}

	const rotateBlock = () => {
		if (!currentBlock) {
			return
		}

		const rotatedBlock = {
			...currentBlock,
			shape: currentBlock.shape.map((row, rowIndex) =>
				row.map(
					(cell, cellIndex) =>
						currentBlock.shape[currentBlock.shape.length - 1 - cellIndex][
							rowIndex
						]
				)
			),
		}

		if (!collides(rotatedBlock, board)) {
			setCurrentBlock(rotatedBlock)
		}
	}

	const resetGame = () => {
		setIsGameOver(false)
		setScore(0)
		setBoard(
			Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => 0))
		)
		setCurrentBlock(generateRandomBlock())
	}

	const updateScore = () => {
		const completeRows = board.reduce((acc, row, index) => {
			if (row.every(cell => cell === 1)) {
				acc.push(index)
			}
			return acc
		}, [])

		if (completeRows.length > 0) {
			const newScore = score + 10 * completeRows.length
			setScore(newScore)

			const newBoard = board.filter(
				(row, index) => !completeRows.includes(index)
			)
			const emptyRows = Array.from({ length: completeRows.length }, () =>
				Array.from({ length: 10 }, () => 0)
			)
			setBoard([...emptyRows, ...newBoard])
		}
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					width: 'max-content',
					alignItems: 'center',
					justifyContent: 'space-evenly',
					gap: '2em',
				}}
			>
				<h1>Tetris</h1>
				<div>Score: {score}</div>
				{isGameOver && <div>Game Over</div>}
				<button onClick={resetGame}>Reset</button>
			</div>
			<div
				style={{
					position: 'relative',
					margin: '2em',
					border: '2px solid #333',
					width: '300px',
					height: '600px',
					boxSizing: 'border-box',
					display: 'grid',
					gridTemplateColumns: 'repeat(10, 1fr)',
					gridTemplateRows: 'repeat(20, 1fr)',
					gap: '1px',
					backgroundColor: '#333',
				}}
				onKeyDown={handleKeyDown}
				tabIndex='0'
			>
				{board.map((row, rowIndex) =>
					row.map((cell, cellIndex) => (
						<div
							key={`${rowIndex}-${cellIndex}`}
							style={{
								position: 'absolute',
								left: `${cellIndex * 30}px`,
								top: `${rowIndex * 30}px`,
								width: '30px',
								height: '30px',
								backgroundColor: cell === 1 ? 'blue' : 'transparent',
								border: '1px solid #555',
							}}
						/>
					))
				)}
				{currentBlock &&
					currentBlock.shape.map((row, rowIndex) =>
						row.map((cell, cellIndex) =>
							cell === 1 ? (
								<div
									key={`${rowIndex}-${cellIndex}`}
									style={{
										position: 'absolute',
										left: `${(currentBlock.position.x + cellIndex) * 30}px`,
										top: `${(currentBlock.position.y + rowIndex) * 30}px`,
										width: '28px',
										height: '28px',
										backgroundColor: 'red',
										border: '1px solid #333',
									}}
								/>
							) : null
						)
					)}

				<div
					style={{
						position: 'absolute',
						top: '20px',
						left: '20px',
						fontSize: '24px',
						fontWeight: 'bold',
					}}
				>
					SCORE: {score}
					{isGameOver && (
						<div
							style={{
								position: 'absolute',
								top: '100px',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								fontSize: '24px',
								fontWeight: 'bold',
								color: 'red',
							}}
						>
							GAME OVER
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Tetris
