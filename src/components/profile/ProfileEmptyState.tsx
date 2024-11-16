import { useRouter } from 'next/navigation';
import RightIcon from '../../../public/images/icons/right.svg';
import Image from 'next/image';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/ui/Button';

interface ProfileEmptyStateProps {
  title: string;
  body: string;
  btnText: string;
}

const ProfileEmptyState = ({
  title,
  body,
  btnText
}: ProfileEmptyStateProps) => {
  const router = useRouter();

  return (
    <EmptyState
      title={title}
      body={body}
      imageTag={
        <Image
          src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
          alt="empty state"
          width={120}
          height={120}
          className="pb-6"
        />
      }
      buttonTag={
        <Button
          onClick={() => router.push('/community')}
          className="flex items-center justify-center rounded-full border border-gr-100 bg-gr-white py-[10px] pl-4 pr-2"
        >
          <Button.Text text={btnText} className="text-btn-2 text-gr-500" />
          <Button.Icon alt="right">
            <RightIcon width={20} height={20} stroke="var(--gr-500)" />
          </Button.Icon>
        </Button>
      }
    />
  );
};

export default ProfileEmptyState;
