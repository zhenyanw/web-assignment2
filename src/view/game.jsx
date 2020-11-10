import React from "react";
import Board from "../components/borad";
import Base from '../components/base';
import GameContextProvider from "../context/gameContextProvider"

function Game({ width, height }) {
    return (
        <GameContextProvider>
            <Base title="Game Page">
            <Board width={width} height={height} />
            </Base>
        </GameContextProvider>);
}

export default Game;