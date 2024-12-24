import { calcIndex } from '../utils/prevSliderIndex.js';
import { imageContainer } from './prevSliderImage.js';

const buttons = {
  sliderPrevButton: document.querySelector('.prev-btn'),
  sliderNextButton: document.querySelector('.next-btn'),

  attachNavigationEvents() {
    const images = imageContainer.imageArray();
    if (this.sliderPrevButton) {
      this.sliderPrevButton.addEventListener('click', () => {
        if (calcIndex.currentIndex > 0)
          imageContainer.selectImage(calcIndex.currentIndex - 1);
        this.addClickedText(this.sliderPrevButton);
      });
    }

    if (this.sliderNextButton) {
      this.sliderNextButton.addEventListener('click', () => {
        if (calcIndex.currentIndex < images.length - 1)
          imageContainer.selectImage(calcIndex.currentIndex + 1);
        this.addClickedText(this.sliderNextButton);
      });
    }
  },
  addClickedText(button: Element | null) {
    if (button && this.sliderPrevButton && this.sliderNextButton) {
      [this.sliderPrevButton, this.sliderNextButton].forEach((btn) => {
        const existingText = btn.querySelector('.offscreen');
        if (existingText) {
          existingText.remove();
        }
      });
    }

    // 버튼에 텍스트를 추가
    if (button) {
      const span = document.createElement('span');
      span.classList.add('offscreen');
      span.textContent = '클릭함';
      button.appendChild(span);
    }
  },
};

export { buttons };
