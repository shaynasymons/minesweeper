import'./Tile.css';

const Tile = props => {
    return (
            <div className="tile hide" onClick={(e) => props.onTileClick(e, props.id, props.isMine)}></div>
    );
}

export default Tile;