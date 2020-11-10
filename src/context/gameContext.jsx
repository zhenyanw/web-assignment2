import React from "react";

const GameContext = React.createContext({
    isRunning: false,
    setIsRunning: () => { },
    grid: [],
    setGrid: () => { },
    liveCellsCount: 0,
    setLiveCellsCount: () => { },
    frequency: 1000,
    setFrequency: () => { },
    gridDeath: [],
    setGridDeath: () => {}
})

export default GameContext;