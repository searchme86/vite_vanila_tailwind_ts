// import { queryDom } from '../../util/queryDom.js';

// const menu = document.getElementById('menu'); //div
// const links = menu.querySelectorAll('.text_menu'); //span
// const sections = document.querySelectorAll('.content'); // div

const menu = document.getElementById('menu') as HTMLDivElement | null;
const links = menu
  ? (menu.querySelectorAll('.text_menu') as NodeListOf<HTMLSpanElement>)
  : null;
const sections = document.querySelectorAll(
  '.content'
) as NodeListOf<HTMLDivElement>;

// Helper to scroll a section to the top of the viewport
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId); // sectionId가 id로 존재한다고 가정

  if (section) {
    const sectionTop = section.offsetTop; // 섹션의 offsetTop을 기준으로 정확히 맞춤
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth',
    });
  }
};

// function scrollToSection(sectionId: string) {
//   const section = document.getElementById(sectionId); // sectionId가 id로 존재한다고 가정

//   if (section) {
//     const sectionTop = section.offsetTop; // 섹션의 offsetTop을 기준으로 정확히 맞춤
//     window.scrollTo({
//       top: sectionTop,
//       behavior: 'smooth',
//     });
//   }
// }

if (links instanceof NodeList) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      if (targetId) {
        // 수정된 선택자에서 data-target 사용
        scrollToSection(targetId);

        // Update active state for menu
        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// Menu click event

// ScrollSpy functionality
function updateActiveSection() {
  let currentSectionId = '';

  if (sections instanceof NodeList) {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Activate section when its top reaches the top of the viewport
      if (rect.top <= 0 && rect.bottom > 0) {
        currentSectionId = `#${section.id}`;
      }
    });
  }

  // Update active state in the menu
  if (links instanceof NodeList) {
    links.forEach((link) => {
      if (link.getAttribute('data-target') === currentSectionId.slice(1)) {
        // 수정된 선택자에 맞게
        link.classList.add('active');

        // Ensure active link is visible in the menu
        const activeLinkRect = link.getBoundingClientRect();

        if (menu instanceof HTMLDivElement) {
          const menuRect = menu.getBoundingClientRect();
          if (
            activeLinkRect.left < menuRect.left ||
            activeLinkRect.right > menuRect.right
          ) {
            link.scrollIntoView({ behavior: 'smooth', inline: 'center' });
          }
        }
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Call once on initial load
updateActiveSection();

// Scroll event listener
document.addEventListener('scroll', updateActiveSection);

// Resize event listener to update the scroll position
window.addEventListener('resize', () => {
  updateActiveSection();
});

// Menu drag/slide functionality
let isMouseDown = false;
let startX: number | undefined;
let scrollLeft: number;

if (menu instanceof HTMLDivElement) {
  menu.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - menu.offsetLeft;
    scrollLeft = menu.scrollLeft;
    menu.style.cursor = 'grabbing';
  });
  menu.addEventListener('mouseleave', () => {
    isMouseDown = false;
    menu.style.cursor = 'default';
  });

  menu.addEventListener('mouseup', () => {
    isMouseDown = false;
    menu.style.cursor = 'default';
  });

  menu.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - menu.offsetLeft;
    if (startX) {
      const walk = (x - startX) * 2; // Scroll speed
      menu.scrollLeft = scrollLeft - walk;
    }
  });

  menu.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    startX = e.touches[0].pageX - menu.offsetLeft;
    scrollLeft = menu.scrollLeft;
  });

  menu.addEventListener('touchend', () => {
    isMouseDown = false;
  });

  menu.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;
    const x = e.touches[0].pageX - menu.offsetLeft;
    if (startX) {
      const walk = (x - startX) * 2; // Scroll speed
      menu.scrollLeft = scrollLeft - walk;
    }
  });
}

// Support for touch events (for mobile)
