import React from "react"

import { Bond } from "oo7"
import { If } from "oo7-react"
import { Segment, Header, Label } from "semantic-ui-react"
import { runtime, calls } from 'oo7-substrate'

import { Pretty } from "./Pretty"
import { Color } from "./Color"
import { TransactButton } from "./TransactButton"
import { BalanceBond } from "./BalanceBond"
import { InputBond } from "./InputBond"
import { SignerBond } from './AccountIdBond'

import { utils } from "pixi.js";

class PurchasePixelSegment extends React.Component {
  constructor() {
    super()
    this.amount = new Bond()
    this.account = new Bond()
    this.r = new Bond()
    this.g = new Bond()
    this.b = new Bond()
    this.color = Bond.all([this.r, this.g, this.b])
    this.color = this.color.map(([red, green, blue]) => ({
      r: parseInt(red),
      g: parseInt(green),
      b: parseInt(blue)
    }))
    this.htmlColor = this.color.map(colors => {
      return utils.hex2string(utils.rgb2hex([colors.r/255.0, colors.g/255.0, colors.b/255.0]))
    })
    window.htmlColor = this.htmlColor

  }

  render() {
    return <Segment>
      <Header>Purchase pixel</Header>
      <div style={{ paddingBottom: '1em' }}>
        payer<br />
        <SignerBond bond={this.account} />
        <TransactButton
          tooltip={"Add a bit of funds to your account"}
          content="Use faucet"
          icon='warning'
          tx={{
            sender: runtime.indices.tryIndex(this.account),
            call: calls.place.useFaucet(),
          }}
        />
        <If condition={this.account.ready()} then={<span>
          <Label>Balance
            <Label.Detail>
              <Pretty value={runtime.balances.balance(this.account)} />
            </Label.Detail>
          </Label>
        </span>} />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        color <br />
        <InputBond
          validator={colorValidator}
          bond={this.r}
          placeholder='255'
          style={{ width: '5em', marginRight: '2em'}}
          tooltip={"Color component from 0 to 255"}
          label={<Label style={{ backgroundColor: "red" }} />}
        />
        <InputBond
          validator={colorValidator}
          bond={this.g}
          placeholder='255'
          style={{ width: '5em', marginRight: '2em'}}
          tooltip={"Color component from 0 to 255"}
          label={<Label style={{ backgroundColor: "green" }} />}
        />
        <InputBond
          validator={colorValidator}
          bond={this.b}
          placeholder='255'
          style={{ width: '5em', marginRight: '2em'}}
          tooltip={"Color component from 0 to 255"}
          label={<Label style={{ backgroundColor: "blue" }} />}
        />
        <div data-tooltip="Resulting color to be placed" data-position="bottom center">
          <Label>Result</Label>
          <Color value={this.htmlColor} />
        </div>
      </div>
      <div style={{ paddingBottom: '1em' }}>
        price <br />
        <BalanceBond 
          bond={this.amount}
          tooltip={"Should be greater than previous price"}
        />
      </div>
      <div>
        <TransactButton
          tooltip={"Buy this pixel with specified price"}
          content="Purchase"
          icon='warning'
          tx={{
            sender: runtime.indices.tryIndex(this.account),
            call: calls.place.purchasePixel(this.props.selectedPixel.x, this.props.selectedPixel.y, this.color, this.amount),
          }}
        />
      </div>
    </Segment>

  }
}

const colorValidator = (n) => {
  let parsed = parseInt(n)
  if (isNaN(parsed))
    return null
  else if ((parsed >= 0) && (parsed <= 255))
    return n
  return null
}

export default PurchasePixelSegment;