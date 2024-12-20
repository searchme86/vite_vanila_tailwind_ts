import { deviceEventType, userEvent } from './zoomInVariable.js';

const detectCurrentDeviceType = () => {
  let currentEventType: deviceEventType =
    'ontouchstart' in window ? 'touch' : 'mouse';
  return currentEventType;
};

const getUserMouseTouchPoint = (e: userEvent, deviceType: deviceEventType) => {
  console.log('현재 이벤트는', e);
  if (deviceType === 'mouse' && 'pageX' in e) {
    return { x: e.pageX, y: e.pageY };
  } else if (deviceType === 'touch' && 'touches' in e) {
    const firstTouchPosition = e.touches[0];
    if (firstTouchPosition) {
      return { x: firstTouchPosition.pageX, y: firstTouchPosition.pageY };
    }
  }
  throw new Error('Invalid event type or device type');
};

const calcCurrentElemRect = (dom: HTMLElement | null) => {
  if (!dom) {
    throw new Error('dom을 입력해주세요');
  }
  return dom.getBoundingClientRect();
};

const calcMinMaxRange = (value1: number, value2: number, value3: number) => {
  let result: number;
  result = Math.min(Math.max(value1, value2), value3);
  return result;
};

export {
  detectCurrentDeviceType,
  getUserMouseTouchPoint,
  calcCurrentElemRect,
  calcMinMaxRange,
};
