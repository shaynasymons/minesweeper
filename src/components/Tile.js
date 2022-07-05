import'./Tile.css';

const Tile = props => {
    return (
            <div className="tile" onClick={(e) => props.onTileClick(e)}></div>
    );
}

export default Tile;