import { NullableNodeList } from './scrollSpyVariable.js';

const getCurrentDataTarget = (eachTextMenu: HTMLSpanElement) => {
  const targetId = eachTextMenu.getAttribute('data-target');
  return targetId;
};

const resetMenuStyle = (textMenu: NullableNodeList) => {
  textMenu.forEach((eachText) => eachText.classList.remove('active'));
};

export { getCurrentDataTarget, resetMenuStyle };
