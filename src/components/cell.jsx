import { rgbToHex } from "@material-ui/core";
import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Label, Input } from "reactstrap";
import GameContext from "../context/gameContext"
import {generateEmptyGrid, cellSize} from "../helper/helper"

function heatMapColor(deathCount) {
    if (deathCount >= 10) {
        return 'white'; 
    }
    const ratio = deathCount / 10;
    let b = (Math.round(Math.min(255, 255 * ratio / 0.5))).toString(16);
    let g = b;
    let r = (Math.round(Math.max(0, ratio - 0.5)) * 255) .toString(16);
    if (r.length == 1) {
        r = "0" + r;
    }
    if (g.length == 1) {
        g = "0" + g;
    }
    if (b.length == 1) {
        b = "0" + b;
    }
    return "#" + r + g + b;
}

function Cell({i, j, isHeatMap}) {
    const { isRunning, grid, setGrid,
        liveCellsCount, setLiveCellsCount,gridDeath, setGridDeath } = useContext(GameContext);

    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

    const gridRef = useRef(grid);
    gridRef.current = grid;

    const liveCellsRef = useRef(liveCellsCount);
    liveCellsRef.current = liveCellsCount;

    const gridDeathRef = useRef(gridDeath);
    gridDeathRef.current = gridDeath;

    const height = grid.length;
    const width = grid[0].length;

    const handleCellClick = useCallback((r, c) => {
        if (isRunningRef.current) {
            return;
        }
        const newGrid = generateEmptyGrid(width, height);
        const newGridDeath = generateEmptyGrid(width, height);
        let newCount = liveCellsRef.current;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                newGrid[i][j] = grid[i][j];
                newGridDeath[i][j] = gridDeath[i][j];
                if (i === r && j === c) {
                    if (grid[r][c]) {
                        newGrid[r][c] = 0;
                        newCount--;
                        newGridDeath[i][j]++;
                    } else {
                        newGrid[r][c] = 1;
                        newCount++;
                        newGridDeath[i][j]--;
                    }
                }
            }
        }
        setGrid(newGrid);
        gridRef.current = newGrid;
        setLiveCellsCount(newCount);
        liveCellsRef.current = newCount;
        setGridDeath(gridDeath);
        gridDeathRef.current = gridDeath;
    }, [grid, width, height])


    return (<div
        onClick={() => handleCellClick(i, j)}
        style={{
            width: cellSize(width),
            height: cellSize(width),
            backgroundColor: isHeatMap ? (grid[i][j] ? 'black' : heatMapColor(gridDeath[i][j])) :
            (grid[i][j] ? 'lightblue' : 'white'),
            border: "solid 1px black"
        }}
    />);

    

}

export default Cell