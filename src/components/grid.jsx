import React, { useState, useRef, useCallback} from "react";



function generateGrid(width, height) {
  const grid = generateEmptyGrid(width, height)
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = Math.floor(Math.random() * 100);
      let value = 0;
      if (pos < 5) {
        value = 1;
      }
      grid[i][j] = value;
    }
  }
  return grid;
}

function generateEmptyGrid(width, height) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    grid.push(Array.from(Array(width), () => 0));
  }
  return grid;
}

function calculateLivingNeighbors(grid, i, j) {
  let livingNeighbors = 0;
  const height = grid.length;
  const width = grid[0].length;
  const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  dirs.forEach(([x, y]) => {
    const newI = i + x;
    const newJ = j + y;
    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width) {
      livingNeighbors += grid[newI][newJ];
    }
  });

  return livingNeighbors;
}


function Grid({width, height}){
    const [isRunning, setIsRunning] = useState(false);
    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;
    
    const [grid, setGrid] = useState(generateGrid(width, height));
    const gridRef = useRef(grid);
    gridRef.current = grid;
    
    const [frequency, setFrequency] = useState(1000);

    const run = useCallback(() => {
      if (!isRunningRef.current) {
        return;
      }

      let newGrid = generateEmptyGrid(width, height);

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const livingNeighbors = calculateLivingNeighbors(gridRef.current, i, j);
          if (gridRef.current[i][j] === 1) {
            if (livingNeighbors === 2 || livingNeighbors === 3) {
              newGrid[i][j] = 1;
            } else {
              newGrid[i][j] = 0;
            }
          } else {
            if (livingNeighbors === 3) {
              newGrid[i][j] = 1;
            }
          }
        }
      }
      setGrid(newGrid);
      gridRef.current = newGrid;
      setTimeout(run, frequency);
    }, [grid, frequency, width, height]);
  

    return (
      <>
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
                    // onClick={() => {
                    //   const newGrid = produce(grid, gridCopy => {
                    //     gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    //   });
                    //   setGrid(newGrid);
                    // }}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: grid[i][k] ? "pink" : undefined,
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

