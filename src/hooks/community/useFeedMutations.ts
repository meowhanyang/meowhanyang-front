import {
  blockWriterOnServer,
  bookmarkFeedOnServer,
  cancelBookmarkFeedOnServer,
  deleteFeedOnServer,
  reportFeedOnServer,
  toggleLikeFeedOnServer
} from '@/services/community';
import { FeedType } from '@/types/communityType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useFeedMutations = (queryKeyList: string[]) => {
  const queryClient = useQueryClient();

  const invalidateQueryFucn = (queryKeyList: string[]) => {
    queryKeyList.forEach((key: string) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  };

  const deleteFeed = (feed: FeedType) => {
    if (!feed) return;
    deleteFeedMutation.mutate(feed?.id);
  };

  const deleteFeedMutation = useMutation({
    mutationFn: (id: number) => deleteFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 삭제 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 삭제 중 오류:', error);
    }
  });

  const blockFeed = (feed: FeedType) => {
    if (!feed) return;
    blockFeedMutation.mutate(feed?.id);
  };

  const blockFeedMutation = useMutation({
    mutationFn: (id: number) => blockWriterOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 차단 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 차단 중 오류:', error);
    }
  });

  const reportFeed = (feed: FeedType) => {
    if (!feed) return;
    reportFeedMutation.mutate(feed?.id);
  };

  const reportFeedMutation = useMutation({
    mutationFn: (id: number) => reportFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 신고 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 신고 중 오류:', error);
    }
  });

  const toggleLikeFeed = (feed: FeedType) => {
    if (!feed) return;
    toggleLikeFeedMutation.mutate(feed?.id);
  };

  const toggleLikeFeedMutation = useMutation({
    mutationFn: (id: number) => toggleLikeFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 좋아요 토글 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 좋아요 토글 중 오류:', error);
    }
  });

  const bookmarkFeed = (feed: FeedType) => {
    if (!feed) return;
    bookmarkFeedMutation.mutate(feed?.id);
  };

  const bookmarkFeedMutation = useMutation({
    mutationFn: (id: number) => bookmarkFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 좋아요 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 좋아요 중 오류:', error);
    }
  });

  const cancelBookmarkFeed = (feed: FeedType) => {
    if (!feed) return;
    cancelBookmarkFeedMutation.mutate(feed?.id);
  };

  const cancelBookmarkFeedMutation = useMutation({
    mutationFn: (id: number) => cancelBookmarkFeedOnServer(id),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        invalidateQueryFucn(queryKeyList);
      } else {
        console.error('게시물 좋아요 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시물 좋아요 중 오류:', error);
    }
  });

  return {
    deleteFeed,
    blockFeed,
    reportFeed,
    toggleLikeFeed,
    bookmarkFeed,
    cancelBookmarkFeed
  };
};

export default useFeedMutations;
