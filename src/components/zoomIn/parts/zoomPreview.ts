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
  calcValueHowmuchImageVisible(
    positionLimitValue: number,
    domRectValue1: number,
    domRectValue2: number
  ) {
    let calculatedValue: number;

    calculatedValue = parseFloat(
      (((positionLimitValue - domRectValue1) / domRectValue2) * 100).toFixed(4)
    );

    return calculatedValue;
  },
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

const setBackgroundWorks = (backgroundObj: backgroundWoksInfo) => {
  if (backgroundObj) {
    const {
      xMovableLimitInImage,
      yMovableLimitInImage,
      overlay,
      zoomImageBounds: { top, left, width, height },
    } = backgroundObj;

    const xHowMuchVisibleOfImage =
      previewBackground.calcValueHowmuchImageVisible(
        xMovableLimitInImage,
        left,
        width
      );

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
