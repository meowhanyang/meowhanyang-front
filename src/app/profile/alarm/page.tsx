'use client';
import { useState } from 'react';
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

const Alarm = () => {
  const router = useRouter();
  const [alarmList] = useState([
    {
      id: 1,
      title: 'USER1004',
      user: 'USER1004',
      link: '',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      isRead: false
    },
    {
      id: 2,
      title: 'USER1004',
      user: 'USER1004',
      link: '',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      isRead: true
    },
    {
      id: 3,
      title: 'USER1004',
      user: 'USER1004',
      link: '',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      isRead: false
    }
  ]);

  const { data: notifications } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => getNotifications(),
    staleTime: 1000 * 60 * 10
  });

  const { data: coParentsNoti } = useQuery({
    queryKey: ['getCoparentsNotifications'],
    queryFn: () => getCoParentNotifications(),
    staleTime: 1000 * 60 * 10
  });

  return (
    <div>
      <Topbar type="three">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.Title title="내 소식" />
        <Topbar.Empty />
      </Topbar>
      <Tabs defaultValue="notice" className="pt-14">
        <TabsList>
          <TabsTrigger value="notice">활동 알림</TabsTrigger>
          <TabsTrigger value="savedContents">공동냥육</TabsTrigger>
        </TabsList>
        <TabsContent value="notice">
          <AlarmList alarmList={alarmList} />
        </TabsContent>
        <TabsContent value="coParentNotice">
          <AlarmList alarmList={alarmList} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alarm;
