// Types
type NullableHTMLElement = HTMLDivElement | null;
type NullableNodeList = NodeListOf<HTMLSpanElement>;

// Global Variables
const menuBox = document.querySelector('.menu') as NullableHTMLElement; // 메뉴 요소
const textMenu: NullableNodeList = document.querySelectorAll('.text_menu'); // 모든 메뉴 항목
const sectionContent = document.querySelectorAll(
  '.section_content'
) as NodeListOf<HTMLDivElement>;

let isMouseDown = false;
let startX: number | undefined;
let scrollLeft: number;

// 특정 data-taret id로 이동함 (Scroll to section)
const scrollToSection = (sectionId: string) => {
  const eachSection = document.querySelector(`.${sectionId}`);
  if (eachSection) {
    window.scrollTo({
      top: eachSection.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    });
  }
};

// Utility: Update Active Section
const updateActiveSection = () => {
  let currentSectionId = '';
  sectionContent.forEach((eachSection) => {
    const { top, bottom } = eachSection.getBoundingClientRect();
    if (top <= 0 && bottom > 0) {
      currentSectionId = eachSection.classList[1]; // section1, section2 같은 클래스 가져오기
    }
  });

  textMenu.forEach((eachTextMenu) => {
    const targetId = eachTextMenu.getAttribute('data-target');
    if (targetId === currentSectionId) {
      eachTextMenu.classList.add('active');
      scrollCurrentMenuToCenter(eachTextMenu);
    } else {
      eachTextMenu.classList.remove('active');
    }
  });
};

// Utility: Scroll Menu to Active Link
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

// Event Handlers: Menu Click Events
const setupMenuClickHandler = () => {
  textMenu.forEach((eachText) => {
    eachText.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const targetId = eachText.getAttribute('data-target');
      if (targetId) {
        scrollToSection(targetId);
        textMenu.forEach((eachText) => eachText.classList.remove('active'));
        eachText.classList.add('active');
      }
    });
  });
};

// Event Handlers: Scroll Events
const setupScrollSpy = () => {
  document.addEventListener('scroll', updateActiveSection);
  window.addEventListener('resize', updateActiveSection);
};

// Event Handlers: Menu Drag Events
const setupMenuDragHandler = () => {
  if (!menuBox) return;

  const onMouseDown = (e: MouseEvent | TouchEvent) => {
    isMouseDown = true;
    const pageX = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    startX = pageX - menuBox.offsetLeft;
    scrollLeft = menuBox.scrollLeft;
    menuBox.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isMouseDown || !startX) return;
    e.preventDefault();
    const pageX = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    const walk = (pageX - startX - menuBox.offsetLeft) * 2;
    menuBox.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    isMouseDown = false;
    menuBox.style.cursor = 'default';
  };

  // Mouse Events
  menuBox.addEventListener('mousedown', onMouseDown);
  menuBox.addEventListener('mousemove', onMouseMove);
  menuBox.addEventListener('mouseup', onMouseUpOrLeave);
  menuBox.addEventListener('mouseleave', onMouseUpOrLeave);

  // Touch Events
  menuBox.addEventListener('touchstart', onMouseDown);
  menuBox.addEventListener('touchmove', onMouseMove);
  menuBox.addEventListener('touchend', onMouseUpOrLeave);
};

// Initialization
const init = () => {
  setupMenuClickHandler();
  setupScrollSpy();
  setupMenuDragHandler();
  updateActiveSection(); // Run once on load
};

// Start
init();
