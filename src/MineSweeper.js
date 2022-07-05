import React from 'react';
import Board from './components/Board';
import Select from './components/UI/Select';

import './MineSweeper.css';

function MineSweeper() {
    const [mode, setMode] = React.useState(9); //Eventually will be updated based off user selection
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
      setTiles(tilesArr);
  }, [mode]);

  const changeModeHandler = e => {
    setMode(Number(e.target.value));
  };
  
  const modeOptions = [
    {value: 9, text: 'Beginner'},
    {value: 16, text: 'Intermediate'},
    {value: 25, text: 'Advanced'},
  ];

  return (
    <React.Fragment>
      <div className="controls">
        <Select id="mode" value={mode} label="Difficulty Level:" onChange={changeModeHandler} options={modeOptions} />
      </div>
      <Board mode={mode} tiles={tiles} />
    </React.Fragment>
  );
}

export default MineSweeper;
