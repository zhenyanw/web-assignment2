import React from "react";
import Base from '../components/base';

function About() {

    const styles = {
        root: {
            paddingBottom: 20,
        }
    }
    return (<Base title="About Page">
        <div style = {styles.root}>
        <h1>About Conway’s History of Life</h1>
        <h4>Rule</h4>
        <ol>
        <li>A living cell with less than two living neighbours dies.</li>
        <li>A living cell with two or three live neighbours lives.</li>
        <li>A living cell with more than three live neighbours dies.</li>
        <li>A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</li>
        </ol> 
        <h4>Other Feature</h4>
        <ol>
        <li>You can set the grid size at the home page (width and height from 10 to 100 inclusive)</li>
        <li>You can pause the game at any time to reverse cell status by clicking</li>
        <li>You can set the simulation frequency (50ms to 2000ms inclusive) when the game is not running</li>
        <li>You can reset the grid to re-generate a random set of live cells</li>
        <li>By clicking the Heatmap button on the game page, you can view the board as a heatmap that indicate cells live frequency, if a grid is dead for 10 round it will be pure white</li>
        </ol> 
        </div>
    </Base>)
}

export default About;