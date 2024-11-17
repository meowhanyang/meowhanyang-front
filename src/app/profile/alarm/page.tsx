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
import { useQuery } from '@tanstack/react-query';
import { getCoParentNotifications, getNotifications } from '@/services/profile';
import AlarmEmptyState from '@/components/profile/AlarmEmptyState';

const Alarm = () => {
  const router = useRouter();

  const { data: notifications, isLoading: notiIsLoading } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => getNotifications(),
    staleTime: 1000 * 60 * 10
  });

  const { data: coParentsNoti, isLoading: coParentIsLoading } = useQuery({
    queryKey: ['getCoparentsNotifications'],
    queryFn: () => getCoParentNotifications(),
    staleTime: 1000 * 60 * 10
  });

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
        {notifications?.length === 0 ? (
          <div className="flex h-[calc(100vh-84px)] items-center justify-center bg-gr-50">
            <AlarmEmptyState />
          </div>
        ) : (
          <TabsContent value="notice" className="mx-auto mt-0 max-w-[640px]">
            {notiIsLoading ? (
              <p>로딩중...</p>
            ) : (
              <AlarmList alarmList={notifications || []} />
            )}
          </TabsContent>
        )}
        {coParentsNoti?.length === 0 ? (
          <div className="flex h-[calc(100vh-84px)] items-center justify-center bg-gr-50">
            <AlarmEmptyState />
          </div>
        ) : (
          <TabsContent
            value="coParentNotice"
            className="mx-auto mt-0 max-w-[640px]"
          >
            {coParentIsLoading ? (
              <p>로딩중...</p>
            ) : (
              <AlarmList alarmList={coParentsNoti || []} />
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Alarm;
