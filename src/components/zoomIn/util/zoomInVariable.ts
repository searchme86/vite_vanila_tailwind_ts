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
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup',
    leave: 'mouseleave',
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
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
