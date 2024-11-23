'use client';

import React, { useEffect, useRef, useState } from 'react';
import UserArea from './feed/UserArea';
import Carousel from '@/components/ui/Carousel';
import ButtonArea from '@/components/community/feed/ButtonArea';
import { useRouter } from 'next/navigation';
import { FeedType } from '@/types/communityType';

interface FeedCardProps {
  variant?: 'detail';
  content: FeedType;
  goToDetail?: () => void;
  openBottomSheet?: () => void;
  likeFeed: () => void;
  unLikeFeed: () => void;
  bookmarkFeed: () => void;
  cancelBookmarkFeed: () => void;
  hasUserArea?: boolean;
}

const FeedCard = ({
  variant,
  content,
  goToDetail,
  openBottomSheet,
  likeFeed,
  unLikeFeed,
  bookmarkFeed,
  cancelBookmarkFeed,
  hasUserArea
}: FeedCardProps) => {
  const router = useRouter();

  const [showMore, setShowMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content?.content]);

  const toggleContent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowMore(!showMore);
  };

  const toggleLike = () => {
    content?.isLiked ? unLikeFeed() : likeFeed();
  };

  const toggleBookmark = () => {
    content?.isBookmarked ? cancelBookmarkFeed() : bookmarkFeed();
  };

  const clickComment = () => {
    if (variant === 'detail') return;
    router.push(`/community/${content.id}`);
  };

  return (
    <div className="border-b border-gr-100 bg-gr-white px-4 pt-4">
      {hasUserArea && (
        <UserArea
          writerId={content?.writerId}
          nickname={content?.writerNickname}
          profile={
            content?.writerProfileImage ||
            'https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/can.svg'
          }
          createdAt={content?.createdAt}
          onClick={() => {
            openBottomSheet && openBottomSheet();
          }}
        />
      )}
      <section className="flex flex-col items-start gap-1" onClick={goToDetail}>
        <p
          ref={contentRef}
          className={`pt-4 text-body-3 text-gr-black ${
            showMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
          onClick={clickComment}
        >
          {content?.content}
        </p>
        {isClamped && (
          <button
            className="text-body-3 text-gr-300"
            onClick={e => toggleContent(e)}
          >
            {showMore ? '간략히' : '더보기'}
          </button>
        )}
      </section>
      {content?.images && content?.images?.length > 0 && (
        <section className="flex h-[300px] gap-2 pt-4" onClick={clickComment}>
          <Carousel images={content.images} style="rounded-b-lg" />
        </section>
      )}
      <ButtonArea
        like={content?.likeCount}
        isLiked={content?.isLiked}
        isBookmarked={content?.isBookmarked}
        comment={content?.commentCount}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
        clickComment={clickComment}
      />
    </div>
  );
};

export default FeedCard;
