import { getCurrentDataTarget } from '../utils/scrollSpyHelperFunc.js';
import { menuBox, textMenu } from '../utils/scrollSpyVariable.js';
import { getCurrentVisibleSectionId } from './scrollSpySection.js';

// 메뉴가 뷰포트 왼쪽/오른쪽에 가릴 경우, active 한 매뉴가 화면 중앙에 위치하도록 함
const scrollCurrentMenuToCenter = (eachMenu: HTMLSpanElement) => {
  const activeLinkRect = eachMenu.getBoundingClientRect();
  const menuRect = menuBox?.getBoundingClientRect();

  if (menuBox && menuRect) {
    if (
      activeLinkRect.left < menuRect.left ||
      activeLinkRect.right > menuRect.right
    ) {
      eachMenu.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }
};

// 현재 그 eachTextMenu(span)을 active 하면서 해당 엘리먼트를 화면 중앙에 오도록 함
const animateCurrentMenu = (eachTextMenu: HTMLSpanElement) => {
  eachTextMenu.classList.add('active');
  scrollCurrentMenuToCenter(eachTextMenu);
};

// 해당 섹션의 id에 따른 메뉴 인터렉션을 위한 코드
const animateCurrentMenuSection = () => {
  let currentSectionId = getCurrentVisibleSectionId();

  textMenu.forEach((eachTextMenu) => {
    const targetId = getCurrentDataTarget(eachTextMenu);
    if (targetId) {
      if (targetId === currentSectionId) {
        animateCurrentMenu(eachTextMenu);
      } else {
        eachTextMenu.classList.remove('active');
      }
    }
  });
};

export {
  scrollCurrentMenuToCenter,
  animateCurrentMenu,
  animateCurrentMenuSection,
};
