import React from "react";

import { Segment, Header, Label, Sticky, Ref } from "semantic-ui-react";
import { Pretty } from "./Pretty";

const SelectedPixelSegment = props => {
  return (
    <Segment>
      <Header>Selected pixel</Header>
      <div>
        <Label>Color</Label>
        <Label style={{ backgroundColor: props.pixel.color, border: "2px solid lightgray" }} />
      </div>
      <div>
        <Label>Position
          <Label.Detail>
            {props.pixel.x}, {props.pixel.y}
          </Label.Detail>
        </Label>
      </div>
      <div>
        <Label
         data-tooltip="Previous price paid for selected pixel" data-position="bottom center">Price
           <Label.Detail>
            <Pretty value={props.pixel.price} />
          </Label.Detail>
        </Label>
      </div>
    </Segment>
  )
}

export default SelectedPixelSegment;
