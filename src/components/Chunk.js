import React from "react";
import { Graphics, Container } from "@inlet/react-pixi";
import Pixel from "./Pixel";

const SIDE = 8;

const { useState } = React;

const Chunk = props => {
  let pixels = [];
  for (let i = 0; i < props.side; i++) {
    for (let j = 0; j < props.side; j++) {
      const key = `${i} ${j}`
      pixels.push(<Pixel key={key} x={i} y={j} color={0xff0011} />);
    }
  }

  return (
    <Container {...props} interactive={true}>
        {pixels}
        <Pixel x={2} y={2} color={0xff0011}></Pixel>
    </Container>
  );
};

export default Chunk;
