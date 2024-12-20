export type userEvent = MouseEvent | TouchEvent;
export type deviceEventType = 'mouse' | 'touch';

type DomType = {
  imageContainer: HTMLDivElement | null;
  productImage: HTMLImageElement | null;
  overlay: HTMLDivElement | null;
  mouseOverlayElem: HTMLDivElement | null;
  zoomImage: HTMLDivElement | null;
};

const events = {
  mouse: {
    move: 'mousemove',
    start: 'mousedown',
    end: 'mouseup',
    leave: 'mouseleave',
  },
  touch: {
    move: 'touchmove',
    start: 'touchstart',
    end: 'touchend',
    leave: 'touchend',
  },
} as const;

const elements: DomType = {
  imageContainer: document.querySelector('.zoom_container'),
  productImage: document.querySelector('.product-image'),
  overlay: document.querySelector('.overlay'),
  mouseOverlayElem: document.querySelector('.mouse-overlay'),
  zoomImage: document.querySelector('.zoom_image'),
};

export { elements, events };
