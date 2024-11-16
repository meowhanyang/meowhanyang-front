import { useRouter } from 'next/navigation';
import RightIcon from '../../../public/images/icons/right.svg';
import Image from 'next/image';

const EmptyState = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/community');
  };

  return (
    <section className="flex flex-col items-center justify-center pb-[120px] pt-10">
      <div className="flex flex-col items-center justify-center gap-[6px] px-4 py-6">
        <Image
          src="https://meowzip.s3.ap-northeast-2.amazonaws.com/images/icon/profile/setting.svg"
          alt="edit"
          width={120}
          height={120}
        />
        <h3 className="text-lg font-medium text-gray-700">
          아직 작성한 글이 없어요
        </h3>
        <p className="text-sm text-gray-500">
          사람들과 나누고 싶은 일들을 공유해보세요!
        </p>
      </div>
      <button
        className="flex items-center justify-center rounded-full border border-gray-100 bg-white py-[10px] pl-4 pr-2 text-gr-500 hover:bg-gray-50"
        onClick={onClick}
      >
        글 쓰기
        <RightIcon
          width={24}
          height={24}
          stroke="var(--gr-800)"
          onClick={onClick}
        />
      </button>
    </section>
  );
};

export default EmptyState;
