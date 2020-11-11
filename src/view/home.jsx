import React, { useState } from "react";
import Game from "./game";
import About from './about'
import {
  AppBar,
  TextField,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";
import Base from '../components/base';

const styles = {
  input: {
    marginTop: 40,
    marginBottom: 5
  },
  button: {
    marginTop: 30,
    paddingBottom: 20,
    float: 'right',
    marginLeft: 5,
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    flexGrow: 1,
  },
};

const HOME_VIEW = "HOME";
const GAME_VIEW = "GAME";
const ABOUT_VIEW = "ABOUT";

function Home() {
  const [view, setView] = useState(HOME_VIEW);

  const [widthWarning, setWidthWarning] = useState("");
  const [heightWarning, setHeightWarning] = useState("");

  const [gridWidth, setGridWidth] = useState(null);
  const [gridHeight, setGridHeight] = useState(null);

  function validateSize(value) {
    return value >= 10 && value <= 100;
  }

  function onStartClick() {
    if (validateSize(gridWidth) && validateSize(gridHeight)) {
      setView(GAME_VIEW);
    }
    if (!validateSize(gridWidth)) {
      setWidthWarning("Please input a valid width from 10 to 100 inclusive");
    }
    if (!validateSize(gridHeight)) {
      setHeightWarning("Please input a valid height from 10 to 100 inclusive");
    }
  }

  function onValueChange(value, isWidth) {
    if (validateSize(value)) {
      if (isWidth) {
        setGridWidth(value);
        setWidthWarning("");
      } else {
        setGridHeight(value);
        setHeightWarning("");
      }
    } else {
      if (isWidth) {
        setGridWidth(value);
        setWidthWarning("Please input a valid width from 10 to 100 inclusive");
      } else {
        setGridHeight(value);
        setHeightWarning("Please input a valid height from 10 to 100 inclusive");
      }
    }
  }

  return (
    <>
      <div style={styles.bar}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={styles.title}>
              Conway’s History of Life
          </Typography>
            <Button color="inherit" onClick={() => { setView(HOME_VIEW) }}>Home</Button>
            <Button color="inherit" onClick={() => { setView(ABOUT_VIEW) }}>About</Button>
          </Toolbar>
        </AppBar>
      </div>

      {view === GAME_VIEW ? (
        <Game width={gridWidth} height={gridHeight} />
      ) :

        (view === ABOUT_VIEW ? <About />
          : (<Base title="Home Page">
            <form>
              <TextField
                error={widthWarning.length > 0}
                onChange={e => onValueChange(Number(e.target.value), true)}
                id="width input"
                label="Grid Width (10 - 100)"
                helperText={widthWarning}
                fullWidth={true}
                style={styles.input}
              />
              <TextField
                error={heightWarning.length > 0}
                onChange={e => onValueChange(Number(e.target.value), false)}
                id="height input"
                label="Grid Height (10 - 100)"
                helperText={heightWarning}
                fullWidth={true}
                style={styles.input}
              />
              <div style={styles.button}>
                <Button variant="contained" color="primary" onClick={() => onStartClick()}>
                  Start Game!
                </Button>
              </div>
            </form>
          </Base>
          )
        )}
    </>
  );
}

export default Home;