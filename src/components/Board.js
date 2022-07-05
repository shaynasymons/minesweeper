import React from 'react';
import Modal from './UI/Modal';
import Tile from './Tile';

import'./Board.css';

const Board = props => { 
    const [gameIsOver, setGameIsOver] = React.useState(false);

    /**
     * Remove the modal and reset the game.
     **/
    const gameOverHandler = () => {
        setGameIsOver(false);
        props.gameOver();
    };

    /**
     * Returns indices of neighbors to a tile.
     *
     * @param {number} mode The selected mode as a number value.
     * @param {number} id The index of a tile within the seeded tiles array as a number value.
     * @return {Array} The indices of neighboring tiles in the seeded tiles array.
     **/
    const getTileNeighbors = (mode, id) => { 
        let top = props.tiles[id].row - 1;
        let right = props.tiles[id].col + 1;
        let bottom = props.tiles[id].row + 1;
        let left = props.tiles[id].col - 1;
        let returnArr = [];

        //top 
        if (top >= 0) { 
            //left
            if (left >= 0) {
                let topLeftIndex = id - mode - 1;
                returnArr.push(topLeftIndex);
            }

            //center
            let topCenterIndex = id - mode;
            returnArr.push(topCenterIndex);

            //right
            if (right <= mode - 1) { 
                let topRightIndex = id - mode + 1;
                returnArr.push(topRightIndex);
            }
        }

        //left
        if (left >= 0) {
            let leftIndex = id - 1;
            returnArr.push(leftIndex);
        }

        //right
        if (right <= mode - 1) { 
            let rightIndex = id + 1;
            returnArr.push(rightIndex);
        }
        
        //bottom
        if (bottom <= mode - 1) { 
            //left
            if (left >= 0) {
                let bottomLeftIndex = id + mode - 1;
                returnArr.push(bottomLeftIndex);
            } 

            //center
            let bottomCenterIndex = id + mode;
            returnArr.push(bottomCenterIndex);

            //right
            if (right <= mode - 1) { 
                let bottomRightIndex = id + mode + 1;
                returnArr.push(bottomRightIndex);
            }
        }

        return returnArr;
    }

     /**
     * Returns the count of neighboring tiles that are mines.
     * 
     * @param {Array} arr The indices of tiles to check within the seeded tiles array.
     * @return {number} The number of neighboring tiles that are mines.
     **/
    const getTileNeighborMines = (arr) => { 
        let mineCount = 0;

        arr.forEach((t) => { 
            if (props.tiles[t].isMine === true) {
                mineCount++;
            }
        });

        return mineCount;
    }

     /**
     * Populates and shows a clicked tile's neighbors.
     * 
     * Populating tiles is O(n2), so I am doing it on click since it should statistically be run less that way.
     * 
     * @param {Array} arr The indices of a clicked tile's neighbors within the seeded tiles array.
     **/
    const showTileNeighbors = (arr) => { 
        const board = document.getElementById('gameBoard');
        arr.forEach((t) => { 
            let tileData = props.tiles[t];
            let tileNeighborNeighbors = getTileNeighbors(props.mode, tileData.id); //Indices of neighbors
            let tileNeighborsMineCount = getTileNeighborMines(tileNeighborNeighbors); //Number of neighbor mines

            board.getElementsByClassName('tile')[tileData.id].classList.remove('hide');
            board.getElementsByClassName('tile')[tileData.id].classList.add('show', 'count-' + tileNeighborsMineCount);

            if (tileData.isMine === true) board.getElementsByClassName('tile')[tileData.id].classList.add('mine');
        });
    }

     /**
     * Handles a tile click.
     *
     * @param {event} e The event object.
     * @param {number} id The index of a tile within the seeded tiles array as a number value.
     * @param {boolean} isMine The isMine boolean value of the tile within the seeded tiles array.
     **/
    const tileClickHandler = (e, id, isMine) => { 
        if(e.currentTarget.classList.contains('hide')) { //Only run on previously hidden tiles
            let tileNeighbors = getTileNeighbors(props.mode, id); //Indices of neighbors
            let tileNeighborsMineCount = getTileNeighborMines(tileNeighbors); //Number of neighbor mines

            e.currentTarget.classList.remove('hide');
            e.currentTarget.classList.add('show', 'count-' + tileNeighborsMineCount);

            if (isMine) {
                e.currentTarget.classList.add('mine');
                setGameIsOver(true); //show the game over modal
            } 

            showTileNeighbors(tileNeighbors); //show this tile's neighbors
        }
    }

    return ( 
        <React.Fragment>
            {gameIsOver && (
                <Modal title="&#128165; B O O M ! &#128165;" message="You hit a mine! Game over!" onConfirm={gameOverHandler} buttontext="Play Again" />
            )} 
            <div id="gameBoard" className={`board board-${props.mode}`} onClick={props.updateModeDisabled}>
                {props.tiles && props.tiles.map((t) => (
                    <Tile key={t.id} id={t.id} isMine={t.isMine} onTileClick={tileClickHandler} />
                ))}
            </div>
        </React.Fragment>
    );
}

export default Board;