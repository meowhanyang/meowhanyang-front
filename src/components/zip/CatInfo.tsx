import { useEffect, useState } from 'react';
import { CatObjType, CatRegisterReqObj, CoParent } from '@/app/zip/catType';
import Topbar from '../ui/Topbar';
import Textarea from '../ui/Textarea';
import BottomSheet from '../ui/BottomSheet';
import DatePicker from '../common/DatePicker';
import { Button } from '../ui/Button';
import { editCat, registerCat } from '@/services/cat';
import ImageUploader from '../diary/ImageUploader';
import { Input } from '../ui/Input';
import useCatNameHandler from '@/hooks/zip/useCatNameHandler';
import { DiaryObj } from '@/app/diary/diaryType';
import { useQueryClient } from '@tanstack/react-query';

interface SignInMainProps {
  setStep: () => void;
  catData: CatRegisterReqObj;
  setPrev: () => void;
  type: 'register' | 'edit';
}

const todayToDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}년  /  ${month}월  /  ${day}일`;
};

export default function CatInfo({
  setStep,
  catData,
  setPrev,
  type
}: SignInMainProps) {
  const queryClient = useQueryClient();

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [textareaContent, setTextAreaContent] = useState('');
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | number>(
    todayToDateString
  );
  const [selectedNeutered, setSelectedNeutered] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState({
    key: 0,
    imageSrc: '',
    croppedImage: null
  });
  const { catName, handleCatNameChange } = useCatNameHandler();

  useEffect(() => {
    if (type === 'edit') {
      setSelectedSex(catData.sex);
      setSelectedNeutered(catData.isNeutered);
      setSelectedItem(catData.metAt);
      setTextAreaContent(catData.memo);
    }
  }, []);

  const handleSelectedChange = (selected: string) => {
    setSelectedItem(selected);
    setOpenBottomSheet(false);
  };
  [];

  const formatDate = (input: string): string => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return input;
    }

    if (!input || typeof input !== 'string') {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }

    const parts = input
      .replace(/년|월|일/g, '')
      .split('/')
      .map(part => part.trim());

    if (parts.length !== 3) {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }

    const [year, month, day] = parts;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const updateCatData = () => {
    const updatedCatData: CatObjType & {
      id?: number;
      diaries?: DiaryObj[];
      coParents?: CoParent[];
      isCoParented?: boolean;
      dDay?: number;
    } = {
      ...catData,
      sex: selectedSex,
      isNeutered: selectedNeutered,
      metAt:
        type === 'edit' && selectedItem === catData.metAt
          ? formatDate(catData.metAt)
          : formatDate(selectedItem as string),
      memo: textareaContent,
      imageUrl: selectedImage.imageSrc || catData.imageUrl, // 기본 이미지 선택 시 imageUrl 설정
      image: selectedImage.croppedImage, // 크롭된 이미지 설정
      croppedImage: selectedImage.croppedImage
    };
    return updatedCatData;
  };

  const handleOnClick = async () => {
    const newCatData = updateCatData();
    try {
      const response =
        type === 'edit'
          ? await editCat(newCatData)
          : await registerCat(newCatData);

      if (response && response.status === 200) {
        setStep();
        queryClient.invalidateQueries({ queryKey: ['getCats'] });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title
          title={type === 'register' ? '고양이 등록(3/3)' : '정보 수정'}
        />
        <Topbar.Complete onClick={handleOnClick} />
      </Topbar>
      <section className="mt-12 flex flex-col items-center self-stretch p-6">
        <article className="flex w-full flex-col items-center justify-center gap-4 pb-8">
          {type === 'register' ? (
            <>
              <div
                className="flex h-16 w-16 items-center justify-center gap-[10px] rounded-full bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${catData?.croppedImage || catData?.imageUrl})`
                }}
              ></div>
              <p className="flex flex-col justify-center text-center text-heading-1 font-bold">
                <span className="block">
                  <span className="text-pr-500">{catData?.name}</span>
                  <span>에 대해</span>
                </span>
                <span className="block">알려주세요!</span>
              </p>
            </>
          ) : (
            <ImageUploader
              width="w-[120px]"
              height="h-[120px]"
              radius="rounded-[48px]"
              preview={
                <img
                  className="h-full w-full rounded-[48px]"
                  src={selectedImage.imageSrc || catData?.imageUrl}
                />
              }
              editBtn
              data={selectedImage}
              onUpload={(data: any) => {
                setSelectedImage(data);
              }}
            />
          )}
        </article>
        <article className="flex flex-col items-start self-stretch pb-6">
          {type === 'edit' && (
            <article className="flex flex-col items-center self-stretch pb-6">
              <p className="flex items-center gap-1 self-stretch py-3 font-bold">
                이름
              </p>
              <div className="w-full">
                <Input
                  variant="outlined"
                  placeholder={catData?.name}
                  className="flex flex-shrink-0 flex-col items-center justify-end"
                  value={catName.value}
                  onChange={handleCatNameChange}
                />
              </div>
            </article>
          )}
          <article className="flex items-center self-stretch">
            <p className="font-bold">성별이 뭐예요?</p>
          </article>
          <article className="flex items-start justify-between gap-3 self-stretch pt-4">
            <Button
              variant={selectedSex === 'F' ? 'tertiaryReverse' : 'tertiary'}
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedSex('F')}
            >
              여아
              <img src={`/images/icons/gender-F.svg`} alt="Female" />
            </Button>
            <Button
              variant={selectedSex === 'M' ? 'tertiaryReverse' : 'tertiary'}
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedSex('M')}
            >
              남아
              <img src={`/images/icons/gender-M.svg`} alt="Male" />
            </Button>
            <Button
              variant={
                selectedSex === 'UNDEFINED' ? 'tertiaryReverse' : 'tertiary'
              }
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedSex('UNDEFINED')}
            >
              <img src={`/images/icons/question.svg`} alt="Unknown" />
              모름
            </Button>
          </article>
        </article>
        <article className="flex flex-col items-center self-stretch pb-6">
          <p className="flex items-center gap-1 self-stretch py-3 font-bold">
            언제 처음 만나셨나요?
          </p>
          <button
            className="flex h-12 items-center justify-center self-stretch rounded-lg border border-gr-100"
            onClick={() => setOpenBottomSheet(true)}
          >
            {selectedItem}
          </button>
        </article>
        <article className="flex flex-col items-start self-stretch pb-6">
          <article className="flex items-center self-stretch">
            <p className="py-3 font-bold">중성화(TNR)했나요?</p>
          </article>
          <article className="flex items-start justify-center gap-3 self-stretch">
            <Button
              variant={
                selectedNeutered === 'Y' ? 'tertiaryReverse' : 'tertiary'
              }
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedNeutered('Y')}
            >
              완료
            </Button>
            <Button
              variant={
                selectedNeutered === 'N' ? 'tertiaryReverse' : 'tertiary'
              }
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedNeutered('N')}
            >
              미완료
            </Button>
            <Button
              variant={
                selectedNeutered === 'UNDEFINED'
                  ? 'tertiaryReverse'
                  : 'tertiary'
              }
              size="lg"
              className="rounded-8"
              onClick={() => setSelectedNeutered('UNDEFINED')}
            >
              모름
            </Button>
          </article>
        </article>
        <article className="flex flex-col items-start self-stretch pb-20">
          <p className="flex items-center self-stretch py-3 font-bold">
            특징이 있나요?
          </p>
          <Textarea
            propObj={{
              placeholder: '예) 애교 많고 사람 좋아하는 개냥이에요.',
              content: textareaContent,
              maxLength: 100,
              style:
                'border border-gr-100 rounded-lg h-[120px] p-4 w-full min-h-[160px]'
            }}
            onChange={e => setTextAreaContent(e)}
          />
        </article>
      </section>
      <BottomSheet
        isVisible={openBottomSheet}
        setIsVisible={setOpenBottomSheet}
        topBar={<div className="font-medium">날짜 선택</div>}
        heightPercent={['70%', '50%']}
      >
        <DatePicker onSelectedChange={handleSelectedChange} />
      </BottomSheet>
    </div>
  );
}
