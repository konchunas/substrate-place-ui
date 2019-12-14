import React from "react"
import Chunk from "./Chunk"
import { Container } from "@inlet/react-pixi"
import DummyChunk from "./DummyChunk"

import { CHUNKS_PER_SIDE, PIXELS_PER_CHUNK } from "../settings"
import { cartesianToIndex, CHUNK_COORDS, euclidDivision } from "../utils"


export class ChunkLoader extends React.Component {

  getChunkComponents = () => {
    let firstX = euclidDivision(this.props.visibleRect.x, PIXELS_PER_CHUNK)
    let firstY = euclidDivision(this.props.visibleRect.y, PIXELS_PER_CHUNK)
    let lastX = firstX + euclidDivision(this.props.visibleRect.width, PIXELS_PER_CHUNK)
    let lastY = firstY + euclidDivision(this.props.visibleRect.height, PIXELS_PER_CHUNK)
    let chunks = []
    for (let i = firstX; i <= lastX; i++) {
      for (let j = firstY; j <= lastY; j++) {
        const key = `${i}${j}`;
        chunks.push(
          <Chunk
            key={key}
            x={i * PIXELS_PER_CHUNK}
            y={j * PIXELS_PER_CHUNK}
            side={PIXELS_PER_CHUNK}
            chunkX={i}
            chunkY={j}
            onPixelSelected={this.props.onPixelSelected}
          />
        )
      }
    }
    return chunks
  }

  render() {
    return (
      <Container>
        {this.getChunkComponents()}
      </Container>
    );
  }
}

export default ChunkLoader;
