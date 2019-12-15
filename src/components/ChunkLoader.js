import React from "react"
import Chunk from "./Chunk"
import { Container } from "@inlet/react-pixi"
import DummyChunk from "./DummyChunk"

import { PIXELS_PER_CHUNK, MAX_COORD, MIN_COORD } from "../settings"
import { euclidDivision, clamp } from "../utils"

const MAX_CHUNK = euclidDivision(MAX_COORD, PIXELS_PER_CHUNK)
const MIN_CHUNK = euclidDivision(MIN_COORD, PIXELS_PER_CHUNK)

export class ChunkLoader extends React.Component {

  getChunkComponents = () => {
    let firstX = euclidDivision(this.props.visibleRect.x, PIXELS_PER_CHUNK)
    let firstY = euclidDivision(this.props.visibleRect.y, PIXELS_PER_CHUNK)
    let lastX = firstX + euclidDivision(this.props.visibleRect.width, PIXELS_PER_CHUNK)
    let lastY = firstY + euclidDivision(this.props.visibleRect.height, PIXELS_PER_CHUNK)

    firstX = clamp(MIN_CHUNK, firstX, MAX_CHUNK)
    firstY = clamp(MIN_CHUNK, firstY, MAX_CHUNK)
    lastX = clamp(MIN_CHUNK, lastX, MAX_CHUNK)
    lastY = clamp(MIN_CHUNK, lastY, MAX_CHUNK)

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
