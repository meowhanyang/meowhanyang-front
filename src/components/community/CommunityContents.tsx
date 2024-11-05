'use client';

import React, { useEffect, useState } from 'react';
import FeedCard from '../../components/community/FeedCard';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import FeedWriteModal from '@/components/community/FeedWriteModal';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFeedsOnServer } from '@/services/community';
import { FeedType } from '@/types/communityType';
import { useRouter } from 'next/navigation';
import useFeedMutations from '@/hooks/community/useFeedMutations';

const CommunityContents = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [feed, setFeed] = useState<FeedType>();

  const { data: feedList } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => getFeedsOnServer(),
    staleTime: 1000 * 60 * 10
  });

  const {
    deleteFeed,
    blockFeed,
    reportFeed,
    likeFeed,
    unLikeFeed,
    bookmarkFeed,
    cancelBookmarkFeed
  } = useFeedMutations(['feeds']);

  useEffect(() => {
    if (showWriteModal) return;
    queryClient.invalidateQueries({ queryKey: ['feeds'] });
  }, [showWriteModal]);

  return (
    <>
      <div className="pb-32">
        {feedList?.map((feed: FeedType) => (
          <FeedCard
            key={feed.id}
            content={feed}
            goToDetail={() => router.push(`/community/${feed.id}`)}
            openBottomSheet={() => {
              setFeed(feed);
              setEditBottomSheet(true);
            }}
            likeFeed={() => likeFeed(feed)}
            unLikeFeed={() => unLikeFeed(feed)}
            bookmarkFeed={() => bookmarkFeed(feed)}
            cancelBookmarkFeed={() => cancelBookmarkFeed(feed)}
            hasUserArea
          />
        ))}
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
    </>
  );
};

export default CommunityContents;
