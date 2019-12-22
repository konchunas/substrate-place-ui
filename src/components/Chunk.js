import React from "react";
import { utils } from "pixi.js";
import { runtime } from "oo7-substrate"
import { indexToCartesian, toCartesian, CHUNK_COORDS, PIXEL_COORDS  } from "../utils"
import { PIXELS_PER_CHUNK } from "../settings"
import { Graphics } from "@inlet/react-pixi";

const DEBUG_DRAW = true;

const Chunk = React.memo(props => {

  let [pixels, setPixels] = React.useState([])
  let [prices, setPrices] = React.useState([])

  let convertToCartesianChunk = (array) => {
    if (array.length <= 0) {
      return
    }
    let newPixels = createMatrix(PIXELS_PER_CHUNK)
    let newPrices = createMatrix(PIXELS_PER_CHUNK)
    for (let i = 0; i < array.length; i++) {
      const {x, y} = indexToCartesian(i, PIXEL_COORDS);
      const color = array[i].color
      const hexColor = utils.rgb2hex([color.r / 255.0, color.g / 255.0, color.b / 255.0])
      newPixels[x][y] = hexColor
      newPrices[x][y] = array[i].price
    }
    setPixels(newPixels)
    setPrices(newPrices)
  };
  
  React.useEffect(() => {
    let runtimePixels = runtime.place.chunks([props.chunkX, props.chunkY])
    runtimePixels.tie(convertToCartesianChunk)
  }, [props.chunkX, props.chunkY]);


  const instance = React.useRef(null);
  const onPixelClick = (event) => {
    const pixel = event.data.getLocalPosition(instance.current);
    const x = Math.floor(pixel.x)
    const y = Math.floor(pixel.y)
    const globalX = x + props.chunkX * PIXELS_PER_CHUNK
    const globalY = y + props.chunkY * PIXELS_PER_CHUNK
    const htmlColor = pixels.length > 0 ? utils.hex2string(pixels[x][y]) : "white"
    const price = (prices.length > 0) ? prices[x][y] : "1 unit"
    props.onPixelSelected(globalX, globalY, htmlColor, price)
  }

  return (
    <Graphics
      ref={instance}
      {...props}
      interactive={true}
      click={onPixelClick}
      draw={g => {
        g.clear()
        if (DEBUG_DRAW) {
          g.lineStyle(1, 0xff8800)
        }
        g.beginFill(0xbbbbbb)
        g.drawRect(0, 0, 8, 8)
        g.endFill()
        g.lineStyle(1 / 16, 0x0)
        if (pixels.length > 0) {
          for (let i = 0; i < PIXELS_PER_CHUNK; i++) {
            for (let j = 0; j < PIXELS_PER_CHUNK; j++) {
              let color = pixels[i][j]
              g.beginFill(color)
              g.drawRect(i, j, 1, 1)
              g.endFill();
            }
          }
        }

      }}
    />
  );
});

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
