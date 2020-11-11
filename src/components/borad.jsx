import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import GameContext from "../context/gameContext";
import blue from "@material-ui/core/colors/blue";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import Cell from "./cell";
import { generateEmptyGrid, cellSize } from "../helper/helper";

const styles = {
  liveCellText: {
    flexGrow: 1,
    color: blue[700],
  },
  input: {
    marginTop: 5,
    marginBottom: 20,
  },
};

const calculateLiveNeighbors = (grid, i, j) => {
  let liveNeighbors = 0;
  const height = grid.length;
  const width = grid[0].length;
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  dirs.forEach(([x, y]) => {
    const newI = i + x;
    const newJ = j + y;
    if (newI >= 0 && newI < height && newJ >= 0 && newJ < width) {
      liveNeighbors += grid[newI][newJ];
    }
  });

  return liveNeighbors;
};

const generateRamdonGrid = (width, height) => {
  let count = 0;
  const randomGrid = generateEmptyGrid(width, height);
  const gridDeath = generateEmptyGrid(width, height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pos = Math.floor(Math.random() * 100);
      let value = 0;
      if (pos < 5) {
        value = 1;
        count++;
      } else {
        gridDeath[i][j]++;
      }
      randomGrid[i][j] = value;
    }
  }
  return [randomGrid, count, gridDeath];
};

function Board({ width, height }) {
  const {
    isRunning,
    setIsRunning,
    grid,
    setGrid,
    liveCellsCount,
    setLiveCellsCount,
    frequency,
    setFrequency,
    gridDeath,
    setGridDeath,
  } = useContext(GameContext);

  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const liveCellsRef = useRef(liveCellsCount);
  liveCellsRef.current = liveCellsCount;

  const gridDeathRef = useRef(gridDeath);
  gridDeathRef.current = gridDeath;

  const [isHeatMap, setIsHeatMap] = useState(false);

  const [freqError, setFreqError] = useState("");

  useEffect(() => {
    const gridInfo = generateRamdonGrid(width, height);

    setGrid(gridInfo[0]);
    setLiveCellsCount(gridInfo[1]);
    setGridDeath(gridInfo[2]);
  }, []);

  const run = useCallback(() => {
    if (!isRunningRef.current) {
      return;
    }

    let newGrid = generateEmptyGrid(width, height);
    let newGridDeath = generateEmptyGrid(width, height);
    let newCount = liveCellsRef.current;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        newGridDeath[i][j] = gridDeathRef.current[i][j];
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
        if (newGrid[i][j] === 0) {
          newGridDeath[i][j]++;
        }
      }
    }
    setGrid(newGrid);
    gridRef.current = newGrid;
    setLiveCellsCount(newCount);
    liveCellsRef.current = newCount;
    setGridDeath(newGridDeath);
    gridDeathRef.current = newGridDeath;
    setTimeout(run, frequency);
  }, [frequency, width, height]);

  const changeFreq = useCallback((freq) => {
    if (freq < 50 || freq > 2000) {
      setFreqError(
        "Please input a valid frequency from 50 to 2000ms inclusive"
      );
    } else {
      setFreqError("");
      setFrequency(freq);
    }
  }, []);

  const handleReset = useCallback(() => {
    const girdInfo = generateRamdonGrid(width, height);

    setGrid(girdInfo[0]);
    gridRef.current = girdInfo[0];

    setLiveCellsCount(girdInfo[1]);
    liveCellsRef.current = girdInfo[1];

    setGridDeath(girdInfo[2]);
    gridDeathRef.current = girdInfo[2];
  });

  const handleHeatMap = useCallback(() => {
    if (isHeatMap) {
      setIsHeatMap(false);
      return;
    }
    setIsHeatMap(true);
    setFreqError("");
  });

  return (
    <>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1" style={styles.liveCellText}>
            THERE ARE {liveCellsCount} LIVE CELLS
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsRunning(!isRunning);
              if (!isRunning) {
                isRunningRef.current = true;
                run();
              }
            }}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleReset();
            }}
          >
            {"Reset"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              handleHeatMap();
            }}
          >
            {isHeatMap ? "Normal" : "Heatmap"}
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <TextField
            error={freqError.length > 0}
            onChange={(e) => changeFreq(Number(e.target.value))}
            id="frequency"
            label="Simulation Frequency"
            defaultValue={frequency}
            helperText={freqError}
            style={styles.input}
            disabled={isRunning}
          />
        </Grid>
      </Grid>
      {
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            gridTemplateColumns: `repeat(${width}, ${cellSize(width)})`,
            paddingBottom: 20,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <Cell key={`${i}-${j}`} i={i} j={j} isHeatMap={isHeatMap} />
            ))
          )}
        </div>
      }
    </>
  );
}

export default Board;
