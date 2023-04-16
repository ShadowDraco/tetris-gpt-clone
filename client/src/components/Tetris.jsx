import React, { useState, useEffect } from 'react'
import {
	generateRandomBlock,
	collides,
	moveBlock,
	addBlockToBoard,
} from './utils'
import Block from './Block'

const Tetris = () => {
	const [board, setBoard] = useState([])
	const [currentBlock, setCurrentBlock] = useState(null)
	const [isGameOver, setIsGameOver] = useState(false)
	const [score, setScore] = useState(0)

	useEffect(() => {
		const newBoard = Array.from({ length: 20 }, () =>
			Array.from({ length: 10 }, () => 0)
		)
		setBoard(newBoard)
		setCurrentBlock(generateRandomBlock())
	}, [])

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
				if (collides(currentBlock, board)) {
					setIsGameOver(true)
				}
			}
			return
		}

		setCurrentBlock(newBlock)
	}

	const updateScore = () => {
		const completeRows = board.filter(row => row.every(cell => cell === 1))
		if (completeRows.length > 0) {
			const numRows = completeRows.length
			const newScore = score + 10 * numRows
			setScore(newScore)
			const newBoard = completeRows.reduce(
				(acc, row) => {
					acc.unshift(Array.from({ length: 10 }, () => 0))
					return acc
				},
				[...board]
			)
			setBoard(newBoard)
		}
	}

	const handleKeyDown = event => {
		if (event.keyCode === 37) {
			move('left')
		} else if (event.keyCode === 39) {
			move('right')
		} else if (event.keyCode === 40) {
			move('down')
		}
	}

	return (
		<>
			<div>Score: {score}</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
				onKeyDown={handleKeyDown}
				tabIndex='0'
			>
				{isGameOver ? (
					<div>Game Over!</div>
				) : (
					<div style={{ position: 'relative' }}>
						{board.map((row, rowIndex) =>
							row.map((cell, cellIndex) =>
								cell === 1 ? (
									<Block
										key={`${rowIndex}-${cellIndex}`}
										x={cellIndex}
										y={rowIndex}
										shape={[[1]]}
									/>
								) : null
							)
						)}
						{currentBlock &&
							currentBlock.shape.map((row, rowIndex) =>
								row.map((cell, cellIndex) =>
									cell === 1 ? (
										<Block
											key={`${rowIndex}-${cellIndex}`}
											x={currentBlock.position.x + cellIndex}
											y={currentBlock.position.y + rowIndex}
											shape={[[1]]}
										/>
									) : null
								)
							)}
					</div>
				)}
			</div>
		</>
	)
}

export default Tetris
