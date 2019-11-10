import React from "react";
import { Graphics, Container } from "@inlet/react-pixi";
import Pixel from "./Pixel";
import { utils } from "pixi.js";

const SIDE = 8;

const { useState } = React;

const Chunk = props => {
  let onClick = (x, y, color) => {
    console.log(x, y, color);
    const htmlColor = utils.hex2string(color)
    props.onPixelSelected(x, y, htmlColor);
  };

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
