import React from "react";

import { Bond } from "oo7";
import { Segment, Header, Button, Input } from "semantic-ui-react";
import { runtime, calls } from 'oo7-substrate';

import { TransactButton } from ".//TransactButton";
import { BalanceBond } from "./BalanceBond";
import { InputBond } from "./InputBond"
import { SignerBond } from './AccountIdBond';


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

    this.color.log()
  }

  render() {
    return <Segment>
      <Header>Purchase pixel</Header>
      <div style={{ paddingBottom: '1em' }}>
        Payer: <br />
        <SignerBond bond={this.account} />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        color <br />
        <div class="ui label label">red</div>
        <InputBond bond={this.r} placeholder='255' />
        <div class="ui label label">green</div>
        <InputBond bond={this.g} placeholder='255' />
        <div class="ui label label">blue</div>
        <InputBond bond={this.b} placeholder='255' />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        Price:
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