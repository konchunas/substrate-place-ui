# Substrate Place UI

This project is a user interface for [Substrate Place](https://github.com/konchunas/substrate-place) runtime module.

It is a web page connecting to the node and retrieving pixel board from blockchain. As user scrolls the map it automatically fetches new chunks of pixels and plots them on the screen. It has functionality for navigating and purchasing the pixel as well as basic wallet functionality. As of now faucet is already included into interface so you can jumpstart and try this application online right now by following the link.

To see it in action using my node go to https://konchunas.github.io/substrate-place-ui

## Development

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Make sure you are running Substrate Place project for this app to work properly.

It can be done like so:
```
cd <substrate-place-dir>
./target/release/place --dev
```

## Miscellaneous

### Type definitions for Polkadot UI

```json
{
  "Pixel": {
    "price": "Balance",
    "color": "Color"
  },
  "Color": {
    "r": "u8",
    "g": "u8",
    "b": "u8"
  }
}
```