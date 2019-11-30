import React from "react";

import { Bond } from "oo7";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import Identicon from 'polkadot-identicon';
import {runtime, secretStore} from 'oo7-substrate';

import { WalletList } from './WalletList';
import { InputBond } from "./InputBond"
import { TransformBondButton } from './TransformBondButton';


class WalletSegment extends React.Component {
  constructor() {
    super()
    this.seed = new Bond;
    this.seedAccount = this.seed.map(s => s ? secretStore().accountFromPhrase(s) : undefined)
    this.seedAccount.use()
    this.name = new Bond;
  }
  render() {
    return <Segment>
      <Header as='h2'>
        <Icon name='key' />
        <Header.Content>
          Wallet
          <Header.Subheader>Manage your secret keys</Header.Subheader>
        </Header.Content>
      </Header>
      <div style={{ paddingBottom: '1em' }}>
        <div style={{ fontSize: 'small' }}>seed</div>
        <InputBond
          bond={this.seed}
          reversible
          placeholder='Some seed for this key'
          validator={n => n || null}
          action={<Button content="Another" onClick={() => this.seed.trigger(secretStore().generateMnemonic())} />}
          iconPosition='left'
          icon={<i style={{ opacity: 1 }} className='icon'><Identicon account={this.seedAccount} size={28} style={{ marginTop: '5px' }} /></i>}
        />
        <div style={{ fontSize: 'small' }}>name</div>
        <InputBond
          bond={this.name}
          placeholder='A name for this key'
          validator={n => n ? secretStore().map(ss => ss.byName[n] ? null : n) : null}
          action={<TransformBondButton
            content='Create'
            transform={(name, seed) => secretStore().submit(seed, name)}
            args={[this.name, this.seed]}
            immediate
            />}
            />
      </div>
      <div style={{ paddingBottom: '1em' }}>
        <WalletList />
      </div>
    </Segment>
  }
}

export default WalletSegment;