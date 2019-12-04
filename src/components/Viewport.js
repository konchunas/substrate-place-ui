import { PixiComponent } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport'


export default PixiComponent('Viewport', {
    create: props => {
        return new Viewport({
          screenWidth: props.app.renderer.width,
          screenHeight: props.app.renderer.height,
          worldWidth: props.worldWidth,
          worldHeight: props.worldHeight,
          interaction: props.app.renderer.plugins.interaction,
          stopPropagation: true,
        }).drag()
          .pinch()
          .wheel()
          .moveCenter(0,0)
          .clampZoom({
            maxHeight: 128,
            maxWidth: 128
          })
          .on("drag-end", (event) => {
            props.onDragEnd(event.viewport.getVisibleBounds())
          })
        //   .decelerate();
  }
})