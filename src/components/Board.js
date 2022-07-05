import React from 'react';
import Modal from './UI/Modal';
import Tile from './Tile';

import'./Board.css';

const Board = props => { 
    const [gameIsOver, setGameIsOver] = React.useState(false);

    const gameOverHandler = () => {
        setGameIsOver(false);
        props.gameOver();
    };

    const tileClickHandler = (e, id, isMine) => { 
        e.currentTarget.classList.add('show');
        if (isMine) {
            e.currentTarget.classList.add('mine');
            setGameIsOver(true); //show the game over modal
        }
    }

    return ( 
        <React.Fragment>
            {gameIsOver && (
                <Modal title="&#128165; B O O M ! &#128165;" message="You hit a mine! Game over!" onConfirm={gameOverHandler} buttontext="New Game" />
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