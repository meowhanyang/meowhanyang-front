import Bookmark from '@/components/community/feed/Bookmark';
import Image from 'next/image';
import React from 'react';

interface ButtonAreaProps {
  like: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comment: number;
  toggleLike: () => void;
  toggleBookmark: () => void;
  clickComment: () => void;
}

const ButtonArea = ({
  like,
  comment,
  isLiked,
  isBookmarked,
  toggleLike,
  toggleBookmark,
  clickComment
}: ButtonAreaProps) => {
  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[10px]">
        <div
          className="flex items-center gap-[2px]"
          onClick={e => {
            e.stopPropagation(), toggleLike();
          }}
        >
          <Image
            src="/images/icons/heart.svg"
            alt="heart"
            width={24}
            height={24}
          />
          <h6 className="text-body-3 text-gr-400">{like}</h6>
        </div>
        <div className="flex items-center gap-[2px]" onClick={clickComment}>
          <Image
            src="/images/icons/comment.svg"
            alt="comment"
            width={24}
            height={24}
          />
          <h6 className="text-body-3 text-gr-400">{comment}</h6>
        </div>
      </div>
      {/* <Image
        src="/images/icons/bookmark.svg"
        alt="bookmark"
        width={24}
        // onClick={toggleBookmark}
        onClick={e => {
          e.stopPropagation(), toggleBookmark();
        }}
        height={24}
      /> */}
      <Bookmark />
    </div>
  );
};

export default ButtonArea;
