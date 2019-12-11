import React from 'react';
import { ReactiveComponent } from 'oo7-react';
import { Label } from "semantic-ui-react"

export class Color extends ReactiveComponent {
	constructor () {
		super(["value", "default", "className"])
	}
	render () {
		if (this.ready() || this.props.default == null) {
			return (<Label className={this.state.className} name={this.props.name} style={{ backgroundColor: this.state.value, border: "2px solid lightgray" }} />)
		} else {
      return <Label style={{ backgroundColor: this.props.default, border: "2px solid lightgray" }} /> 
		}
	}
}
