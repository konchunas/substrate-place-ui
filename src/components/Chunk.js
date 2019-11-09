import React from "react";
import { Graphics } from "@inlet/react-pixi";

const SIDE = 8;

const { useState } = React;

const Chunk = props => {
  const [myIndex, setMyIndex, chunk] = useState(0);

  return (
    <Graphics
      {...props}
      interactive={true}
      draw={g => {
        // if (!chunk)
        //     return

        for (let i = 0; i < SIDE; i++) {
          for (let j = 0; j < SIDE; j++) {
            let color = chunk ? chunk[i][j] ? chunk[i][j].color : null : null;
            if (!color)
                color = 0xFF8800

            if (color)
                g.beginFill(color);
            
            g.lineStyle(0.15, 0x0)
            g.drawRect(i, j, 1, 1);

            if (color)
                g.endFill();
          }
        }
      }}
    />
  );
};

export default Chunk;
