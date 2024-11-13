import Image from 'next/image';
import React from 'react';

interface AlarmMessageProps {
  onClick: () => void;
}

const AlarmMessage = ({ onClick }: AlarmMessageProps) => {
  return (
    <div
      className="absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-70"
      onClick={onClick}
    >
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
        <div className="relative">
          <div className="absolute -bottom-[7px] left-1/2 z-20 h-[14px] w-[14px] -translate-x-1/2 rotate-45 bg-gr-white" />
          <p className="flex items-center rounded-lg bg-gr-white px-5 py-3">
            딩동! 메시지가 왔다냥
          </p>
        </div>
        <Image
          src="/images/icons/can.svg"
          width={120}
          height={120}
          alt="message"
        />
      </div>
    </div>
  );
};

export default AlarmMessage;
