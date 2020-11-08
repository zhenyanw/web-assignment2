import React from "react";
import Grid from "../components/grid";
import Board from "../components/borad";
import GameContextProvider from "../context/gameContextProvider"

function Play({width, height}){
    //return <Grid width={width} height={height}/>;
    return (
        <GameContextProvider>
    <Board width={width} height={height}/>
    </GameContextProvider>);
} 

export default Play;