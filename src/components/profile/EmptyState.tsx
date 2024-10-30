import { useRouter } from 'next/navigation';

const EmptyState = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/community');
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[6px] px-4 py-6">
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
        <img src="/images/icons/right.svg" alt="right" className="h-6 w-6" />
      </button>
    </section>
  );
};

export default EmptyState;
