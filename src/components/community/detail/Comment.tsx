import Profile from '@/components/ui/Profile';
import Image from 'next/image';
import { CommentType } from '@/types/communityType';

const formatCreatedAt = (createdAt: string) => {
  return createdAt === '0초 전' ? '방금 전' : createdAt;
};

export default function Comment({
  onReply,
  comment,
  setEditBottomSheet,
  setSelectedComment
}: {
  onReply: (commentId: number) => void;
  comment: CommentType;
  setEditBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedComment: React.Dispatch<
    React.SetStateAction<CommentType | undefined>
  >;
}) {
  return (
    <>
      <div
        className={`${
          comment.parentId ? 'pl-8' : ''
        } flex items-start justify-between px-4`}
      >
        <Profile
          items={[
            {
              id: 1,
              imageUrl: comment.memberNickname,
              style: 'w-10 h-10'
            }
          ]}
          lastLeft="left-[100px]"
        />
        <div className="w-[75%] text-sm">
          <div className="flex">
            <div className="font-bold">{comment.memberNickname}</div>
          </div>
          <div>{comment.content}</div>
          <div className="flex text-gr-500">
            <div>{formatCreatedAt(comment.createdAt)}</div>
            <button className="ml-5" onClick={() => onReply(comment.id)}>
              답글 달기
            </button>
          </div>
        </div>
        <Image
          src="/images/icons/menu.svg"
          alt="calendar"
          width={24}
          height={24}
          className="h-6 w-6"
          onClick={() => {
            setEditBottomSheet(true);
            setSelectedComment(comment);
          }}
        />
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-4">
          {comment.replies.map((reply: CommentType) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              setEditBottomSheet={setEditBottomSheet}
              setSelectedComment={setSelectedComment}
            />
          ))}
        </div>
      )}
    </>
  );
}
