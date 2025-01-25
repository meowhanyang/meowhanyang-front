'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionProps
} from 'framer-motion';

interface BottomSheetProps extends MotionProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  topBar?: React.ReactNode;
  children: React.ReactNode;
  heightPercent: string[];
  overflow?: string;
  disableDrag?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  setIsVisible,
  topBar,
  children,
  heightPercent,
  overflow,
  disableDrag,
  ...props
}) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const initialHeightValue = windowHeight * 0.2;
  const y = useMotionValue(initialHeightValue);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { y: number } }
  ) => {
    const threshold = windowHeight * 0.25;
    const closeThreshold = windowHeight * 0.7;
    const endY = y.get();

    if (endY < threshold) {
      y.set(0);
    } else if (endY > closeThreshold) {
      setIsVisible(false);
    } else {
      y.set(initialHeightValue);
    }
  };

  const bottomSheetHeight = useTransform(y, [0, windowHeight], heightPercent);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={handleClickOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={bottomSheetRef}
            initial={{ y: windowHeight }}
            animate={{
              y: initialHeightValue,
              transition: {
                type: 'tween',
                ease: 'easeOut',
                duration: 0.3
              }
            }}
            exit={{
              y: windowHeight,
              transition: {
                type: 'tween',
                ease: 'easeIn',
                duration: 0.3
              }
            }}
            {...(!disableDrag && {
              drag: 'y',
              dragConstraints: { top: 0 },
              onDragEnd: handleDragEnd
            })}
            style={{ y, height: bottomSheetHeight }}
            className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[640px] rounded-tl-3xl rounded-tr-3xl bg-white shadow-lg ${
              overflow ? overflow : 'overflow-hidden'
            }`}
            {...props}
          >
            {topBar && (
              <div className="topBar relative text-center">
                <div className="drag-bar mx-auto my-2 h-1 w-10 rounded-full bg-gray-300" />
                {topBar}
              </div>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheet;
