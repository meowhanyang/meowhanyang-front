'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProfileDetail from '@/components/profile/ProfileDetail';
import { getClickedUserProfile, getOtherUserFeeds } from '@/services/profile';
import Profile from '@/components/ui/Profile';
import Topbar from '@/components/ui/Topbar';
import Button from '@/components/ui/Button';
import { FeedType } from '@/types/communityType';
import FeedCard from '@/components/community/FeedCard';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import OtherMemberZipModal from '@/components/zip/OtherMemberZipModal';
import { useState } from 'react';

const ProfileIdPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [showZipModal, setShowZipModal] = useState(false);

  const feedReqObj = {
    page: 0,
    size: 9,
    memberId: id
  };

  const { data: othersProfile } = useQuery({
    queryKey: ['othersProfile', id],
    queryFn: () => getClickedUserProfile(id)
  });

  const { data: otherUserFeedList } = useQuery({
    queryKey: ['otherUserFeeds', id],
    queryFn: () => getOtherUserFeeds(feedReqObj)
  });

  const { likeFeed, unLikeFeed, bookmarkFeed, cancelBookmarkFeed } =
    useFeedMutations(['otherUserFeeds']);

  return (
    <>
      <section className="h-12">
        <Topbar type="three">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title={othersProfile?.nickname} />
          <Topbar.Empty />
        </Topbar>
      </section>
      <section className="border-b border-gr-100 py-4">
        <div className="flex justify-center pb-4">
          <Profile
            items={[
              {
                id: id,
                imageUrl: othersProfile?.profileImageUrl,
                style: 'w-[72px] h-[72px]'
              }
            ]}
            lastLeft="left-[100px]"
          />
        </div>
        <ProfileDetail
          catCount={othersProfile?.catCount}
          postCount={othersProfile?.postCount}
        />
      </section>
      <div className="w-full border-gr-100" />
      <section className="flex items-center justify-between px-4 py-3">
        <div className="text-heading-4 text-gr-900">피드</div>
        <Button
          onClick={() => setShowZipModal(true)}
          className="h-[28px] rounded-16 bg-gr-50 py-2 pl-3 pr-[6px]"
        >
          <Button.Text
            text="모음집 구경하기"
            className="text-btn-3 text-gr-500"
          />
          <Button.Icon
            icon="/images/icons/right.svg"
            height={16}
            width={16}
            alt="right"
          />
        </Button>
      </section>
      <section className="pb-32">
        {otherUserFeedList?.map((feed: FeedType) => (
          <FeedCard
            key={feed.id}
            content={feed}
            goToDetail={() => router.push(`/community/${feed.id}`)}
            likeFeed={() => likeFeed(feed)}
            unLikeFeed={() => unLikeFeed(feed)}
            bookmarkFeed={() => bookmarkFeed(feed)}
            cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
          />
        ))}
      </section>
      {showZipModal && (
        <OtherMemberZipModal
          onClose={() => setShowZipModal(false)}
          memberId={id}
          memberName={othersProfile.nickname}
        />
      )}
    </>
  );
};
export default ProfileIdPage;
