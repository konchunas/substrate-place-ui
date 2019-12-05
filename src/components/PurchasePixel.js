import React from "react"

import { Bond } from "oo7"
import { If } from "oo7-react"
import { Segment, Header, Label } from "semantic-ui-react"
import { runtime, calls } from 'oo7-substrate'
import { runtime, calls } from 'oo7-substrate'
import { Pretty } from "./Pretty"
import { TransactButton } from "./TransactButton"
import { BalanceBond } from "./BalanceBond"
import { TransactButton } from "./TransactButton"
import { SignerBond } from './AccountIdBond'
import { InputBond } from "./InputBond"
import { SignerBond } from './AccountIdBond'


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

    // this.color.log()
  }

  render() {
    return <Segment>
      <Header>Purchase pixel</Header>
      <div style={{ paddingBottom: '1em' }}>
        payer<br />
        <SignerBond bond={this.account} />
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
        <InputBond bond={this.r} placeholder='255' label={<Label style={{ backgroundColor: "red" }} />} />
        <InputBond bond={this.g} placeholder='255' label={<Label style={{ backgroundColor: "green" }} />} />
        <InputBond bond={this.b} placeholder='255' label={<Label style={{ backgroundColor: "blue" }} />} />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        price
        <BalanceBond bond={this.amount} />
      </div>
      <div>
        <TransactButton
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

export default PurchasePixelSegment;