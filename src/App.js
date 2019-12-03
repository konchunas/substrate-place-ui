import React from "react";
import { Stage, Container, AppConsumer } from "@inlet/react-pixi";
import Viewport from "./components/Viewport";
import Chunk from "./components/Chunk";
import ChunkLoader from "./components/ChunkLoader";
import Heading from "./components/Heading";
import WalletSegment from "./components/Wallet";
import PurchasePixelSegment from "./components/PurchasePixel"
import Overlay from "./components/Overlay"
import {Pretty} from "./components/Pretty"



import { Segment, Header, Rail, Label } from "semantic-ui-react";
import { Bond } from "oo7";
import { ReactiveComponent, If } from "oo7-react";
import {
  calls,
  runtime,
  chain,
  system,
  runtimeUp,
  addressBook,
  secretStore,
  metadata,
  addCodecTransform
} from "oo7-substrate";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { CHUNKS_PER_SIDE, PIXELS_PER_CHUNK, FIELD_SIZE } from "./settings";
import { cartesianToIndex, CHUNK_COORDS } from "./utils";


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

    this.account = new Bond()
    this.amount = new Bond()

    this.state = {
      selectedPixel: {
        color: {
          r: 25,
          g: 255,
          b: 129
        },
        x: 0,
        y: 0
      },
    };

    addCodecTransform("Pixel<Balance>", {
      price: "Balance",
      color: "Color"
    });
    addCodecTransform("Color", {
      r: "u8",
      g: "u8",
      b: "u8"
    });

    this.loader = React.createRef()

    this.chunks = []
    for (let i = 0; i < CHUNKS_PER_SIDE; i++) {
      for (let j = 0; j < CHUNKS_PER_SIDE; j++) {
        const key = `${i} ${j}`;
        const chunkNumber = cartesianToIndex(i, j, CHUNK_COORDS);
        this.chunks.push(
          <Chunk
            key={key}
            x={i * 8}
            y={j * 8}
            side={PIXELS_PER_CHUNK}
            onPixelSelected={this.onPixelSelected}
            chunkNumber={chunkNumber}
          />
        );
      }
    }

  }

  setSelectedPixel = pixel => {
    this.setState({
      selectedPixel: pixel
    });
  };

  onPixelSelected = (x, y, color) => {
    // this.calls.place.purchasePixel(this.account)
    this.setSelectedPixel({ x: x, y: y, color: color });
  };

  onMoveFinished = (newRect) => {
    this.loader.current.onMoveFinished(newRect)
  }

  readyRender() {
    return (
      <Segment>
        <Stage width={720} height={720} options={{ backgroundColor: 0xbbbbbb }}>
          <Container sortableChildren={true}>
            <AppConsumer>
              {app => (
                <Viewport
                  app={app}
                  worldWidth={FIELD_SIZE}
                  worldHeight={FIELD_SIZE}
                  scaled={16}
                  onDragEnd={(rect) => this.loader.current.onMoveFinished(rect)}
                >
                  {/* {this.chunks} */}
                  <ChunkLoader ref={this.loader}/>
                  <Overlay selectionX={this.state.selectedPixel.x} selectionY={this.state.selectedPixel.y}/>
                </Viewport>
              )}
            </AppConsumer>
          </Container>
        </Stage>
        <Rail attached internal position="right">
          <Segment>
            <Header>Selected pixel</Header>
            <div>
              Color: <Label style={{backgroundColor: this.state.selectedPixel.color}}/>
            </div>
            <div>
              Position: ({this.state.selectedPixel.x},
              {this.state.selectedPixel.y})
            </div>
          </Segment>
          <PurchasePixelSegment selectedPixel={this.state.selectedPixel}/>
          <WalletSegment/>
        </Rail>
        <Heading></Heading>
        <If condition={this.account.ready()} then={<span>
            <Label>Balance
                <Label.Detail>
                  <Pretty value={runtime.balances.balance(this.account)} />
                </Label.Detail>
            </Label>
            <Label>Nonce
                <Label.Detail>
                  {/* <Pretty value={runtime.system.accountNonce(this.source)} /> */}
                </Label.Detail>
            </Label>
        </span>} />
      </Segment>
    );
  }
}

// window.addEventListener("resize", console.log);

// // Resize function window
// function resize() {
//   const parent = App.view.parentNode;
//   App.renderer.resize(parent.clientWidth, parent.clientHeight);
// }

export default App;
