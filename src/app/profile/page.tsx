'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Detail from '@/components/profile/ProfileDetail';
import { Skeleton } from '@/components/ui/skeleton';
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
import EmptyState from '@/components/profile/EmptyState';

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

  return (
    <>
      <div className="flex h-12 w-full items-center justify-between bg-gr-white px-4 align-middle text-heading-3 text-gr-900">
        <h1>프로필</h1>
        <div className="flex gap-3">
          <button onClick={() => router.push('/profile/alarm')}>
            <Image
              src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/alert.svg"
              alt="edit"
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
              alt="edit"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <Tabs defaultValue="myContents" className="w-full sm:max-w-[600px]">
          {isProfileLoading ? (
            <>
              <div className="relative mx-auto my-4 flex flex-col items-center justify-center gap-2">
                <Skeleton className="h-[72px] w-[72px] rounded-full" />
                <Skeleton className="h-[16px] w-[50px]" />
              </div>
              <div className="flex justify-around border-gr-200 px-4 py-3">
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-[16px] w-[25px]" />
                  <Skeleton className="h-[16px] w-[40px]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-[16px] w-[25px]" />
                  <Skeleton className="h-[16px] w-[40px]" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Skeleton className="h-[16px] w-[25px]" />
                  <Skeleton className="h-[16px] w-[40px]" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative mx-auto my-4 flex h-[72px] w-[72px] flex-col items-center justify-center gap-1">
                <Image
                  src={myProfile?.profileImageUrl || '/images/icons/can.svg'}
                  alt="icon"
                  width={72}
                  height={72}
                  className="w-full rounded-[48px]"
                />
                <p>{myProfile?.nickname}</p>
                <div className="absolute bottom-0 right-0 rounded-16">
                  <div className="h-full w-full rounded-full border-[1.5px] border-gr-white bg-gr-700 p-2">
                    <PencilIcon
                      width={16}
                      height={16}
                      stroke="var(--gr-white)"
                      onClick={() => setShowProfileModal(true)}
                    />
                  </div>
                </div>
              </div>
              <Detail
                catCount={myProfile?.catCount}
                postCount={myProfile?.postCount}
                bookmarkCount={myProfile?.bookmarkCount}
              />
            </>
          )}
          <TabsList>
            <TabsTrigger value="myContents">작성한 글</TabsTrigger>
            <TabsTrigger value="savedContents">저장한 글</TabsTrigger>
          </TabsList>
          <TabsContent value="myContents">
            {isFeedLoading ? (
              <div className="flex flex-col gap-4 p-4">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex flex-col gap-3">
                    {/* 프로필 영역 */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-[40px] w-[40px] rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-[16px] w-[80px]" />
                        <Skeleton className="h-[14px] w-[60px]" />
                      </div>
                    </div>

                    {/* 본문 텍스트 영역 */}
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-[16px] w-full" />
                      <Skeleton className="h-[16px] w-[90%]" />
                      <Skeleton className="h-[16px] w-[50%]" />
                    </div>

                    {/* 이미지 영역 */}
                    <Skeleton className="h-[240px] w-full rounded-lg" />

                    {/* 하단 액션 버튼 영역 */}
                    <div className="flex gap-4">
                      <Skeleton className="h-[24px] w-[60px]" />
                      <Skeleton className="h-[24px] w-[60px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : myFeedList?.length === 0 ? (
              <EmptyState />
            ) : (
              myFeedList?.map((feed: FeedType) => (
                <FeedCard
                  likeFeed={() => {}}
                  unLikeFeed={() => {}}
                  bookmarkFeed={() => {}}
                  cancelBookmarkFeed={() => {}}
                  key={feed.id}
                  content={feed}
                  goToDetail={() => router.push(`/community/${feed.id}`)}
                />
              ))
            )}
          </TabsContent>
          <TabsContent value="savedContents">
            {myBookmarksList?.map((feed: FeedType) => (
              <FeedCard
                likeFeed={() => {}}
                unLikeFeed={() => {}}
                bookmarkFeed={() => {}}
                cancelBookmarkFeed={() => {}}
                key={feed.id}
                content={feed}
                goToDetail={() => router.push(`/community/${feed.id}`)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      {showProfileModal && (
        <OnboardProfileModal
          onClose={() => setShowProfileModal(false)}
          myProfile={myProfile}
        />
      )}
    </>
  );
}
