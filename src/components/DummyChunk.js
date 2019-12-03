import React from "react";
import { indexToCartesian, PIXEL_COORDS  } from "../utils"
import { Text } from "@inlet/react-pixi";

const DummyChunk = props => {
  return (
    <Text
      {...props}
      text={props.chunkNumber}
    />
  );
};

export default DummyChunk;
