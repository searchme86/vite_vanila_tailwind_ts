import { update } from './prevSliderUpdate.js';
import { imageContainer } from '../parts/prevSliderImage.js';
import { buttons } from '../parts/prevSliderButton.js';
import { calcIndex } from './prevSliderIndex.js';

const dragEvents = {
  isDragging: false,
  startX: 0,
  currentOffset: 0,

  addTouchEvent() {
    if (update.sliderContainer) {
      update.sliderContainer.addEventListener('touchstart', (e) => {
        this.handler.startDragTouch(e);
      });
      update.sliderContainer.addEventListener('touchmove', (e) => {
        this.handler.dragMoveTouch(e);
      });
      update.sliderContainer.addEventListener('touchend', (e) => {
        this.handler.endDragTouch(e);
      });
      update.sliderContainer.addEventListener('touchcancel', () => {
        this.handler.cancelDrag();
      });
    }
  },

  addDragEvent() {
    if (update.sliderContainer) {
      update.sliderContainer.addEventListener('mousedown', (e) => {
        this.handler.startDrag(e);
      });
      update.sliderContainer.addEventListener('mousemove', (e) => {
        this.handler.dragMove(e);
      });
      update.sliderContainer.addEventListener('mouseup', (e) => {
        this.handler.endDrag(e);
      });
      update.sliderContainer.addEventListener('mouseleave', () => {
        this.handler.cancelDrag();
      });
      update.sliderContainer.addEventListener('dragstart', (e) => {
        e.preventDefault();
      });
    }
  },

  handler: {
    startDrag(e: MouseEvent) {
      e.preventDefault();
      dragEvents.isDragging = true;
      dragEvents.startX = e.clientX;
      dragEvents.currentOffset = -(calcIndex.currentIndex * 100);
      if (update.sliderContainer) {
        update.sliderContainer.style.transition = 'none';
      }
    },

    dragMove(e: MouseEvent) {
      if (!dragEvents.isDragging) return;
      const diff = e.clientX - dragEvents.startX;
      if (update.sliderContainer) {
        update.sliderContainer.style.transform = `translateX(calc(${dragEvents.currentOffset}% + ${diff}px))`;
      }
    },

    endDrag(e: MouseEvent) {
      if (!dragEvents.isDragging) return;
      dragEvents.isDragging = false;
      this.finishDrag(e.clientX - dragEvents.startX);
    },

    cancelDrag() {
      if (dragEvents.isDragging) {
        dragEvents.isDragging = false;
        update.updateSlider();
      }
    },
    startDragTouch(e: TouchEvent) {
      e.preventDefault();
      dragEvents.isDragging = true;
      dragEvents.startX = e.touches[0].clientX;
      dragEvents.currentOffset = -(calcIndex.currentIndex * 100);
      if (update.sliderContainer) {
        update.sliderContainer.style.transition = 'none';
      }
    },
    dragMoveTouch(e: TouchEvent) {
      if (!dragEvents.isDragging) return;
      const diff = e.touches[0].clientX - dragEvents.startX;
      if (update.sliderContainer) {
        update.sliderContainer.style.transform = `translateX(calc(${dragEvents.currentOffset}% + ${diff}px))`;
      }
    },
    endDragTouch(e: TouchEvent) {
      if (!dragEvents.isDragging) return;
      dragEvents.isDragging = false;
      this.finishDrag(e.changedTouches[0].clientX - dragEvents.startX);
    },

    finishDrag: (deltaX: number) => {
      const images = imageContainer.imageArray();
      const threshold = 50;

      if (deltaX > threshold) {
        if (calcIndex.currentIndex > 0)
          imageContainer.selectImage(calcIndex.currentIndex - 1);
        buttons.addClickedText(buttons.sliderPrevButton);
      } else if (deltaX < -threshold) {
        if (calcIndex.currentIndex < images.length - 1)
          imageContainer.selectImage(calcIndex.currentIndex + 1);
        buttons.addClickedText(buttons.sliderNextButton);
      }
      update.updateSlider();
    },
  },
};

export { dragEvents };
