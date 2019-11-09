import React from "react";
import { Stage, Container, AppConsumer, Graphics } from "@inlet/react-pixi";
import Viewport from './components/Viewport'
import Chunk from './components/Chunk'
import "./App.css";

const { useState, useMemo } = React;

const CHUNKS_PER_SIDE = 8;
const CHUNK_SIDE = 8;
const FIELD_SIZE = CHUNKS_PER_SIDE * CHUNK_SIDE;

// app
const App = () => {

  let chunks = [];
  for (let i = 0; i < CHUNKS_PER_SIDE; i++) {
    for (let j = 0; j < CHUNKS_PER_SIDE; j++) {
        chunks.push(<Chunk x={i*8} y={j*8} />);
    }
  }

  return (
    <Stage options={{ backgroundColor: 0xbbbbbb, resizeTo: window }}>
        <Container sortableChildren={true}>
            <AppConsumer>
                {app =>
                    <Viewport app={app} worldWidth={FIELD_SIZE} worldHeight={FIELD_SIZE}>
                        {chunks}
                    </Viewport>
                }
            </AppConsumer>
        </Container>
    </Stage>
  );
};

export default App;
