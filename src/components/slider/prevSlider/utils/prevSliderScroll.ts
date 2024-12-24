import { imageContainer } from '../parts/prevSliderImage.js';
import { calcIndex } from './prevSliderIndex.js';

const scrollAction = {
  scrollToPreviewItem(index: number) {
    if (imageContainer.previewImageList) {
      const previewItem = imageContainer.previewImageList.children[index];
      previewItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  },

  shouldScrollToTop() {
    return (
      calcIndex.currentIndex !== 0 &&
      calcIndex.currentIndex % calcIndex.visibleImagesCount === 0
    );
  },

  shouldScrollToEnd(maxCountVisibleItems: number) {
    const isDecrementing = calcIndex.currentIndex < calcIndex.previousIndex;
    const groupEndIndex =
      calcIndex.visibleImagesCount *
        Math.ceil((calcIndex.currentIndex + 1) / calcIndex.visibleImagesCount) -
      1;

    return (
      isDecrementing &&
      calcIndex.currentIndex !== 0 &&
      calcIndex.currentIndex === groupEndIndex
    );
  },
};

export { scrollAction };
