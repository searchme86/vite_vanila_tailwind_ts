import { Integration } from '../parts/zoomIntegrateOverlayPreview.js';
import { Overlay } from '../parts/zoomOverlay.js';
import {
  detectCurrentDeviceType,
  getUserMouseTouchPoint,
} from './zoomInUtilFunc.js';
import {
  deviceEventType,
  elements,
  events,
  userEvent,
} from './zoomInVariable.js';

// Event Registration
const EventManager = {
  register() {
    const deviceType = detectCurrentDeviceType();

    // Add event listeners
    if (elements.zoomImage) {
      elements.zoomImage.addEventListener(events[deviceType].start, (e) =>
        EventHandlers.type.mouse.handleStartEvent(e, deviceType)
      );
      elements.zoomImage.addEventListener(
        events[deviceType].move,
        (e) => {
          if (deviceType === 'touch') {
            EventHandlers.type.touch.handleTouchMove(e);
          } else {
            EventHandlers.type.mouse.handleMoveEvent(e, deviceType);
          }
        },
        { passive: false } // Ensure passive is false for touchmove
      );
      elements.zoomImage.addEventListener(
        events[deviceType].end,
        EventHandlers.type.mouse.handleEndEvent
      );
      elements.zoomImage.addEventListener(
        events[deviceType].leave,
        EventHandlers.type.mouse.handleLeaveEvent
      );
    }
  },
};

const EventHandlers = {
  type: {
    mouse: {
      handleMoveEvent(e: userEvent, deviceType: deviceEventType) {
        try {
          const { x, y } = getUserMouseTouchPoint(e, deviceType);
          Overlay.position.setOverlayBound(x, y);
          Integration.mixOverlayBackground(x, y);
        } catch (error) {
          console.error('Error handling move event:', error);
        }
      },
      handleStartEvent(e: userEvent, deviceType: deviceEventType) {
        const { x, y } = getUserMouseTouchPoint(e, deviceType);
        Integration.mixOverlayBackground(x, y);
      },
      handleEndEvent() {
        Overlay.hideOverlay();
      },
      handleLeaveEvent() {
        Overlay.hideOverlay(); // Hide the overlay when the mouse leaves the zoomImage area
      },
    },
    touch: {
      handleTouchMove(e: userEvent) {
        e.preventDefault(); // Prevent default touch scrolling behavior
        EventHandlers.type.mouse.handleMoveEvent(e, 'touch');
      },
    },
  },
};

export { EventManager };
