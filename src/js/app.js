import Popover from './popovers';

const button = document.querySelector('.btn');
const tooltip = new Popover(button);
tooltip.init();
