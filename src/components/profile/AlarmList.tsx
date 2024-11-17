import AlarmMessage from '@/components/profile/AlarmMessage';
import CoParentButton from '@/components/profile/CoParentButton';
import { useToast } from '@/components/ui/hooks/useToast';
import { Toaster } from '@/components/ui/Toaster';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

interface AlarmListProps {
  alarmList: {
    id: number;
    title: string;
    link: string;
    senderNickname: string;
    createdAt: string;
    isRead: boolean;
    type?: 'REQUEST' | 'DIARY';
    isExpired?: boolean;
    isResponded?: boolean;
  }[];
}

const AlarmList = ({ alarmList }: AlarmListProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [showMessage, setShowMessage] = useState(false);

  const onClickCoParentBtn = (isExpired: boolean, isResponded: boolean) => {
    if (isExpired) {
      return toast({ description: '요청 수락 기간이 지난 메시지입니다.' });
    }
    if (isResponded) {
      return toast({ description: '이미 응답한 메시지입니다.' });
    }
    router.push('/profile/alarm/co-parent');
  };

  return (
    <>
      {alarmList.map(alarm => (
        <div
          key={alarm.id}
          className={`border-gr-200 p-4 ${alarm.isRead ? 'bg-gr-white' : 'bg-pr-50'}`}
        >
          <div className="flex items-center justify-start">
            <Image
              src="/images/icons/heart.svg"
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
          {alarm.type && alarm.type === 'REQUEST' && (
            <div className="pt-2">
              <CoParentButton
                onClick={() =>
                  onClickCoParentBtn(!!alarm.isExpired, !!alarm.isResponded)
                }
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
