import React from "react";
import { Container } from "@inlet/react-pixi";
import Pixel from "./Pixel";
import { utils } from "pixi.js";
import { runtime } from "oo7-substrate"
import { indexToCartesian } from "../utils"
import { CHUNK_SIDE } from "../settings"

const Chunk = props => {
  let onClick = React.useCallback((x, y, color) => {
    console.log(x, y, color);
    const htmlColor = utils.hex2string(color)
    props.onPixelSelected(x, y, htmlColor);
  }, [props])

  let [pixels, setPixels] = React.useState(() => createMatrix(CHUNK_SIDE))
  let convertToCartesianChunk = (array) => {
    let newPixels = createMatrix(CHUNK_SIDE)
    for (let i = 0; i < array.length; i++) {
      const {x, y} = indexToCartesian(i);
      const color = array[i].color
      const hexColor = utils.rgb2hex([color.r / 255.0, color.g / 255.0, color.b / 255.0])
      newPixels[x][y] = hexColor
    }
    setPixels(newPixels)
  };
  
  React.useEffect(() => {
    let runtimePixels = runtime.place.chunks(props.chunkNumber)
    runtimePixels.tie(convertToCartesianChunk)
  }, []);

  let getPixelComponents = React.useMemo(() => {
    let pixelComponents = []
    for (let i = 0; i < CHUNK_SIDE; i++) {
      for (let j = 0; j < CHUNK_SIDE; j++) {
        pixelComponents.push(
            <Pixel key={`${i}${j}`} x={i} y={j} color={pixels[i][j]} onClick={onClick} />
        );
      }
    }
    return pixelComponents
  }, [pixels, onClick]);

  return (
    <Container {...props} interactive={true}>
      {getPixelComponents}
    </Container>
  );
};

function createMatrix(side) {
  let matrix = []
  for (let i = 0; i < side; i++) {
    let row = []
    for (let j = 0; j < side; j++) {
      row.push(0)
    }
    matrix.push(row)
  }
  return matrix
}

export default Chunk;
