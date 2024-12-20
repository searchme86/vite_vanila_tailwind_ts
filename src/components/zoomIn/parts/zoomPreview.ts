/**
 * zoomIn 이미지 관련 함수모음
 * zoomInOut은 background-position의 값으로, 이미지가 확대 된다.
 */

type backgroundWoksInfo = {
  xMovableLimitInImage: number;
  yMovableLimitInImage: number;
  overlay: HTMLDivElement | null;
  zoomImageBounds: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

const previewBackground = {
  // [유틸] 얼마나 zoomIn을 할 지, zoomIn정도의 value를 구한다
  // 마우스 오버레이로, 이미지를 어디를 볼지를 체크
  //  xMovableLimitInImage, left, width,
  calcValueHowmuchImageVisible(
    positionLimitValue: number,
    domRectValue1: number,
    domRectValue2: number
  ) {
    let calculatedValue: number;

    // zoomIn정도의 value
    calculatedValue = parseFloat(
      (((positionLimitValue - domRectValue1) / domRectValue2) * 100).toFixed(4)
    );

    return calculatedValue;
  },

  // zoomIn으로 보여질 영역에
  // 마우스 오버레이로 보여질 내용을
  // 설정함
  setOverlayBackgroundPosition(
    overLayElem: HTMLDivElement | null,
    xHowMuchVisibleOfImage: number,
    yHowMuchVisibleOfImage: number
  ) {
    if (overLayElem) {
      overLayElem.style.display = 'block';
      overLayElem.style.backgroundPosition = `${xHowMuchVisibleOfImage}% ${yHowMuchVisibleOfImage}%`;
    }
  },
};

// zoomIntegrateOverlayPreview.ts에서 사용됨
// ZoomIn될 이미지 처리를 담당
const setBackgroundWorks = (backgroundObj: backgroundWoksInfo) => {
  if (backgroundObj) {
    const {
      xMovableLimitInImage,
      yMovableLimitInImage,
      overlay,
      zoomImageBounds: { top, left, width, height },
    } = backgroundObj;

    //  x축방향으로 움직일 수 있는 이미지 가동범위에서, 이미지 사이즈(width)에서 얼마나 좌우(left)를 볼지
    const xHowMuchVisibleOfImage =
      previewBackground.calcValueHowmuchImageVisible(
        xMovableLimitInImage,
        left,
        width
      );

    //  y축방향으로 움직일 수 있는 이미지 가동범위에서, 이미지 높이(height)에서 얼마나 위아래(top)를 볼지
    const yHowMuchVisibleOfImage =
      previewBackground.calcValueHowmuchImageVisible(
        yMovableLimitInImage,
        top,
        height
      );

    previewBackground.setOverlayBackgroundPosition(
      overlay,
      xHowMuchVisibleOfImage,
      yHowMuchVisibleOfImage
    );
  }
};

export { setBackgroundWorks };
