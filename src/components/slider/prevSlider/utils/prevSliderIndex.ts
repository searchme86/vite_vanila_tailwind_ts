import { imageContainer } from '../parts/prevSliderImage.js';

const calcIndex = {
  currentIndex: 0,
  previousIndex: 0,
  visibleImagesCount: 0,
  visibleFrameWrapper: document.querySelector('.list-wrapper'),

  calcMaxVisibleCountNumber() {
    if (imageContainer.previewImageList && this.visibleFrameWrapper) {
      const imageItemList = Array.from(
        imageContainer.previewImageList.children
      );
      const wrapperRect = this.visibleFrameWrapper.getBoundingClientRect();
      let visibleCount = 0;

      imageItemList.forEach((item) => {
        const itemRect = item.getBoundingClientRect();

        if (
          itemRect.top >= wrapperRect.top &&
          itemRect.bottom <= wrapperRect.bottom
        ) {
          visibleCount++;
        }
      });
      this.visibleImagesCount = visibleCount; // 실제 보이는 이미지 갯수
    }
  },
};

export { calcIndex };
