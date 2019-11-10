import React from "react";
import { Graphics, Container } from "@inlet/react-pixi";
import Pixel from "./Pixel";
import { utils } from "pixi.js";
import { runtime } from "oo7-substrate"
import { indexToCartesian } from "../utils"

const { useState } = React;

const Chunk = props => {
  let onClick = (x, y, color) => {
    console.log(x, y, color);
    const htmlColor = utils.hex2string(color)
    props.onPixelSelected(x, y, htmlColor);
  };
  
  let convertToCartesianChunk = (array) => {
    for (let i = 0; i < array.length; i++) {
      const {x, y} = indexToCartesian(i);
      const color = array[i].color
      console.log(color.r)
    }
  }
  

  let runtimePixels = runtime.place.chunks(props.chunkNumber)
  // runtimePixels.then((arg) => console.log(arg[0]))
  runtimePixels.then(convertToCartesianChunk)

  let pixels = [];
  for (let i = 0; i < props.side; i++) {
    for (let j = 0; j < props.side; j++) {
      const key = `${i} ${j}`;
      pixels.push(
        <Pixel key={key} x={i} y={j} color={0xff0066} onClick={onClick} />
      );
    }
  }

  return (
    <Container {...props} interactive={true}>
      {pixels}
    </Container>
  );
};

export default Chunk;
