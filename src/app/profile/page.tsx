'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import ProfileDetail from '@/components/profile/ProfileDetail';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsWithLine';
import FeedCard from '@/components/community/FeedCard';
import { FeedType } from '@/types/communityType';
import { getMyBookmarks, getMyFeeds, getMyProfile } from '@/services/profile';
import { useState } from 'react';
import OnboardProfileModal from '@/components/onboard/OnboardProfileModal';
import PencilIcon from '../../../public/images/icons/pencil.svg';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import ProfileFeedSkeleton from '@/components/profile/ProfileFeedSkeleton';
import ProfileSkeleton from '@/components/profile/ProfileSkeleton';
import ProfileEmptyState from '@/components/profile/ProfileEmptyState';

export default function ProfilePage() {
  const router = useRouter();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const feedReqObj = {
    page: 0,
    size: 9
    // offset: 0
  };

  const { data: myFeedList, isLoading: isFeedLoading } = useQuery({
    queryKey: ['myFeeds'],
    queryFn: () => getMyFeeds(feedReqObj)
  });

  const { data: myBookmarksList, isLoading: isBookmarksLoading } = useQuery({
    queryKey: ['myBookmarks'],
    queryFn: () => getMyBookmarks(feedReqObj)
  });

  const { data: myProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile()
  });

  const { likeFeed, unLikeFeed, bookmarkFeed, cancelBookmarkFeed } =
    useFeedMutations(['myFeeds', 'myBookmarks']);

  return (
    <div>
      <div className="flex h-12 w-full items-center justify-between bg-gr-white px-4 align-middle text-heading-3 text-gr-900">
        <h1>프로필</h1>
        <div className="flex gap-3">
          <button onClick={() => router.push('/profile/alarm')}>
            <Image
              src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/alert.svg"
              alt="alert"
              width={24}
              height={24}
            />
            {myProfile?.existsNewNotification && (
              <div className="absolute right-[3.2rem] top-1 h-2 w-2 rounded-full bg-blue-400"></div>
            )}
          </button>
          <button onClick={() => router.push('/profile/setting')}>
            <Image
              src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
              alt="setting"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="mx-auto flex justify-center gap-2">
        <Tabs defaultValue="myContents">
          {isProfileLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="flex w-screen flex-col items-center justify-center bg-gr-white">
              <div className="relative mx-auto my-4 flex h-[72px] w-[72px] flex-col items-center justify-center gap-1">
                <Image
                  src={
                    myProfile?.profileImageUrl ||
                    'https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/can.svg'
                  }
                  alt="profile icon"
                  width={72}
                  height={72}
                  className="w-full rounded-[48px]"
                />
                <div className="absolute bottom-0 right-0 rounded-16">
                  <div className="h-full w-full rounded-full border-[1.5px] border-gr-white bg-gr-700 p-[6px]">
                    <PencilIcon
                      width={12}
                      height={12}
                      stroke="var(--gr-white)"
                      onClick={() => setShowProfileModal(true)}
                    />
                  </div>
                </div>
              </div>
              <p>{myProfile?.nickname}</p>
              <ProfileDetail
                catCount={myProfile?.catCount}
                postCount={myProfile?.postCount}
                bookmarkCount={myProfile?.bookmarkCount}
              />
            </div>
          )}
          <TabsList className="bg-gr-white">
            <TabsTrigger value="myContents">작성한 글</TabsTrigger>
            <TabsTrigger value="savedContents">저장한 글</TabsTrigger>
          </TabsList>
          <TabsContent
            value="myContents"
            className="mx-auto mt-0 max-w-[640px] pb-24"
          >
            {isFeedLoading ? (
              <ProfileFeedSkeleton />
            ) : myFeedList?.length === 0 ? (
              <ProfileEmptyState
                title="아직 작성한 글이 없어요"
                body="사람들과 나누고 싶은 일들을 공유해보세요!"
                btnText="글 쓰기"
              />
            ) : (
              myFeedList?.map((feed: FeedType) => (
                <FeedCard
                  key={feed.id}
                  content={feed}
                  goToDetail={() => router.push(`/community/${feed.id}`)}
                  likeFeed={() => likeFeed(feed)}
                  unLikeFeed={() => unLikeFeed(feed)}
                  bookmarkFeed={() => bookmarkFeed(feed)}
                  cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
                />
              ))
            )}
          </TabsContent>
          <TabsContent
            value="savedContents"
            className="mx-auto mt-0 max-w-[640px] pb-24"
          >
            {myBookmarksList?.length === 0 ? (
              <ProfileEmptyState
                title="아직 저장한 글이 없어요"
                body="간직하고 싶은 글을 저장해보세요!"
                btnText="저장하러 가기"
              />
            ) : (
              myBookmarksList?.map((feed: FeedType) => (
                <FeedCard
                  key={feed.id}
                  content={feed}
                  goToDetail={() => router.push(`/community/${feed.id}`)}
                  likeFeed={() => likeFeed(feed)}
                  unLikeFeed={() => unLikeFeed(feed)}
                  bookmarkFeed={() => bookmarkFeed(feed)}
                  cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      {showProfileModal && (
        <OnboardProfileModal
          onClose={() => setShowProfileModal(false)}
          myProfile={myProfile}
        />
      )}
    </div>
  );
}
