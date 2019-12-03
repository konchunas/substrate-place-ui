import React from "react"
import Chunk from "./Chunk"
import { Container } from "@inlet/react-pixi"
import DummyChunk from "./DummyChunk"

import { CHUNKS_PER_SIDE, PIXELS_PER_CHUNK } from "../settings"
import { cartesianToIndex, CHUNK_COORDS } from "../utils"


export class ChunkLoader extends React.Component {

  state = {}

  getChunkComponents = (state) => {
    let components = []
    for (let chunk of Object.values(state)) {
      const key = `${chunk.x}${chunk.y}`;
      components.push(
        <DummyChunk
          key={key}
          x={chunk.x}
          y={chunk.y}
          height={5}
          width={5}
          chunkNumber={`${chunk.x/8},${chunk.y/8}`}
        />
      )
    }
    return components
  }

  onMoveFinished = (newRect) => {
    console.log("Chunk loader on move finished")
    let firstX = Math.floor(newRect.x / PIXELS_PER_CHUNK)
    let firstY = Math.floor(newRect.y / PIXELS_PER_CHUNK)
    let lastX = firstX + Math.floor(newRect.width / PIXELS_PER_CHUNK)
    let lastY = firstX + Math.floor(newRect.width / PIXELS_PER_CHUNK)
    console.log(firstX, firstY, lastX, lastY)
    let chunks = []
    for (let i = firstX; i <= lastX; i++) {
      for (let j = firstY; j <= lastY; j++) {
        const chunkNumber = cartesianToIndex(i, j, CHUNK_COORDS);
        chunks.push
          ({
            x: i * 8,
            y: j * 8,
            number: chunkNumber
          })
        // const chunkNumber = cartesianToIndex(i, j, CHUNK_COORDS);
        // this.chunks[chunkNumber] = 
        //   (<Chunk
        //     key={key}
        //     x={i * 8}
        //     y={j * 8}
        //     side={PIXELS_PER_CHUNK}
        //     // onPixelSelected={this.onPixelSelected}
        //     chunkNumber={chunkNumber}
        //   />)
      }
    }
    this.setState(chunks)
  };

  render() {
    return (
      <Container>
        {/* {Object.values(this.chunks)} */}
        {this.getChunkComponents(this.state)}
        {/* <DummyChunk
          height={8}
          width={8}
          chunkNumber={"heeey"}
        /> */}
      </Container>
    );
  }
}

export default ChunkLoader;
