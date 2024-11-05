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
import { getNotifications } from '@/services/profile';

const Alarm = () => {
  const router = useRouter();
  const [alarmList] = useState([
    {
      id: 1,
      profiles: [
        {
          id: 1,
          imageUrl: 'https://via.placeholder.com/150',
          style: 'w-10 h-10'
        }
      ],
      user: 'USER1004',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      read: false
    },
    {
      id: 2,
      profiles: [
        {
          id: 2,
          imageUrl: 'https://via.placeholder.com/150',
          style: 'w-10 h-10'
        }
      ],
      user: 'USER1004',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      read: true
    },
    {
      id: 3,
      profiles: [
        {
          id: 3,
          imageUrl: 'https://via.placeholder.com/150',
          style: 'w-10 h-10'
        }
      ],
      user: 'USER1004',
      content: '님이 댓글을 남겼어요.',
      createdAt: '방금',
      read: false
    }
  ]);

  const { data: notifications } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: () => getNotifications(),
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
        <TabsContent value="savedContents">
          <AlarmList alarmList={alarmList} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alarm;
