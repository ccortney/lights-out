import Cell from "./Cell"
import {useState} from "react";
import "./Board.css";


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

 function Board({ nrows = 5, ncols = 5 }) {
    const [board, setBoard] = useState(createBoard());
  
    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
      let initialBoard = [];
      for (let i=0; i < nrows; i++) {
          let row = [];
          for (let j=0; j<ncols; j++) {
              let boolean = Math.random() < 0.5 ? true : false;
              row.push(boolean);
          }
          initialBoard.push(row);
      }
      return initialBoard;
    }
  
    //  check the board in state to determine whether the player has won.
    function hasWon() {
        for (let row of board) {
            if (row.includes(false)) {
                return false
            }
        }
        return true
    }
  
    function flipCellsAround(coord) {
      setBoard(oldBoard => {
        const [y, x] = coord.split("-").map(Number);
  
        const flipCell = (y, x, boardCopy) => {
          // if this coord is actually on board, flip it
  
          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
            boardCopy[y][x] = !boardCopy[y][x];
          }
        };
        
        // Make a (deep) copy of the oldBoard
        const boardCopy = oldBoard.map(row => [...row]);

        // In the copy, flip this cell and the cells around it
        flipCell(y, x, boardCopy);
        flipCell(y - 1, x, boardCopy);
        flipCell(y + 1, x, boardCopy);
        flipCell(y, x - 1, boardCopy);
        flipCell(y, x + 1, boardCopy);

        // Return the copy
        return boardCopy;
      });
    }

  
    // if the game is won, just show a winning msg & render nothing else
    if (hasWon() === true) {
        return (
            <div>
                <h1>YOU WON!</h1>
            </div>
        )
    }
    let tableBoard = [];

    for (let y=0; y < nrows; y++) {
        let row = [];
        for (let x=0; x<ncols; x++) {
            let coord = `${y}-${x}`;
            row.push(
                <Cell 
                    key={coord}
                    isLit={board[y][x]}
                    flipCellsAroundMe={() => flipCellsAround(coord)}
                />
            )
        }
        tableBoard.push(<tr key={y}>{row}</tr>)
    }

    return (
        <table className="Board">
            <tbody>{tableBoard}</tbody>
        </table>
    )
  
}
  
  export default Board;
  