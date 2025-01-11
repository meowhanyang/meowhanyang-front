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
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import ProfileFeedSkeleton from '@/components/profile/ProfileFeedSkeleton';
import RightIcon from '../../../../public/images/icons/right.svg';
import { DEFAULT_PROFILE_IMAGE_SRC } from '@/constants/general';

const ProfileIdPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [showZipModal, setShowZipModal] = useState(false);

  const feedReqObj = {
    page: 0,
    size: 9,
    memberId: id
  };

  const { data: othersProfile, isLoading: otherProfileIsLoading } = useQuery({
    queryKey: ['othersProfile', id],
    queryFn: () => getClickedUserProfile(id)
  });

  const { data: otherUserFeedList, isLoading: otherFeedIsLoading } = useQuery({
    queryKey: ['otherUserFeeds', id],
    queryFn: () => getOtherUserFeeds(feedReqObj)
  });

  const { toggleLikeFeed, bookmarkFeed, cancelBookmarkFeed } = useFeedMutations(
    ['otherUserFeeds']
  );

  return (
    <>
      <section className="h-12">
        <Topbar type="three">
          <Topbar.Back onClick={() => router.back()} />
          <Topbar.Title title={othersProfile?.nickname} />
          <Topbar.Empty />
        </Topbar>
      </section>
      <section className="border-b border-gr-100 bg-gr-white py-4">
        {otherProfileIsLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="flex justify-center pb-4">
              <Profile
                items={[
                  {
                    id: id,
                    imageUrl:
                      othersProfile?.profileImageUrl ||
                      DEFAULT_PROFILE_IMAGE_SRC,
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
          </>
        )}
      </section>
      <div className="w-full border-gr-100" />
      <section className="mx-auto mt-0 max-w-[640px] bg-gr-white">
        <article className="flex items-center justify-between px-4 py-3">
          <div className="text-heading-4 text-gr-900">피드</div>
          <Button
            onClick={() => setShowZipModal(true)}
            className="h-[28px] rounded-16 bg-gr-50 py-2 pl-3 pr-[6px]"
          >
            <Button.Text
              text="모음집 구경하기"
              className="text-btn-3 text-gr-500"
            />
            <Button.Icon alt="right">
              <RightIcon width={16} height={16} stroke="var(--gr-500)" />
            </Button.Icon>
          </Button>
        </article>
        <article>
          {otherFeedIsLoading ? (
            <ProfileFeedSkeleton />
          ) : (
            otherUserFeedList?.map((feed: FeedType) => (
              <FeedCard
                key={feed.id}
                content={feed}
                goToDetail={() => router.push(`/community/${feed.id}`)}
                toggleLikeFeed={() => toggleLikeFeed(feed)}
                bookmarkFeed={() => bookmarkFeed(feed)}
                cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
              />
            ))
          )}
        </article>
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
