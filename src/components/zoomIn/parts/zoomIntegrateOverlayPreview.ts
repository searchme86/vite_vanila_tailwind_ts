/**
 * 마우스 오버레이 (zoomInOverlay.ts)와
 * 미리보기 이미지 (zoomPreview.ts)를 서로 연결하는 내용
 * 마우스 오버레이로 보이는 이미지를 어떻게 미리보기 이미지에 보일지를 처리
 */

import { elements } from '../util/zoomInVariable.js';
import { Overlay, OverlayBound } from './zoomOverlay.js';
import { setBackgroundWorks } from './zoomPreview.js';

const Integration = {
  // 현재 유저가 입력한 터치 혹은 마우스 이벤트
  mixOverlayBackground(currentXPosition: number, currentYPosition: number) {
    // 미리보기 이미지와 마우스 오버레이로 사용 할 각각의 DOM 엘리먼트가 존재하면
    if (elements.zoomImage && elements.mouseOverlayElem) {
      // 현재 유저의 이벤트 X,Y 위치를 가지고, 현재 이미지 영역 안에서(limit) 움직일 수 있는 제한적인 가동범위를 구함
      let calculatedXYBoundPosition = Overlay?.position?.setOverlayBound(
        currentXPosition,
        currentYPosition
      );

      if (calculatedXYBoundPosition) {
        // 그렇게 계산된
        // x축방향으로 이미지 안에서만 움직일 수 있는 값(xMovableLimitInImage)
        // y축방향으로 이미지 안에서만 움직일 수 있는 값(yMovableLimitInImage)
        //
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
