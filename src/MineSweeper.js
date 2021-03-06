import React from 'react';
import Controls from './components/Controls';
import Board from './components/Board';

/**
 * Returns tiles array randomly seeded with mines.
 *
 * @param {Array} arr The initial tiles array without mines.
 * @param {number} mode The selected mode as a number value.
 * @return {Array} Tiles array seeded with mines.
 **/
const seedTiles = (arr, mode) => {
    let minesSeeded = 0; 
    let tilesCount = arr.length;
    
    while (minesSeeded < mode) { 
        let random =  Math.floor((Math.random() * 1000) + 1) % tilesCount;
        if (!(arr[random].isMine)) {
            arr[random].isMine = true;
            minesSeeded++;
        }
    }

    return arr;
}
const MineSweeper = _ => { 
    const [modeDisabled, setModeDisabled] = React.useState(false);
    const [resetGame, setResetGame] = React.useReducer(x => x + 1, 0);
    const [mode, setMode] = React.useState(9);
    const [tiles, setTiles] = React.useState([]);

    React.useEffect(() => {
        let totalTiles = mode * mode; //total number of tiles is mode squared
        let tilesArr = []; //create the empty tiles array 
        let r = 0; //row counter
        let c = 0; //column counter
        for (let i = 0; i < totalTiles; i++) { 
            tilesArr.push({ 
                row: r,
                col: c,
                id: i, 
                isMine: false,
            });
            c++;
            if (c % mode === 0) { 
                r++;
                c = 0;
            }
           
        }
        let seededTiles = seedTiles(tilesArr, mode);
        setTiles(seededTiles);
    }, [mode, resetGame]);

    /**
     * Disabled mode selection after first tile click.
     **/
    const updateModeDisabled = _ => { 
        setModeDisabled(true);
    }

    /**
     * Update mode upon selection.
     **/
    const changeModeHandler = e => {
        setMode(Number(e.target.value));
    };

    /**
     * Reset the game.
     **/
    const resetGameHandler = _ => { 
        setResetGame();
        setModeDisabled(false);
    };

    return (
        <React.Fragment>
            <Controls mode={mode} disabled={modeDisabled} resetGameHandler={resetGameHandler} changeModeHandler={changeModeHandler} />
            <Board key={resetGame} mode={mode} updateModeDisabled={updateModeDisabled} gameOver={resetGameHandler} tiles={tiles} />
        </React.Fragment>
    );
}

export default MineSweeper;