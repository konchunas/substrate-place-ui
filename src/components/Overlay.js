import React from "react";
import { Graphics } from "@inlet/react-pixi";

const Overlay = props => {

  return (
    <Graphics
      {...props}
      draw={g => {
        g.clear()
        g.lineStyle(0.4, 0xffcc00)
        g.drawRect(props.selectionX, props.selectionY, 1, 1);
      }}  
    />
  );
};

export default Overlay;
