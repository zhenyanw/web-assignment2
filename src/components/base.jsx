import React from "react";
import blue from "@material-ui/core/colors/blue";
import { Divider, Paper } from "@material-ui/core";

const styles = {
  container: {
    margin: "20px 20px 20px 15px",
  },
  pageTitle: {
    fontSize: 25,
    color: blue[800],
    marginBottom: 20,
  },
  paper: {
    paddingTop: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  clear: {
    clear: "both",
  },
};

function Base({ title, children }) {
  return (
    <div>
      <div style={styles.container}>
        <Paper style={styles.paper}>
          <h6 style={styles.pageTitle}>{title}</h6>

          <Divider />
          {children}

          <div style={styles.clear} />
        </Paper>
      </div>
    </div>
  );
}

export default Base;
