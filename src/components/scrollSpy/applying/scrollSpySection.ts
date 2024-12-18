import { sectionContent } from '../utils/scrollSpyVariable.js';

// 클릭 이벤트가 발생하면 해당 섹션 id의 컨텐츠가 뷰포트 상단으로 이동함
const scrollToSection = (sectionId: string) => {
  const eachSection = document.querySelector(`.${sectionId}`);
  if (eachSection) {
    window.scrollTo({
      top: eachSection.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    });
  }
};

// 각 해당 섹션을 뷰포트 상단 기준으로 해서, 상단 기준에 있는 그 섹션의 id를 구하는 함수
// 뷰포트 상단은 0, top이 0을 기준으로 작거나 같으면 상단을 살짝 넘었거나 상단 탑에 위치하는 것이고
// bottom이 0보다 크단건 아직 bottom이 뷰포트를 넘어가지 않은 상태를 의미함
// 즉 current section을 구하고 그 섹션의 id을 구함
const getCurrentVisibleSectionId = () => {
  let currentSectionId = '';
  sectionContent.forEach((eachSection) => {
    const { top, bottom } = eachSection.getBoundingClientRect();
    if (top <= 0 && bottom > 0) {
      currentSectionId = eachSection.classList[1]; // section1, section2 같은 클래스 가져오기
    }
  });
  return currentSectionId;
};

export { scrollToSection, getCurrentVisibleSectionId };
