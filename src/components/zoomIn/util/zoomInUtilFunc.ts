import { deviceEventType, userEvent } from './zoomInVariable.js';

// [유틸] 현재 기기상태가 데스트탑인지 모바일버전 인지를 구분
// 터치가 가능한지, 마우스 이벤트가 가능한지를 체크
// ontouchstart가 있으면, 모바일 기기 아니면 데스크탑
const detectCurrentDeviceType = () => {
  let currentEventType: deviceEventType =
    'ontouchstart' in window ? 'touch' : 'mouse';
  return currentEventType;
};

// [유틸] 현재 유저의 이벤트 위치
// 마우스라면, 마우스의 x축 y축 정보
// 터치라면, 터치한 첫번째(e.touches[0]) 정보
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

// [유틸] 뷰포트 기준, 엘리먼트의 위치를 계산함
// 이벤트 위치(x,y 혹은 마우스 오버레이의 x,y)을 기준 엘리먼트(이미지)에서 얼마나 위치하는지를 계산
const calcCurrentElemRect = (dom: HTMLElement | null) => {
  if (!dom) {
    throw new Error('dom을 입력해주세요');
  }
  return dom.getBoundingClientRect();
};

// [유틸] 구간을 구함
// 값이 최소 어디부터 최대 어디까지 가능한지, 그런 구간을 계산함
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
