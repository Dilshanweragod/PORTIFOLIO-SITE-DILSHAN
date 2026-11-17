import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if device supports coarse pointer (mobile/touch) or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };
    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, select, textarea, [role="button"]');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Orange Dot */}
      <div
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#FF6A00] transition-transform duration-75 ease-out shadow-[0_0_8px_#FF6A00]"
        style={{
          width: '8px',
          height: '8px',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isHovering ? 1.6 : 1})`,
        }}
      />

      {/* Trailing Soft Ring */}
      <div
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#FF6A00]/50 transition-all duration-300 ease-out"
        style={{
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          backgroundColor: isHovering ? 'rgba(255, 106, 0, 0.08)' : 'transparent',
          transform: `translate3d(${position.x - (isHovering ? 22 : 14)}px, ${
            position.y - (isHovering ? 22 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};
