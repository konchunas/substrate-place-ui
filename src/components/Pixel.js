import React from "react";
import { Graphics } from "@inlet/react-pixi";

const Pixel = props => {
  return (
    <Graphics
      {...props}
      interactive={true}
      click={() => props.onClick(props.x, props.y, props.color)}
      draw={g => {
        g.clear()
        if (props.color)
            g.beginFill(props.color);
        
        g.lineStyle(0.02, 0x0)
        g.drawRect(0, 0, 1, 1);

        if (props.color)
            g.endFill();
      }}
    />
  );
};

export default Pixel;
