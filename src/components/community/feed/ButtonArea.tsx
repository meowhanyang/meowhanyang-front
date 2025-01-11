import Bookmark from '@/components/community/feed/Bookmark';
import Image from 'next/image';
import LikeButton from './LikeButton';

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
          <LikeButton isLiked={isLiked} onClick={toggleLike} />
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
      <Bookmark isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
    </div>
  );
};

export default ButtonArea;
