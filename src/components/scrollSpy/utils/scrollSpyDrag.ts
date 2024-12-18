import { menuBox } from './scrollSpyVariable.js';
type useEvent = MouseEvent | TouchEvent;

let isMouseDown = false;
let InitialElemStartPosition: number | undefined;
let currentElemScrolledLeft: number;

// 'pageX'가 MouseEvent에만 있는 속성이고, TouchEvent는 touches 배열을 사용하므로 이를 구분하는 함수
// 처음 유저가 실행한 이벤트에 따른 문서기준으로 포인트 위치
const getFirstEventPageX = (e: useEvent) => {
  let pageX: number | undefined;
  if ('pageX' in e) {
    pageX = e.pageX;
  } else if (e.touches && e.touches.length > 0) {
    const firstTouchPoint = e.touches[0];
    pageX = firstTouchPoint.pageX;
  }
  return pageX;
};

const scrollDragMenu = () => {
  if (!menuBox) return;

  const onMouseDown = (e: useEvent) => {
    isMouseDown = true;
    const userFirstActionPosition = getFirstEventPageX(e); // 공통 함수 사용
    if (menuBox) {
      if (userFirstActionPosition) {
        InitialElemStartPosition = userFirstActionPosition - menuBox.offsetLeft;
        currentElemScrolledLeft = menuBox.scrollLeft;
        menuBox.style.cursor = 'grabbing';
      }
    }
  };

  const onMouseMove = (e: useEvent) => {
    if (!isMouseDown || !InitialElemStartPosition) return;
    e.preventDefault();
    const currentUserPosition = getFirstEventPageX(e); // 공통 함수 사용
    if (menuBox) {
      if (currentUserPosition) {
        // 유저가 새롭게 마우스 혹은 터치 이벤트로 인한 포지션에서 초기 값을 빼는건 정적인 전체 가능 이동거리를 구하려는 것
        // 거기에 menu의 offsetLeft을 빼는 건, 전체 가능 이동거리를 모두 이동가능한게 아니라 menuBox.offsetLeft만큼 이동해야하기 때문에 menuBox.offsetLeft를 뺀다.
        const movableDistance =
          (currentUserPosition -
            InitialElemStartPosition -
            menuBox.offsetLeft) *
          2;
        menuBox.scrollLeft = currentElemScrolledLeft - movableDistance;
      }
    }
  };

  const onMouseUpOrLeave = () => {
    isMouseDown = false;
    if (menuBox) {
      menuBox.style.cursor = 'default';
    }
  };

  // Mouse Events
  menuBox.addEventListener('mousedown', onMouseDown);
  menuBox.addEventListener('mousemove', onMouseMove);
  menuBox.addEventListener('mouseup', onMouseUpOrLeave);
  menuBox.addEventListener('mouseleave', onMouseUpOrLeave);

  // Touch Events
  menuBox.addEventListener('touchstart', onMouseDown);
  menuBox.addEventListener('touchmove', onMouseMove);
  menuBox.addEventListener('touchend', onMouseUpOrLeave);
};

export { scrollDragMenu };
