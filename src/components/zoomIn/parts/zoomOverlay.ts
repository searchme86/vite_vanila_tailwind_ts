import { elements } from '../util/zoomInVariable.js';
import {
  calcCurrentElemRect,
  calcMinMaxRange,
} from '../util/zoomInUtilFunc.js';

export type OverlayBound = {
  xMovableLimitInImage: number;
  yMovableLimitInImage: number;
  zoomImageBounds: DOMRect;
};

const Overlay = {
  size: {
    setMouseOverlaySize(width: number, height: number) {
      if (elements.mouseOverlayElem) {
        elements.mouseOverlayElem.style.width = `${width}px`;
        elements.mouseOverlayElem.style.height = `${height}px`;
      }
    },

    adjustSizeToImage(sizeRatio: number) {
      if (elements.zoomImage) {
        const zoomImageBounds = elements.zoomImage.getBoundingClientRect();
        const width = zoomImageBounds.width * sizeRatio; // 예: 이미지 너비의 sizeRatio만큼 적용
        const height = zoomImageBounds.height * sizeRatio; // 예: 이미지 높이의 sizeRatio만큼 적용
        this.setMouseOverlaySize(width, height);
      }
    },

    createOverlay(
      sizeRatio: number,
      customOverlayWidth?: number,
      customOverlayHeight?: number
    ) {
      if (customOverlayWidth && customOverlayHeight) {
        this.setMouseOverlaySize(customOverlayWidth, customOverlayHeight);
      } else {
        this.adjustSizeToImage(sizeRatio);
      }
    },
  },

  // Set mouse overlay size based on provided arguments or default to image size
  initiateOverlay(
    sizeRatio: number,
    customOverlayWidth?: number,
    customOverlayHeight?: number
  ) {
    this.size.createOverlay(sizeRatio, customOverlayWidth, customOverlayHeight);
  },

  position: {
    setOverlayBound(currentXPosition: number, currentYPosition: number) {
      if (elements.zoomImage && elements.mouseOverlayElem) {
        const zoomImageBounds = calcCurrentElemRect(elements.zoomImage);
        const mouseOverlayBounds = calcCurrentElemRect(
          elements.mouseOverlayElem
        );

        // Limit mouse overlay position
        const xMovableLimitInImage = calcMinMaxRange(
          currentXPosition,
          zoomImageBounds.left + mouseOverlayBounds.width / 2,
          zoomImageBounds.right - mouseOverlayBounds.width / 2
        );

        const yMovableLimitInImage = calcMinMaxRange(
          currentYPosition,
          zoomImageBounds.top + mouseOverlayBounds.height / 2,
          zoomImageBounds.bottom - mouseOverlayBounds.height / 2
        );

        return {
          xMovableLimitInImage,
          yMovableLimitInImage,
          zoomImageBounds,
          mouseOverlayBounds,
        };
      }
    },

    setOverlayPosition(
      yMovableLimitInImage: number,
      xMovableLimitInImage: number
    ) {
      if (elements.mouseOverlayElem) {
        if (elements.mouseOverlayElem) {
          // Set mouse overlay position
          elements.mouseOverlayElem.style.display = 'inline-block';
          elements.mouseOverlayElem.style.top = `${yMovableLimitInImage}px`;
          elements.mouseOverlayElem.style.left = `${xMovableLimitInImage}px`;
        }
      }
    },
  },

  hideOverlay() {
    if (elements.overlay && elements.mouseOverlayElem) {
      elements.overlay.style.display = 'none';
      elements.mouseOverlayElem.style.display = 'none';
    }
  },
};

export { Overlay };
