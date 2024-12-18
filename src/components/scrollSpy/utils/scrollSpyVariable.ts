export type NullableHTMLElement = HTMLDivElement | null;
export type NullableNodeList = NodeListOf<HTMLSpanElement>;

const menuBox = document.querySelector('.menu') as NullableHTMLElement; // 메뉴 요소
const textMenu: NullableNodeList = document.querySelectorAll('.text_menu'); // 모든 메뉴 항목
const sectionContent = document.querySelectorAll(
  '.section_content'
) as NodeListOf<HTMLDivElement>;

export { menuBox, textMenu, sectionContent };
