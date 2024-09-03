import React from "react";
import Grid from "./Grid";
import { arraySplit } from "./utils";

const emptyMatrix = arraySplit(Array(80).fill(null), 10)

function App() {

  return (
    <>
      <Grid items={emptyMatrix} />
    </>
  );
}

export default App;

