import React from "react";
import { Stage, Container, AppConsumer } from "@inlet/react-pixi";
import Viewport from "./components/Viewport";
import ChunkLoader from "./components/ChunkLoader";
import Heading from "./components/Heading";
import WalletSegment from "./components/Wallet";
import PurchasePixelSegment from "./components/PurchasePixel"
import Overlay from "./components/Overlay"


import { Segment, Header, Rail, Label } from "semantic-ui-react";
import { Bond } from "oo7";
import { ReactiveComponent } from "oo7-react";
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

import { FIELD_SIZE } from "./settings";
import { Pretty } from "./components/Pretty";


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
        y: 0,
        price: 0
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

  }

  setSelectedPixel = pixel => {
    this.setState({
      selectedPixel: pixel
    });
  };

  onPixelSelected = (x, y, color, price) => {
    // this.calls.place.purchasePixel(this.account)
    this.setSelectedPixel({ x: x, y: y, color: color, price: price });
  };

  onMoveFinished = (newRect) => {
    this.loader.current.onMoveFinished(newRect)
  }

  readyRender() {
    return (
      <div>
        <div style={{position: "fixed" }}>
          <Heading></Heading>
        </div>
        <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0xbbbbbb }}>
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
                  <ChunkLoader
                    ref={this.loader}
                    onPixelSelected={this.onPixelSelected}
                  />
                  <Overlay selectionX={this.state.selectedPixel.x} selectionY={this.state.selectedPixel.y}/>
                </Viewport>
              )}
            </AppConsumer>
          </Container>
        </Stage>
        <Rail size='mini' style={{width: '350px'}} attached internal position="right">
          <Segment>
            <Header>Selected pixel</Header>
            <div>
              <Label>Color</Label> 
              <Label style={{ backgroundColor: this.state.selectedPixel.color }} />
            </div>
            <div>
              <Label>Position
                <Label.Detail>
                  {this.state.selectedPixel.x}, {this.state.selectedPixel.y}
                </Label.Detail>
              </Label>
            </div>
            <div>
              <Label data-tooltip="Previous price paid for selected pixel" data-position="bottom center">Price
                <Label.Detail>
                  <Pretty value={this.state.selectedPixel.price}/>
                </Label.Detail>
              </Label>
            </div>
          </Segment>
          <PurchasePixelSegment selectedPixel={this.state.selectedPixel} />
          <WalletSegment />
        </Rail>
      </div>
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
