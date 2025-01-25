import Topbar from '../ui/Topbar';
import { Input } from '../ui/Input';
import { CatRegisterReqObj } from '@/app/zip/catType';
import useCatNameHandler from '@/hooks/zip/useCatNameHandler';

interface SignInMainProps {
  setStep: () => void;
  setPrev: () => void;
  setCatData: (
    data: (prevData: CatRegisterReqObj) => CatRegisterReqObj
  ) => void;
}

export default function CatName({
  setStep,
  setCatData,
  setPrev
}: SignInMainProps) {
  const { catName, handleCatNameChange } = useCatNameHandler();

  const handleNext = () => {
    setCatData((prev: CatRegisterReqObj) => ({ ...prev, name: catName.value }));
    setStep();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 mx-auto h-full min-w-[320px] max-w-[640px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="고양이 등록(1/3)" />
        <Topbar.Complete onClick={handleNext} />
      </Topbar>
      <section className="mx-auto mt-16 max-w-[640px] p-6 text-gray-800">
        <div className="mb-[32px]">
          <p className="text-[24px] font-bold">냥이 이름이 뭐예요?</p>
          <p>길냥이에게 멋있는 이름을 선물해주세요</p>
        </div>
        <div className="pb-4">
          <Input
            variant="outlined"
            placeholder="예) 냥냥이"
            value={catName.value}
            onChange={handleCatNameChange}
            helperText="띄어쓰기 포함 12자 미만"
          />
        </div>
      </section>
    </div>
  );
}
