import Tile from './Tile';

import'./Board.css';

const Board = props => { 
    const tileClickHandler = (e) => { 
            e.currentTarget.classList.add('show');
    }

    return (
            <div id="gameBoard" className={`board board-${props.mode}`} onClick={props.updateModeDisabled}>
                {props.tiles && props.tiles.map((t) => (
                    <Tile key={t.id} onTileClick={tileClickHandler} />
                ))}
            </div>
    );
}

export default Board;