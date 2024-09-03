import React from "react";
import {useState} from "react";
import { useEffect } from "react";

function Square({ id, value, onSquareClick, status }){

  const [flagged,setflagged] = useState(false)
  useEffect(()=>{if(status == 1){
    console.log(id)
    onSquareClick(id)
  }},[status])
  const handleClick = (event) => { 
    console.log(event)
    if(event.button === 2){
      event.preventDefault()
      console.log('aintnoway')
      setflagged(true)
    }
    else{onSquareClick(id)}
    // else if(!flagged){onSquareClick(id)}
  }

    return(
    <button className={(status ? "square" : "unrevealedSquare" ) + (flagged ? " flaggedSquare" : "" )} onMouseDown={handleClick} onContextMenu={(e) => e.preventDefault()}>{value}</button>
  )}

export default Square;