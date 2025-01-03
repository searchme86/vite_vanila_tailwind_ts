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

// 유저의 이벤트(터치/마우스)가 발생 할 경우, 실행 할 이벤트 핸들러를 정의
const EventManager = {
  register() {
    // 이벤트 종류가 터치 인지, 마우스 인지를 구분
    const deviceType = detectCurrentDeviceType();

    // 이벤트를 실행할 대상(이미지)이 있다면
    if (elements.zoomImage) {
      // 다음의 이벤트를 바인딩한다
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
        // touchmove 이벤트를 위한 처리 (Ensure passive is false for touchmove)
        // 터치 이벤트는 브라우저 기본 동작과 연결이 있어 { passive: false } 처리함
        // addEventListener는 디폴트로 passive:true 여서 기본동작 취소(e.preventDefault())를 해도 기본동작이 취소가 안됨
        // 그래서 false를 통해서 기본동작 취소가 되도록 설정해야함
        // touchmove를 할 경우, 브라우저의 스크롤 이벤트가 발생하여 원하는 이벤트가 발생하지 않음
        { passive: false }
      );
      elements.zoomImage.addEventListener(
        events[deviceType].end,
        EventHandlers.type.mouse.handleEndEvent
      );
      // 마우스를 이미지 영역에서 나올 때(leave), mouseleave 이벤트 실행을 위해 추가
      elements.zoomImage.addEventListener(
        events[deviceType].leave,
        EventHandlers.type.mouse.handleLeaveEvent
      );
    }
  },
};

// 그런 이벤트 핸들러를 정의함
const EventHandlers = {
  // 이벤트 타입이 mouse 일 경우, touch 일 경우
  type: {
    mouse: {
      handleStartEvent(e: userEvent, deviceType: deviceEventType) {
        const { x, y } = getUserMouseTouchPoint(e, deviceType);
        Integration.mixOverlayBackground(x, y);
      },
      handleMoveEvent(e: userEvent, deviceType: deviceEventType) {
        try {
          // 현재 유저의 이벤트 x,y를 구함
          const { x, y } = getUserMouseTouchPoint(e, deviceType);
          // 그런 x.y와 미리보기 할 이미지의 Rect 정보를 바탕으로
          // 오버레이가 최대 가동가능한 x,y 값(xMovableLimitInImage,yMovableLimitInImage)을 구하고
          Overlay.position.setOverlayBound(x, y);
          // 값(xMovableLimitInImage,yMovableLimitInImage), 오버레이 엘리먼트
          // 이미지 정보를 모두 취합하여
          // [최종] setOverlayPosition 메서드를 통해 오버레이 위치(position)를 정함
          Integration.mixOverlayBackground(x, y);
        } catch (error) {
          console.error('Error handling move event:', error);
        }
      },
      handleEndEvent() {
        Overlay.hideOverlay();
      },
      // 이미지가 이미지 영역에서 벗어나면 오버레이를 사라지게 한다

      handleLeaveEvent() {
        Overlay.hideOverlay();
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
