import React from "react"
import Chunk from "./Chunk"
import { Container } from "@inlet/react-pixi"
import DummyChunk from "./DummyChunk"

import { CHUNKS_PER_SIDE, PIXELS_PER_CHUNK } from "../settings"
import { cartesianToIndex, CHUNK_COORDS, euclidDivision } from "../utils"


export class ChunkLoader extends React.Component {

  state = {chunks: []}

  getChunkComponents = (state) => {
    let components = []
    for (let chunk of Object.values(state)) {
      const key = `${chunk.x}${chunk.y}`;
      components.push(
        <Chunk
          key={key}
          x={chunk.x}
          y={chunk.y}
          side={PIXELS_PER_CHUNK}
          chunkX={chunk.x / PIXELS_PER_CHUNK}
          chunkY={chunk.y / PIXELS_PER_CHUNK}
          onPixelSelected={this.props.onPixelSelected}
        />
      )
    }
    return components
  }

  onMoveFinished = (newRect) => {
    console.log("Chunk loader on move finished")
    let firstX = euclidDivision(newRect.x, PIXELS_PER_CHUNK)
    let firstY = euclidDivision(newRect.y, PIXELS_PER_CHUNK)
    let lastX = firstX + euclidDivision(newRect.width, PIXELS_PER_CHUNK)
    let lastY = firstY + euclidDivision(newRect.height, PIXELS_PER_CHUNK)
    console.log(firstX, firstY, lastX, lastY)
    let chunks = []
    for (let i = firstX; i <= lastX; i++) {
      for (let j = firstY; j <= lastY; j++) {
        chunks.push
          ({
            x: i * 8,
            y: j * 8,
          })
      }
    }
    // chunks.map(console.log)
    this.setState({chunks: chunks})
  };

  render() {
    return (
      <Container>
        {this.state.chunks.map(chunk => 
          <Chunk
              key={`${chunk.x}${chunk.y}`}
              x={chunk.x}
              y={chunk.y}
              side={PIXELS_PER_CHUNK}
              chunkX={chunk.x / PIXELS_PER_CHUNK}
              chunkY={chunk.y / PIXELS_PER_CHUNK}
              onPixelSelected={this.props.onPixelSelected}
          />
        )}
      </Container>
    );
  }
}

export default ChunkLoader;
