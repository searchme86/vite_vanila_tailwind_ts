import { calcIndex } from './prevSliderIndex.js';
import { scrollAction } from './prevSliderScroll.js';

const update = {
  sliderContainer: document.querySelector(
    '.slider-container'
  ) as HTMLDivElement | null,
  currentImageNum: document.querySelector(
    '.current-image-num'
  ) as HTMLSpanElement | null,

  updateSlider() {
    const offset = calcIndex.currentIndex * -100;
    if (this.sliderContainer) {
      this.sliderContainer.style.transform = `translateX(${offset}%)`;
    }
  },

  updatePreviewSelection() {
    document.querySelectorAll('.item-preview-image').forEach((item, index) => {
      item.classList.toggle('selected', index === calcIndex.currentIndex);
    });
    scrollAction.scrollToPreviewItem(calcIndex.currentIndex);
  },

  updateCurrentInfo() {
    if (this.currentImageNum) {
      this.currentImageNum.textContent = (
        calcIndex.currentIndex + 1
      ).toString();
    }
  },
};

export { update };
