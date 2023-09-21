import { MouseEvent } from "react";

const clickOutside = (event: MouseEvent, element: HTMLElement | null) => {
  if (!element) return false;

  const dialogDimensions = element.getBoundingClientRect() || {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    return true;
  }

  return false;
};

export default clickOutside;
