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
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  setIsVisible,
  topBar,
  children,
  heightPercent,
  overflow,
  ...props
}) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [initialHeight, setInitialHeight] = useState<number>(0); // 접힌 상태의 높이를 나타내는 값

  const y = useMotionValue(initialHeight); // 드래그 y값의 변화를 감지
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const height = window.innerHeight * 0.2; // 사용자가 BottomSheet를 절반으로 열었을 때의 높이 설정
    setInitialHeight(height);
    y.set(height);
  }, [y]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { y: number } }
  ) => {
    const threshold = window.innerHeight * 0.25; // 열림 임계값을 조정했습니다.
    const closeThreshold = window.innerHeight * 0.7; // 닫힘 임계값을 설정합니다.
    const endY = y.get();

    if (endY < threshold) {
      // 드래그가 열림 임계값보다 적을 때 전체 높이로 설정합니다.
      y.set(0);
    } else if (endY > closeThreshold) {
      // 드래그가 닫힘 임계값보다 많을 때 BottomSheet를 닫습니다.
      setIsVisible(false);
    } else {
      // 드래그가 닫힘 임계값과 열림 임계값 사이일 때는 초기 높이로 설정합니다.
      y.set(initialHeight);
    }
  };

  // y값에 따른 BottomSheet의 높이 변화를 추적
  const bottomSheetHeight = useTransform(y, [0, windowHeight], heightPercent);

  const bottomSheetVariants = {
    hidden: {
      y: '100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3 // 닫힘 속도가 빠르도록 duration을 조정합니다.
      }
    }
  };

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
          exit="hidden"
        />
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={bottomSheetRef}
            // initial={{ y: initialHeight }} // 여기에서 초기 y값을 접힌 상태 높이로 설정
            animate={{
              y: initialHeight,
              transition: {
                type: 'tween', // Changed to tween for smoother animation
                ease: 'easeInOut', // You can experiment with different easing functions
                duration: 0.3 // Duration of the animation
              }
            }}
            // exit="hidden"
            exit={{
              y: '100%',
              transition: {
                type: 'tween'
              }
            }}
            variants={bottomSheetVariants}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={handleDragEnd}
            style={{ y, height: bottomSheetHeight }}
            // className="fixed inset-x-0 bottom-0 z-50 overflow-hidden bg-white shadow-lg rounded-tl-3xl rounded-tr-3xl"
            className={`fixed inset-x-0 bottom-0 z-50 rounded-tl-3xl rounded-tr-3xl bg-white shadow-lg ${overflow ? overflow : 'overflow-hidden'}`}
            {...props}
          >
            {topBar && (
              <div className="topBar relative text-center">
                <div className="drag-bar mx-auto my-2 h-1 w-10 rounded-full bg-gray-300"></div>
                {topBar}
              </div>
            )}
            {/* <div className="p-8 overflow-auto overflow-x-hidden content ">
              {children}
            </div> */}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomSheet;
