import { Overlay } from './parts/zoomOverlay.js';
import { EventManager } from './util/zoomInEvent.js';

const zoomInOut = {
  initiate() {
    Overlay.initiateOverlay(0.25);
    EventManager.register();
  },

  resetOnResize() {
    location.reload();
    this.initiate();
  },
};

// Main Entry Point
document.addEventListener('DOMContentLoaded', () => zoomInOut.initiate());
window.addEventListener('resize', zoomInOut.resetOnResize);
