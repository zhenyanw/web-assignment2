import React, { useState } from "react";
import Grid from "../components/grid";
import Play from "./play";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
// import {
//     Jumbotron,
//     Container,
//     Row,
//     Col,
//     Card,
//     CardBody,
// } from "reactstrap";

/**
 * The home page
 */




function Home(){
    const [isAboutPage, setIsAboutPage] = useState(false);
    const [isPlayPage, setIsPlayPage] = useState(false);
    
    const [showWarning, setShowWarning] = useState(false);

    const [gridWidth, setGridWidth] = useState(0);
    const [gridHeight, setGridHeight] = useState(0);

    function onClick() {
        if (gridWidth == null || gridHeight == null) {
            return;
        }
        if (gridWidth < 10 || gridHeight < 10 || gridWidth > 1000 || gridHeight > 1000) {
            return; 
        }
        setIsPlayPage(true);
    }

    return (
        <>
        {isPlayPage ? <Play width={gridWidth} height={gridHeight}/> :
    (<Form >
      <FormGroup>
        <Label for="gridWidth">Width</Label>
        <Input type="number" name="width" id="gridWidth" placeholder="with a placeholder" onChange={e => setGridWidth(Number(e.target.value))}/>
      </FormGroup>
      <FormGroup>
        <Label for="gridHeight">Height</Label>
        <Input type="number" name="height" id="gridHeight" placeholder="with a placeholder" onChange={e => setGridHeight(Number(e.target.value))}/>
      </FormGroup>
      <Button onClick={() => onClick()} color="primary">Submit</Button>
    </Form>)}
    </>);

} 

export default Home;