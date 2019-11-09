import React from "react";
import { Graphics } from "@inlet/react-pixi";

const Pixel = props => {
  return (
    <Graphics
      {...props}
      interactive={true}
      draw={g => {
        if (props.color)
            g.beginFill(props.color);
        
        g.lineStyle(0.015, 0x0)
        g.drawRect(props.x, props.y, 1, 1);

        if (props.color)
            g.endFill();
      }}
    />
  );
};

export default Pixel;
