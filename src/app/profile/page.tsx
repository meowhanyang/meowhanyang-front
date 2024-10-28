'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Detail from '@/components/profile/ProfileDetail';
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

export default function ProfilePage() {
  const router = useRouter();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const feedReqObj = {
    page: 0,
    size: 9
    // offset: 0
  };

  const { data: myFeedList } = useQuery({
    queryKey: ['myFeeds'],
    queryFn: () => getMyFeeds(feedReqObj)
  });

  const { data: myBookmarksList } = useQuery({
    queryKey: ['myBookmarks'],
    queryFn: () => getMyBookmarks(feedReqObj)
  });

  const { data: myProfile } = useQuery({
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
        <Tabs
          defaultValue="myContents"
          className="max-w-[390px] sm:max-w-[600px]"
        >
          <div className="relative mx-auto my-4 flex h-[120px] w-[120px] flex-col items-center justify-center gap-1">
            <Image
              src={myProfile?.profileImageUrl || '/images/icons/can.svg'}
              alt="icon"
              width={72}
              height={72}
              className="w-full rounded-[48px]"
            />
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
          <TabsList>
            <TabsTrigger value="myContents">작성한 글</TabsTrigger>
            <TabsTrigger value="savedContents">저장한 글</TabsTrigger>
          </TabsList>
          <TabsContent value="myContents">
            {myFeedList?.map((feed: FeedType) => (
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
