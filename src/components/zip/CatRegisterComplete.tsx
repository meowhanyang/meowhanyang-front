import Topbar from '../ui/Topbar';
import { CatRegisterReqObj } from '@/app/zip/catType';
import { useRouter } from 'next/navigation';

interface SignInMainProps {
  catData: CatRegisterReqObj;
  setPrev: () => void;
  setStep: () => void;
}
export default function CatRegisterComplete({
  catData,
  setPrev,
  setStep
}: SignInMainProps) {
  const router = useRouter();
  const handleMoveToDiaryWrite = () => {
    router.push('/diary');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto h-full min-w-[320px] max-w-[640px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="등록 완료" />
        <Topbar.Empty />
      </Topbar>
      <section className="mt-12 flex h-fit flex-col items-center self-stretch p-6">
        <article className="flex max-w-screen-sm flex-1 flex-col items-center self-stretch pt-[60px]">
          <div
            className="flex h-32 w-32 items-center justify-center gap-[10px] rounded-full bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${catData?.croppedImage})` }}
          ></div>

          <div className="flex flex-col justify-center gap-2 self-stretch pb-4 pt-6 text-center">
            <p className="text-heading-1 font-bold">
              <span className="block">
                <span className="text-pr-500">{catData?.name}</span>
                <span>냥이가</span>
              </span>
              <span className="block">모음집에 추가되었어요💙</span>
            </p>
            <p className="text-gr-600">첫 일지를 작성하시겠어요?</p>
          </div>
          <div className="flex flex-1 flex-shrink-0 flex-col items-center self-stretch p-4 pb-[180px]">
            <button
              className="flex flex-col items-center justify-center gap-[10px] rounded-xl border border-gr-100 px-4 py-[10px] font-semi-bold text-gr-500"
              onClick={handleMoveToDiaryWrite}
            >
              일지 쓰러가기
            </button>
          </div>
          <div className="flex h-12 w-full flex-1 items-start justify-center gap-2 self-stretch">
            <button
              className="flex flex-1 items-center justify-center gap-[10px] rounded-16 border border-gr-100 bg-blue-500 px-4 py-3 text-white"
              onClick={() => setStep()}
            >
              모음집 보기
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
