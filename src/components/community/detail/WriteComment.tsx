import useCommentMutation from '@/hooks/community/useCommentMutation';
import { Input } from '../../ui/Input';
import Profile from '../../ui/Profile';
import { useState } from 'react';
import useMyProfileQuery from '@/hooks/common/useMyProfileQuery';

export default function WriteComment({
  feedId,
  parentCommentId,
  onCancel
}: {
  feedId: number;
  parentCommentId?: number;
  onCancel?: () => void;
}) {
  const [comment, setComment] = useState('');
  const { registerComment } = useCommentMutation();
  const { data: myProfile } = useMyProfileQuery();

  const handleSubmit = () => {
    registerComment({ feedId, comment, parentCommentId: parentCommentId ?? 0 });
    setComment('');
    if (onCancel) onCancel();
  };

  return (
    <div className="fixed bottom-0 z-[100] flex w-full items-center gap-2 border-t-[1px] border-gray-300 bg-white px-4 py-2">
      <Profile
        items={[
          {
            id: 1,
            imageUrl: myProfile?.profileImageUrl,
            style: 'w-10 h-10'
          }
        ]}
        lastLeft="left-[100px]"
      />
      <Input
        variant="comment"
        suffix="등록"
        value={comment}
        placeholder="댓글을 남겨주세요."
        onChange={e => setComment(e.target.value)}
        suffixClickHandler={handleSubmit}
      />
    </div>
  );
}
