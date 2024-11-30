import AlarmMessage from '@/components/profile/AlarmMessage';
import CoParentButton from '@/components/profile/CoParentButton';
import { useToast } from '@/components/ui/hooks/useToast';
import { Toaster } from '@/components/ui/Toaster';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { readNotificationOnServer } from '@/services/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AlarmListProps {
  alarmList: {
    id: number;
    title: string;
    link: string;
    senderNickname: string;
    createdAt: string;
    isRead: boolean;
    type: 'COMMENT' | 'LIKE' | 'DIARY' | 'COPARENT_REQUEST' | 'COPARENT';
    isExpired?: boolean;
    isResponded?: boolean;
  }[];
}

const AlarmList = ({ alarmList }: AlarmListProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [showMessage, setShowMessage] = useState(false);

  const onClickCoParentBtn = (
    isExpired: boolean,
    isResponded: boolean,
    link: string
  ) => {
    if (isExpired) {
      return toast({ description: '요청 수락 기간이 지난 메시지입니다.' });
    }
    if (isResponded) {
      return toast({ description: '이미 응답한 메시지입니다.' });
    }
    setShowMessage(true);
    router.push(link);
  };

  const readAlarm = (link: string, id: number, type = 'UNDEFINED') => {
    if (type === 'REQUEST') return;
    router.push(link);
    readNotification.mutate({ id, type });
  };

  const readNotification = useMutation({
    mutationFn: ({ id }: { id: number; type: string }) =>
      readNotificationOnServer(id),
    onSuccess: (data: any, variables: { id: number; type: string }) => {
      if (data.status !== 'OK') {
        console.log('error');
      } else {
        const { type } = variables;
        if (type === 'UNDEFINED') {
          queryClient.invalidateQueries({ queryKey: ['getNotifications'] });
        } else {
          queryClient.invalidateQueries({
            queryKey: ['getCoparentsNotifications']
          });
        }
      }
    }
  });

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);
  return (
    <>
      {alarmList.map(alarm => (
        <div
          key={alarm.id}
          className={`border-gr-200 p-4 ${alarm.isRead ? 'bg-gr-white' : 'bg-pr-50'}`}
          onClick={() => readAlarm(alarm.link, alarm.id, alarm.type)}
        >
          <div className="flex items-center justify-start">
            <Image
              src={`https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/alarm_type/${alarm.type}.svg`}
              alt="alarm type"
              width={36}
              height={36}
            />
            <div className="px-3">
              <p className="text-body-3 text-gr-900">
                <span className="font-bold">{alarm.senderNickname}</span>
                {alarm.title}
              </p>
              <p className="text-body-4 text-gr-400">{alarm.createdAt}</p>
            </div>
          </div>
          {alarm.type === 'COPARENT_REQUEST' && (
            <div className="pt-2">
              <CoParentButton
                onClick={() => {
                  readNotification.mutate({ id: alarm.id, type: 'REQUEST' });
                  onClickCoParentBtn(
                    !!alarm.isExpired,
                    !!alarm.isResponded,
                    alarm.link
                  );
                }}
                isRead={alarm.isRead}
              />
            </div>
          )}
        </div>
      ))}
      <Toaster />
      {showMessage && <AlarmMessage />}
    </>
  );
};

export default AlarmList;
