import React from "react";
import { utils } from "pixi.js";
import { runtime } from "oo7-substrate"
import { indexToCartesian, toCartesian, CHUNK_COORDS, PIXEL_COORDS  } from "../utils"
import { PIXELS_PER_CHUNK } from "../settings"
import { Graphics } from "@inlet/react-pixi";
import installCommonGlobals from "jest-util/build/installCommonGlobals";

const Chunk = props => {

  let [pixels, setPixels] = React.useState(() => createMatrix(PIXELS_PER_CHUNK))

  let convertToCartesianChunk = (array) => {
    let newPixels = createMatrix(PIXELS_PER_CHUNK)
    for (let i = 0; i < array.length; i++) {
      const {x, y} = indexToCartesian(i, PIXEL_COORDS);
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


  const instance = React.useRef(null);
  const onPixelClick = (event) => {
    const pixel = event.data.getLocalPosition(instance.current);
    const x = Math.floor(pixel.x)
    const y = Math.floor(pixel.y)
    const color = pixels[x][y]
    const chunkFirstPixel = toCartesian(props.chunkNumber, 0)
    const globalX = x + chunkFirstPixel.x
    const globalY = y + chunkFirstPixel.y
    const htmlColor = utils.hex2string(color)
    props.onPixelSelected(globalX, globalY, htmlColor)
  }

  return (
    <Graphics
      ref={instance}
      {...props}
      interactive={true}
      click={onPixelClick}
      draw={g => {
        g.clear()
        for (let i = 0; i < PIXELS_PER_CHUNK; i++) {
          for (let j = 0; j < PIXELS_PER_CHUNK; j++) {
            let color = pixels[i][j]
            // console.log("color ", color)
            if (color)
              g.beginFill(color);
        
            g.lineStyle(0.01, 0x0)
            g.drawRect(i, j, 1, 1);
             
            if (color)
                g.endFill();
          }
        }
      }}
    />
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
