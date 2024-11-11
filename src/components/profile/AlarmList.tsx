import CoParentButton from '@/components/profile/CoParentButton';

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
            <CoParentButton />
          </div>
        </div>
      ))}
    </>
  );
};

export default AlarmList;
