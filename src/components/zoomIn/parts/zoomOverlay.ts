/**
 * 마우스 오버레이 관련 함수모음
 */

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
    // 의존 : 함수 adjustSizeToImage
    // adjustSizeToImage 함수에서 계산된 값을 elements.mouseOverlayElem을 적용하여 계산된 만큼 사이즈를 계산
    // [Overlay 유틸] 계산의 내용을 구분하기 위해 개별 함수를 정의함
    setMouseOverlaySize(width: number, height: number) {
      if (elements.mouseOverlayElem) {
        elements.mouseOverlayElem.style.width = `${width}px`;
        elements.mouseOverlayElem.style.height = `${height}px`;
      }
    },

    // 의존 : 함수 setMouseOverlaySize
    // [Overlay 유틸]  이미지 사이즈에 비례하여, 희망하는 비율에 맞게 오버레이(css 색상) 사이즈를 계산함
    adjustSizeToImage(sizeRatio: number) {
      if (elements.zoomImage) {
        const zoomImageBounds = elements.zoomImage.getBoundingClientRect();
        const width = zoomImageBounds.width * sizeRatio; // 예: 이미지 너비의 sizeRatio만큼 적용
        const height = zoomImageBounds.height * sizeRatio; // 예: 이미지 높이의 sizeRatio만큼 적용
        this.setMouseOverlaySize(width, height);
      }
    },

    // 의존 : 함수 setMouseOverlaySize, 함수 adjustSizeToImage
    // 마우스 오버레이를 생성하는 함수
    // 생성하는 기능에 촛점을 두고 함수 생성
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

  // 의존 : 함수 createOverlay
  // 마우스 오버레이의 사이즈의 비율을 커스텀으로 설정하고 싶은 경우를 대비해 함수 생성
  // 옵셔널 가로/세로값을 설정에 현재 사이즈에 만족하면 값을 넣지 않아도 됨
  initiateOverlay(
    sizeRatio: number,
    customOverlayWidth?: number,
    customOverlayHeight?: number
  ) {
    this.size.createOverlay(sizeRatio, customOverlayWidth, customOverlayHeight);
  },

  // Overlay의 위치를 계산
  position: {
    // Overlay가 움직일 제한구역(Bound)을 설정
    // Overlay가 이미지 안에서만 이동하도록 처리
    setOverlayBound(currentXPosition: number, currentYPosition: number) {
      if (elements.zoomImage && elements.mouseOverlayElem) {
        const zoomImageBounds = calcCurrentElemRect(elements.zoomImage);
        const mouseOverlayBounds = calcCurrentElemRect(
          elements.mouseOverlayElem
        );

        // 이미지 사이즈 안에서 x축 방향으로 움직일때, 마우스 오버레이가 움직일 제한 거리를 구한다
        const xMovableLimitInImage = calcMinMaxRange(
          currentXPosition,
          zoomImageBounds.left + mouseOverlayBounds.width / 2,
          zoomImageBounds.right - mouseOverlayBounds.width / 2
        );

        // 이미지 사이즈 안에서 y축 방향으로 움직일때, 마우스 오버레이가 움직일 제한 거리를 구한다
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

    // 마우스 오버레이의 위치를 구함
    // xMovableLimitInImage : 이미지 사이즈 안에서 x축 방향으로 움직일때, 마우스 오버레이가 움직일 제한 거리
    // yMovableLimitInImage : 이미지 사이즈 안에서 y축 방향으로 움직일때, 마우스 오버레이가 움직일 제한 거리
    // 이미지라는 제한 구역안에서 마우스의 오버레이 위치를 구함
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

  // 마우스 오버레이를 사라지게 한다
  hideOverlay() {
    if (elements.overlay && elements.mouseOverlayElem) {
      elements.overlay.style.display = 'none';
      elements.mouseOverlayElem.style.display = 'none';
    }
  },
};

export { Overlay };
