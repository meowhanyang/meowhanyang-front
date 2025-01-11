'use client';

import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFeedsOnServer } from '@/services/community';
import { FeedType } from '@/types/communityType';
import { useRouter } from 'next/navigation';
import useFeedMutations from '@/hooks/community/useFeedMutations';
import CommunitySkeleton from '@/components/community/CommunitySkeleton';
import { useInView } from 'react-intersection-observer';

const CommunityContents = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { ref, inView } = useInView();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [feed, setFeed] = useState<FeedType>();

  const {
    data: feedList,
    isLoading,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam = 1 }) =>
      getFeedsOnServer({
        page: pageParam,
        size: 10
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const {
    deleteFeed,
    blockFeed,
    reportFeed,
    toggleLikeFeed,
    bookmarkFeed,
    cancelBookmarkFeed
  } = useFeedMutations(['feeds']);

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['feeds'] });
  }, [showWriteModal]);

  return (
    <div className="mx-auto max-w-[640px] bg-gr-white pb-24">
      {isLoading ? (
        <CommunitySkeleton />
      ) : (
        feedList?.pages.map(page =>
          page?.items?.map((feed: FeedType) => (
            <FeedCard
              key={feed.id}
              content={feed}
              goToDetail={() => router.push(`/community/${feed.id}`)}
              openBottomSheet={() => {
                setFeed(feed);
                setEditBottomSheet(true);
              }}
              toggleLikeFeed={() => toggleLikeFeed(feed)}
              bookmarkFeed={() => bookmarkFeed(feed)}
              cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
              hasUserArea
            />
          ))
        )
      )}
      {/* 무한 스크롤 감지 영역 */}
      <div ref={ref} className="h-20 bg-transparent" />
      <FloatingActionButton onClick={() => setShowWriteModal(true)} />
      {showWriteModal && (
        <FeedWriteModal
          onClose={() => setShowWriteModal(false)}
          feedDetail={feed}
        />
      )}
      <MoreBtnBottomSheet
        type="feed"
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={feed?.writerNickname}
        memberId={feed?.writerId}
        onDelete={() => feed && deleteFeed(feed)}
        onEdit={() => setShowWriteModal(true)}
        onBlock={() => feed && blockFeed(feed)}
        onReport={() => feed && reportFeed(feed)}
        showWriteModal={setShowWriteModal}
      />
    </div>
  );
};

export default CommunityContents;
