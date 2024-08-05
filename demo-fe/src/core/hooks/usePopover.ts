import { useState, MouseEvent } from 'react';

export const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState<
    HTMLButtonElement | SVGSVGElement | null
  >(null);

  const openPopover = (
    event: MouseEvent<HTMLButtonElement | SVGSVGElement>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return {
    anchorEl,
    openPopover,
    closePopover,
    popoverOpen,
  };
};
