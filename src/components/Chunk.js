import React from "react";
import { Container } from "@inlet/react-pixi";
import Pixel from "./Pixel";
import { utils } from "pixi.js";
import { runtime } from "oo7-substrate"
import { indexToCartesian, cartesianToIndex, toCartesian, PIXEL_COORDS } from "../utils"
import { PIXELS_PER_CHUNK } from "../settings"

const Chunk = props => {
  let onClick = React.useCallback((x, y, color) => {
    let pixelIndex = cartesianToIndex(x, y, PIXEL_COORDS)
    let chunkFirstPixel = toCartesian(props.chunkNumber, 0)
    const htmlColor = utils.hex2string(color)
    let globalX = x + chunkFirstPixel.x
    let globalY = y + chunkFirstPixel.y
    props.onPixelSelected(globalX, globalY, htmlColor)
  }, [props])

  let [pixels, setPixels] = React.useState(() => createMatrix(PIXELS_PER_CHUNK))
  let convertToCartesianChunk = (array) => {
    let newPixels = createMatrix(PIXELS_PER_CHUNK)
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
    for (let i = 0; i < PIXELS_PER_CHUNK; i++) {
      for (let j = 0; j < PIXELS_PER_CHUNK; j++) {
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
