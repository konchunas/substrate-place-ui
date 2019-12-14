import { PixiComponent } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport'


export default PixiComponent('Viewport', {
  create: props => {
    let lastTimer = null

    /// wait a bit before actually reporting viewport change
    let proposeViewportChange = (viewport) => {
      if (lastTimer) {
        clearTimeout(lastTimer)
      }

      lastTimer = setTimeout(() => {
        props.viewportChanged(viewport.getVisibleBounds(), viewport.scaled)
        lastTimer = null
      }, 350);
    }

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
      .clampZoom({
        maxHeight: 256,
        maxWidth: 256,
        minHeight: 16,
        minWidth: 16
      })
      .on("drag-end", (event) => {
        proposeViewportChange(event.viewport)
      })
      .on("move-end", (event) => {
        proposeViewportChange(event.viewport)
      })
      .on("zoomed", (event) => {
        proposeViewportChange(event.viewport)
      })
      .moveCenter(0, 0)
    //   .decelerate();
  },

  
})