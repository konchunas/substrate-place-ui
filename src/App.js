import React from "react";
import { Stage, Container, AppConsumer } from "@inlet/react-pixi";
import Viewport from "./components/Viewport";
import ChunkLoader from "./components/ChunkLoader";
import Heading from "./components/Heading";
import WalletSegment from "./components/Wallet";
import SelectedPixelSegment from "./components/SelectedPixel";
import PurchasePixelSegment from "./components/PurchasePixel"
import QuickNavSegment from "./components/QuickNav"
import Overlay from "./components/Overlay"


import { Segment, Header, Rail, Input, Button} from "semantic-ui-react";
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

    // hide scrollbar
    document.body.style.overflow = 'hidden';

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
    this.viewport = React.createRef()
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


  quicklyNavigate = (x,y) => {
    this.viewport.current.moveCenter(x,y)
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
                    ref={this.viewport}
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
        <Rail style={{width: '350px'}} attached internal position="right">
          <SelectedPixelSegment pixel={this.state.selectedPixel} />
          <QuickNavSegment onNavigate={this.quicklyNavigate}/>
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
