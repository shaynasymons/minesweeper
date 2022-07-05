import React from 'react';
import Board from './components/Board';
import Select from './components/UI/Select';

import './MineSweeper.css';

function MineSweeper() {
    const [mode, setMode] = React.useState(9); //Eventually will be updated based off user selection
    const [modeDisabled, setModeDisabled] = React.useState(false);
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
  
  const updateModeDisabled = _ => { 
    setModeDisabled(true);
  }

  const modeOptions = [
    {value: 9, text: 'Beginner'},
    {value: 16, text: 'Intermediate'},
    {value: 25, text: 'Advanced'},
  ];

  return (
    <React.Fragment>
      <div className="controls">
        <Select id="mode" value={mode} label="Difficulty Level:" onChange={changeModeHandler} options={modeOptions} disabled={modeDisabled} />
      </div>
      <Board mode={mode} tiles={tiles} updateModeDisabled={updateModeDisabled} />
    </React.Fragment>
  );
}

export default MineSweeper;
