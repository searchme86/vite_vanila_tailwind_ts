import { imageContainer } from '../parts/prevSliderImage.js';
import { calcIndex } from './prevSliderIndex.js';
import { buttons } from '../parts/prevSliderButton.js';

const keyboardEvents = {
  keyEnter: 'Enter',
  keyUp: 'ArrowUp',
  keyLeft: 'ArrowLeft',
  keyDown: 'ArrowDown',
  keyRight: 'ArrowRight',

  attachKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
      const focusedButton = document.activeElement;
      const images = imageContainer.imageArray();

      if (e.key === this.keyUp || e.key === this.keyLeft) {
        if (calcIndex.currentIndex > 0)
          imageContainer.selectImage(calcIndex.currentIndex - 1);
      } else if (e.key === this.keyDown || e.key === this.keyRight) {
        if (calcIndex.currentIndex < images.length - 1)
          imageContainer.selectImage(calcIndex.currentIndex + 1);
      }
      if (e.key === this.keyEnter) {
        e.preventDefault();
        if (focusedButton && focusedButton.tagName === 'BUTTON') {
          if (
            focusedButton === buttons.sliderPrevButton &&
            calcIndex.currentIndex > 0
          ) {
            imageContainer.selectImage(calcIndex.currentIndex - 1);
          } else if (
            focusedButton === buttons.sliderNextButton &&
            calcIndex.currentIndex < images.length - 1
          ) {
            imageContainer.selectImage(calcIndex.currentIndex + 1);
          }
          buttons.addClickedText(focusedButton);
        }
      }
    });
  },
};

export { keyboardEvents };
