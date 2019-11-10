import React from "react";
import { Stage, Container, AppConsumer, Graphics } from "@inlet/react-pixi";
import Viewport from "./components/Viewport";
import Chunk from "./components/Chunk";
import {
  Segment,
  Header,
  Card,
  Sticky,
  Rail,
  Label,
  Menu,
  Grid,
} from "semantic-ui-react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';

const { createRef } = React;

const CHUNKS_PER_SIDE = 8;
const CHUNK_SIDE = 8;
const FIELD_SIZE = CHUNKS_PER_SIDE * CHUNK_SIDE;

// app
const App = () => {
  const contextRef = createRef();
  let chunks = [];
  for (let i = 0; i < CHUNKS_PER_SIDE; i++) {
    for (let j = 0; j < CHUNKS_PER_SIDE; j++) {
      const key = `${i} ${j}`;
      chunks.push(<Chunk key={key} x={i * 8} y={j * 8} side={CHUNK_SIDE} />);
    }
  }

  return (
    <Segment>
      <Stage width={720} height={720} options={{ backgroundColor: 0xbbbbbb}}>
        <Container sortableChildren={true}>
          <AppConsumer>
            {app => (
              <Viewport
                app={app}
                worldWidth={FIELD_SIZE}
                worldHeight={FIELD_SIZE}
              >
                {chunks}
              </Viewport>
            )}
          </AppConsumer>
        </Container>
      </Stage>
      <Rail attached internal position="right">
          <Segment>Right Rail Content</Segment>
      </Rail>
    </Segment>
  );
};

// window.addEventListener("resize", resize);

// // Resize function window
// function resize() {
//   const parent = App.view.parentNode;
//   App.renderer.resize(parent.clientWidth, parent.clientHeight);
// }

export default App;
