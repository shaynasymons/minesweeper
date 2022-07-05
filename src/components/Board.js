import Tile from './Tile';

import'./Board.css';

const Board = props => {
    return (
            <div id="gameBoard" className={`board board-${props.mode}`}>
                {props.tiles && props.tiles.map((t) => (
                    <Tile key={t.id} />
                ))}
            </div>
    );
}

export default Board;