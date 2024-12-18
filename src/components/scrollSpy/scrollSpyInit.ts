import { textMenu } from './utils/scrollSpyVariable.js';
import { scrollDragMenu } from './utils/scrollSpyDrag.js';
import { scrollToSection } from './applying/scrollSpySection.js';
import {
  getCurrentDataTarget,
  resetMenuStyle,
} from './utils/scrollSpyHelperFunc.js';
import { animateCurrentMenuSection } from './applying/scrollSpyMenu.js';

// 전체 기능이 적용된 스크롤파이 기능을 실행
const animateScrollSpy = () => {
  textMenu.forEach((eachText) => {
    eachText.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const targetId = getCurrentDataTarget(eachText);
      if (targetId) {
        scrollToSection(targetId);
        resetMenuStyle(textMenu);
        eachText.classList.add('active');
      }
    });
  });
};

// 초기화
const initialSetup = () => {
  window.addEventListener('DOMContentLoaded', animateCurrentMenuSection);
  window.addEventListener('resize', animateCurrentMenuSection);
  document.addEventListener('scroll', animateCurrentMenuSection);
};

// Initialization
const startScrollSpy = () => {
  initialSetup();
  animateScrollSpy();
  animateCurrentMenuSection(); // Run once on load
  scrollDragMenu();
};

// Start
startScrollSpy();
