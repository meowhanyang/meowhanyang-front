import AlarmMessage from '@/components/profile/AlarmMessage';
import CoParentAcceptBottomSheet from '@/components/profile/CoParentAcceptBottomSheet';
import CoParentAlarmModal from '@/components/profile/CoParentAlarmModal';
import CoParentButton from '@/components/profile/CoParentButton';
import { useToast } from '@/components/ui/hooks/useToast';
import { Toaster } from '@/components/ui/Toaster';
import { useState } from 'react';

interface AlarmListProps {
  alarmList: {
    id: number;
    title: string;
    link: string;
    user: string;
    content: string;
    createdAt: string;
    isRead: boolean;
  }[];
}

const AlarmList = ({ alarmList }: AlarmListProps) => {
  const { toast } = useToast();

  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const isExpried = false;

  const onClickCoParentBtn = () => {
    setShowMessage(true);
    toast({
      description: isExpried
        ? '요청 수락 기간이 지난 메시지입니다.'
        : '이미 응답한 메시지입니다.'
    });
  };

  return (
    <>
      {alarmList.map(alarm => (
        <div
          key={alarm.id}
          className={`border-gr-200 p-4 ${alarm.isRead ? 'bg-pr-50' : ''}`}
        >
          <p className="text-body-3 text-gr-900">
            <span className="text-heading-4 text-gr-900">{alarm.user}</span>
            {alarm.content}
          </p>
          <p className="text-body-4 text-gr-400">{alarm.createdAt}</p>
          <div className="pt-2">
            <CoParentButton onClick={onClickCoParentBtn} />
          </div>
        </div>
      ))}
      <Toaster />
      <CoParentAcceptBottomSheet
        isVisible={openBottomSheet}
        setIsVisible={() => {
          setOpenBottomSheet(!openBottomSheet);
        }}
      />
      {showMessage && (
        <AlarmMessage
          onClick={() => {
            setShowModal(true), setShowMessage(false);
          }}
        />
      )}
      {showModal && (
        <CoParentAlarmModal
          onClick={() => setShowModal(false)}
          openBottomSheet={() => setOpenBottomSheet(true)}
        />
      )}
    </>
  );
};

export default AlarmList;
