'use client';
import AlarmList from '@/components/profile/AlarmList';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsWithLine';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCoParentNotifications, getNotifications } from '@/services/profile';
import AlarmEmptyState from '@/components/profile/AlarmEmptyState';
import AlarmListSkeleton from '@/components/profile/AlarmListSkeleton';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export interface AlarmType {
  id: number;
  title: string;
  link: string;
  senderNickname: string;
  createdAt: string;
  isRead: boolean;
  type: 'COMMENT' | 'LIKE' | 'DIARY' | 'COPARENT_REQUEST' | 'COPARENT';
  isExpired?: boolean;
  isResponded?: boolean;
}

const AlarmPage = () => {
  const router = useRouter();
  const { ref: notiRef, inView: notiInView } = useInView();
  const { ref: coParentRef, inView: coParentInView } = useInView();

  const {
    data: notifications,
    isLoading: notiIsLoading,
    fetchNextPage: fetchNextNotifications
  } = useInfiniteQuery({
    queryKey: ['getNotifications'],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({
        page: pageParam,
        size: 20
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (notiInView) {
      fetchNextNotifications();
    }
  }, [notiInView, fetchNextNotifications]);

  const {
    data: coParentsNoti,
    isLoading: coParentIsLoading,
    fetchNextPage: fetchNextCoparentNofi
  } = useInfiniteQuery({
    queryKey: ['getCoparentsNotifications'],
    queryFn: ({ pageParam = 1 }) =>
      getCoParentNotifications({
        page: pageParam,
        size: 20
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });
  useEffect(() => {
    if (coParentInView) {
      fetchNextCoparentNofi();
    }
  }, [coParentInView, fetchNextCoparentNofi]);

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={() => router.push('/profile')} />
        <Topbar.Title title="내 소식" />
        <Topbar.Empty />
      </Topbar>
      <Tabs
        defaultValue="notice"
        className="h-screen items-end bg-gr-white pt-12"
      >
        <TabsList className="h-11 items-end">
          <TabsTrigger value="notice">활동 알림</TabsTrigger>
          <TabsTrigger value="coParentNotice">공동냥육</TabsTrigger>
        </TabsList>
        {notifications?.pages[0]?.items?.length === 0 ? (
          <div className="flex h-[calc(100vh-84px)] items-center justify-center bg-gr-50">
            <AlarmEmptyState />
          </div>
        ) : (
          <TabsContent value="notice" className="mx-auto mt-0 max-w-[640px]">
            {notiIsLoading ? (
              <AlarmListSkeleton />
            ) : (
              <>
                {notifications?.pages?.map(page =>
                  page?.items?.map((noti: AlarmType) => (
                    <div key={noti.id}>
                      <AlarmList {...noti} />
                    </div>
                  ))
                )}
                {/* 무한 스크롤 감지 영역 */}
                <div ref={notiRef} className="h-20 bg-transparent" />
              </>
            )}
          </TabsContent>
        )}
        {coParentsNoti?.pages[0]?.items?.length === 0 ? (
          <div className="flex h-[calc(100vh-84px)] items-center justify-center bg-gr-50">
            <AlarmEmptyState />
          </div>
        ) : (
          <TabsContent
            value="coParentNotice"
            className="mx-auto mt-0 max-w-[640px]"
          >
            {coParentIsLoading ? (
              <AlarmListSkeleton />
            ) : (
              <>
                {coParentsNoti?.pages?.map(page =>
                  page?.items?.map((noti: AlarmType) => (
                    <div key={noti.id}>
                      <AlarmList {...noti} />
                    </div>
                  ))
                )}
                {/* 무한 스크롤 감지 영역 */}
                <div ref={coParentRef} className="h-20 bg-transparent" />
              </>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AlarmPage;
