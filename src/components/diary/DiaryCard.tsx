'use client';

import { useEffect, useRef, useState } from 'react';
import Carousel from '../ui/Carousel';
import Label from '../ui/Label';
import Profile from '../ui/Profile';
import { DiaryObj } from '@/app/diary/diaryType';

interface DiaryCardProps extends DiaryObj {
  onClick: () => void;
}

const DiaryCard = ({
  isFeed,
  isGivenWater,
  content,
  images,
  taggedCats,
  memberNickname,
  onClick
}: DiaryCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content]);

  const toggleContent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMore(!showMore);
  };

  const formatTime = (date: Date): string => {
    let hours: number = date.getHours();
    let hoursIn12HourFormat: string = (hours % 12 || 12).toString();
    hoursIn12HourFormat = ('0' + hoursIn12HourFormat).slice(-2);

    let minutes: string = date.getMinutes().toString();
    minutes = ('0' + minutes).slice(-2);

    let ampm: string = hours >= 12 ? '오후' : '오전';

    let formattedTime: string = `${ampm} ${hoursIn12HourFormat}:${minutes}`;
    return formattedTime;
  };

  const taggedCatWithStyle = taggedCats?.map((cat, idx) => ({
    ...cat,
    style: `w-6 h-6 border-gr-white border-[1.2px] absolute left-[${idx * 20}px] shadow-profile`
  }));

  return (
    <div className="mb-4 rounded-16 bg-gr-white" onClick={onClick}>
      {images && images?.length > 0 && (
        <section className="flex h-[300px] gap-2">
          <Carousel images={images} style="rounded-t-2xl" />
        </section>
      )}
      <section className="p-4">
        <article className="mb-2 flex items-center justify-start gap-1">
          {isFeed && (
            <Label.Text
              content="🐟 사료"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
          {isGivenWater && (
            <Label.Text
              content="💧 물"
              className="rounded-md bg-gr-50 px-[6px] pb-1 pt-[5px]"
            />
          )}
        </article>
        <article className="mb-2">
          <div
            className={`mb-1 text-body-3 text-gr-black ${
              showMore ? 'line-clamp-0' : 'line-clamp-3'
            }`}
            ref={contentRef}
          >
            {content}
          </div>
          {isClamped && (
            <button
              className="text-body-3 text-gr-300"
              onClick={e => toggleContent(e)}
            >
              {showMore ? '간략히' : '더보기'}
            </button>
          )}
        </article>
        <article className="flex h-6 items-center justify-between">
          <div className="relative">
            <Profile
              items={taggedCatWithStyle}
              lastLeft="left-[100px]"
              width="w-6"
              height="h-6"
            />
          </div>
          <h5 className="text-body-4 text-gr-500">
            {memberNickname} • {formatTime(new Date())}
          </h5>
        </article>
      </section>
    </div>
  );
};

export default DiaryCard;
