import React, { useState, useRef, useCallback, useEffect} from "react";
import {Label, Input} from "reactstrap";


function generateEmptyGrid(width, height) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    grid.push(Array.from(Array(width), () => 0));
  }
  return grid;
}

function calculateLiveNeighbors(grid, i, j) {
  let liveNeighbors = 0;
  const height = grid.length;
  const width = grid[0].length;
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  dirs.forEach(([x, y]) => {
    const newI = i + x;
    const newJ = j + y;
    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width) {
      liveNeighbors += grid[newI][newJ];
    }
  });

  return liveNeighbors;
}

function generateRamdonGrid(width, height) {
  let count = 0;
  const randomGrid = generateEmptyGrid(width, height)
      for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const pos = Math.floor(Math.random() * 100);
        let value = 0;
        if (pos < 5) {
          value = 1;
          count++;
        }
        randomGrid[i][j] = value;
      }
    }
  return [randomGrid, count];
}





function Grid({width, height}){
    const [isRunning, setIsRunning] = useState(false);
    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

    const gridInfo = generateRamdonGrid(width, height);
    const [grid, setGrid] = useState(gridInfo[0]);
    const gridRef = useRef(grid);
    gridRef.current = grid;

    const [liveCells, setLiveCells] = useState(gridInfo[1]);
    const liveCellsRef = useRef(liveCells);
    liveCellsRef.current = liveCells

    const [frequency, setFrequency] = useState(1000);

    const run = useCallback(() => {
      if (!isRunningRef.current) {
        return;
      }

      let newGrid = generateEmptyGrid(width, height);
      let newCount = liveCellsRef.current;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const liveNeighbors = calculateLiveNeighbors(gridRef.current, i, j);
          if (gridRef.current[i][j] === 1) {
            if (liveNeighbors === 2 || liveNeighbors === 3) {
              newGrid[i][j] = 1;
            } else {
              newGrid[i][j] = 0;
              newCount--;
            }
          } else {
            if (liveNeighbors === 3) {
              newGrid[i][j] = 1;
              newCount++;
            }
          }
        }
      }
      setGrid(newGrid);
      gridRef.current = newGrid;
      setLiveCells(newCount);
      liveCellsRef.current = newCount;
      
      setTimeout(run, frequency);
    }, [frequency, width, height]);

    const changeFreq = useCallback((freq) => {
      if (!isRunningRef.current && freq > 50 && freq <= 20000) {
        setFrequency(freq)
      }
    }, []);

    const handleCellClick = useCallback((r, c) => {
      if (isRunningRef.current) {
        return;
      }
      const newGrid = generateEmptyGrid(width, height);
      let newCount = liveCellsRef.current;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            newGrid[i][j] = grid[i][j];
            if (i === r && j === c) {
              if (grid[r][c]) {
                newGrid[r][c] = 0;
                newCount--;
              } else {
                newGrid[r][c] = 1;
                newCount++;
              }
            }
        }
      }
      setGrid(newGrid);
      gridRef.current = newGrid;
      setLiveCells(newCount);
      liveCellsRef.current = newCount;
    }, [grid, width, height])

    const handleReset = useCallback(() => {
      const girdInfo = generateRamdonGrid(width, height);
      
      setGrid(girdInfo[0]);
      gridRef.current = girdInfo[0];

      setLiveCells(girdInfo[1]);
      liveCellsRef.current = girdInfo[1];

    })

    return (
      <>
      <div>There are {liveCells} live cells</div>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
            if (!isRunning) {
              isRunningRef.current = true;
              run();
            }
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => {
          handleReset();
        }}
      >
        {"Reset"}
      </button>
      <Label for="frequency">SimulationFrequency</Label>
        <Input type="number" name="frequency" id="runFrequency" placeholder="50 to 2000ms"
        onChange={e => changeFreq(Number(e.target.value))}/>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${height}, 20px)`
          }}>
            {
                grid.map((rows, i) =>
                rows.map((col, k) => (
                    <div
                    key={`${i}-${k}`}
                    onClick={() => handleCellClick(i, k)}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: grid[i][k] === 1 ? "pink" : undefined,
                      border: "solid 1px black"
                    }}
                  />
                ))
              )}
        </div>
        </>
    )
}

export default Grid;
