import { calcIndex } from '../utils/prevSliderIndex.js';
import { scrollAction } from '../utils/prevSliderScroll.js';
import { update } from '../utils/prevSliderUpdate.js';

const imageContainer = {
  previewImageList: document.querySelector('.list-preview-image'),
  visibleFrameWrapper: document.querySelector('.list-wrapper'),
  sliderImageList: document.querySelector('.list-image'),

  imageArray() {
    const images = Array.from(
      { length: 20 },
      (_, i) => `https://picsum.photos/800/500?random=${i + 1}`
    );
    return images;
  },

  createImages() {
    if (this.previewImageList && this.sliderImageList) {
      this.previewImageList.innerHTML = '';
      this.sliderImageList.innerHTML = '';

      const imgArray = this.imageArray();

      const imagePromises: Promise<void>[] = imgArray.map((image, index) => {
        return new Promise((resolve) => {
          this.createPreviewImage(image, index, resolve);
          this.createMainImage(image);
        });
      });

      Promise.all(imagePromises).then(() => {
        calcIndex.calcMaxVisibleCountNumber();
      });
    }
  },

  createMainImage(image: string) {
    const imageItem = document.createElement('li');
    imageItem.className = 'item-image';
    const mainImg = document.createElement('img');
    mainImg.src = image;

    imageItem.appendChild(mainImg);
    if (this.sliderImageList) {
      this.sliderImageList.appendChild(imageItem);
    }
  },

  createPreviewImage(image: string, index: number, resolve: () => void) {
    const previewItem = document.createElement('li');
    previewItem.classList.add('item-preview-image');
    const previewImg = document.createElement('img');
    previewImg.src = image;

    previewImg.onload = () => resolve();

    previewItem.appendChild(previewImg);
    previewItem.addEventListener('click', () => this.selectImage(index));
    if (this.previewImageList) {
      this.previewImageList.appendChild(previewItem);
    }
  },

  syncLeftView() {
    if (this.previewImageList && this.visibleFrameWrapper) {
      const previewItems = Array.from(
        this.previewImageList.children
      ) as HTMLLIElement[];
      const itemHeight = previewItems[0]?.offsetHeight || 0;
      const maxCountVisibleItems = calcIndex.visibleImagesCount;

      const inWichGroupValueLocated = Math.floor(
        calcIndex.currentIndex / maxCountVisibleItems
      );

      const scrollHeightBymaxCountVisible = itemHeight * maxCountVisibleItems;

      if (scrollAction.shouldScrollToTop()) {
        previewItems[calcIndex.currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else if (scrollAction.shouldScrollToEnd(maxCountVisibleItems)) {
        previewItems[calcIndex.currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        this.visibleFrameWrapper.scrollTop =
          inWichGroupValueLocated * scrollHeightBymaxCountVisible;
      }

      calcIndex.previousIndex = calcIndex.currentIndex;
    }
  },

  selectImage(index: number) {
    calcIndex.currentIndex = index;
    update.updateSlider();
    update.updatePreviewSelection();
    imageContainer.syncLeftView();
    update.updateCurrentInfo();
  },
};

export { imageContainer };
