import { elements } from '../util/zoomInVariable.js';
import { Overlay, OverlayBound } from './zoomOverlay.js';
import { setBackgroundWorks } from './zoomPreview.js';

const Integration = {
  mixOverlayBackground(currentXPosition: number, currentYPosition: number) {
    if (elements.zoomImage && elements.mouseOverlayElem) {
      let calculatedXYBoundPosition = Overlay?.position?.setOverlayBound(
        currentXPosition,
        currentYPosition
      );

      if (calculatedXYBoundPosition) {
        const {
          xMovableLimitInImage,
          yMovableLimitInImage,
          zoomImageBounds,
        }: OverlayBound = calculatedXYBoundPosition;

        const backgroundInfo = {
          xMovableLimitInImage,
          yMovableLimitInImage,
          overlay: elements.overlay,
          zoomImageBounds: {
            top: zoomImageBounds.top,
            left: zoomImageBounds.left,
            width: zoomImageBounds.width,
            height: zoomImageBounds.height,
          },
        };

        setBackgroundWorks(backgroundInfo);

        Overlay?.position?.setOverlayPosition(
          yMovableLimitInImage,
          xMovableLimitInImage
        );
      }
    }
  },
};

export { Integration };
