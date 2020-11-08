import React, { useState, useCallback} from "react";
import GameContext from "./gameContext"
const GameContextProvider = (props) => {

    const width = props.width;

    const [running, setRunning] = useState(false);
    const setIsRunnig = useCallback((status) => {
        setRunning(status)
    })
    

    const [gameGrid, setGameGrid] = useState([]);
    const setGrid = useCallback((newGrid) => {
        setGameGrid(newGrid);
    })

    const [count, setCount] = useState(0);
    const setLiveCellsCount = useCallback((count) => {
        setCount(count);
    })

    const [frequency, setFreq] = useState(1000);
    const setFrequency = useCallback((freq) => {
        setFreq(freq);
    })

    const initState = {
        isRunning: running,
        setIsRunning: setIsRunnig,
        grid: gameGrid,
        setGrid: setGrid,
        liveCellsCount: count,
        setLiveCellsCount: setLiveCellsCount,
        frequency: frequency,
        setFrequency: setFrequency
    } 

  
    return (
      <GameContext.Provider value={initState}>
        {props.children}
      </GameContext.Provider>
    )
  }

export default GameContextProvider;