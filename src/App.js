import React from "react";
import { Stage, Container, AppConsumer, Graphics } from "@inlet/react-pixi";
import Viewport from "./components/Viewport";
import Chunk from "./components/Chunk";
import Heading from "./components/Heading";
import { Segment, Header, Rail, Label, Menu, Grid } from "semantic-ui-react";
import { Bond, TransformBond, AddCodecTransform } from "oo7";
import { ReactiveComponent, If, Rspan } from "oo7-react";
import {
  calls,
  runtime,
  chain,
  system,
  runtimeUp,
  ss58Decode,
  ss58Encode,
  pretty,
  addressBook,
  secretStore,
  metadata,
  nodeService,
  bytesToHex,
  hexToBytes,
  AccountId
} from "oo7-substrate";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const { createRef, useState } = React;

const CHUNKS_PER_SIDE = 8;
const CHUNK_SIDE = 8;
const FIELD_SIZE = CHUNKS_PER_SIDE * CHUNK_SIDE;

export class App extends ReactiveComponent {
  constructor() {
    super([], { ensureRuntime: runtimeUp });

    // For debug only.
    window.runtime = runtime;
    window.secretStore = secretStore;
    window.addressBook = addressBook;
    window.chain = chain;
    window.calls = calls;
    window.system = system;
    window.that = this;
    window.metadata = metadata;

    this.state = {
      selectedPixel: {
        color: "white",
        x: 0,
        y: 0
      },
      chunks: []
    };

    // addCodecTransform('Kitty<Hash,Balance>', {
    //     id: 'Hash',
    //     dna: 'Hash',
    //     price: 'Balance',
    //     gen: 'u64'
    // });

    const contextRef = createRef();
  }

  setSelectedPixel = (pixel) => {
    this.setState({
      selectedPixel: pixel
    });
  }

  onPixelSelected = (x, y, color) => {
    this.setSelectedPixel({ x: x, y: y, color: color });
  }

  readyRender() {
    let chunks = [];
    for (let i = 0; i < CHUNKS_PER_SIDE; i++) {
      for (let j = 0; j < CHUNKS_PER_SIDE; j++) {
        const key = `${i} ${j}`;
        chunks.push(
          <Chunk
            key={key}
            x={i * 8}
            y={j * 8}
            side={CHUNK_SIDE}
            onPixelSelected={this.onPixelSelected}
          />
        );
      }
    }

    return (
      <Segment>
        <Segment></Segment>
        <Stage width={720} height={720} options={{ backgroundColor: 0xbbbbbb }}>
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
          <Segment>
            <Header>Selected pixel</Header>
            <div>
              Color: <Label color={this.state.selectedPixel.color || "black"} />
            </div>
            <div>
              Position: ({this.state.selectedPixel.x},
              {this.state.selectedPixel.y})
            </div>
            <div>Price: {this.state.selectedPixel.price}</div>
          </Segment>
        </Rail>
        <Heading></Heading>
      </Segment>
    );
  }
}

// window.addEventListener("resize", resize);

// // Resize function window
// function resize() {
//   const parent = App.view.parentNode;
//   App.renderer.resize(parent.clientWidth, parent.clientHeight);
// }

export default App;
