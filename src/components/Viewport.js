import { PixiComponent } from '@inlet/react-pixi';
import { Viewport } from 'pixi-viewport'


// HACK extend viewport with method emitting custom event for when user inputs coordinates manually
Viewport.prototype.moveAndUpdate = function(x,y)  {
  this.moveCenter(x,y)
  this.emit("click-moved", {viewport: this})
  return this
};

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

    let moveEventHandler = event => proposeViewportChange(event.viewport)

    return new Viewport({
      screenWidth: props.app.renderer.width,
      screenHeight: props.app.renderer.height,
      interaction: props.app.renderer.plugins.interaction,
      stopPropagation: true
    }).drag()
      .pinch()
      .wheel()
      .clampZoom({
        maxHeight: 256,
        maxWidth: 256,
        minHeight: 16,
        minWidth: 16
      })
      .on("drag-end", moveEventHandler)
      .on("move-end", moveEventHandler)
      .on("zoomed", moveEventHandler)
      .on("click-moved", moveEventHandler)
      .moveAndUpdate(0,0)
    //   .decelerate();
  },
})