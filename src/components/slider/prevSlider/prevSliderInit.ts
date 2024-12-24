import { imageContainer } from './parts/prevSliderImage.js';
import { buttons } from './parts/prevSliderButton.js';
import { calcIndex } from './utils/prevSliderIndex.js';
import { keyboardEvents } from './utils/prevSliderKeyEvent.js';
import { dragEvents } from './utils/prevSliderDragEvent.js';

const attachResizeEvent = () => {
  window.addEventListener('resize', calcIndex.calcMaxVisibleCountNumber);
};

const init = () => {
  const totalImageNum = document.querySelector('.total-image-num');
  const images = imageContainer.imageArray();

  if (totalImageNum && images) {
    totalImageNum.textContent = images.length.toString(); // 동적으로 전체 이미지 개수 설정
  }

  imageContainer.createImages();
  buttons.attachNavigationEvents();
  keyboardEvents.attachKeyboardAccessibility();
  dragEvents.addDragEvent();
  dragEvents.addTouchEvent();
  attachResizeEvent(); // Attach resize event
  imageContainer.selectImage(0); // Initialize with the first image
};

init();
