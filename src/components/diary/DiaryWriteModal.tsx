import ImageUploader from '@/components/diary/ImageUploader';
import Chip from '@/components/ui/Chip';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import React, { useEffect, useState } from 'react';
import BackIcon from '../../../public/images/icons/back.svg';
import { Button } from '@/components/ui/Button';
import BottomSheet from '@/components/ui/BottomSheet';
import TimeInput from '@/components/diary/TimeInput';
import SearchCatModal from './SearchCatModal';
import { useAtom } from 'jotai';
import { diaryImageListAtom } from '@/atoms/imageAtom';
import { useMutation } from '@tanstack/react-query';
import { editDiaryOnServer, registerDiaryOnServer } from '@/services/diary';
import { DiaryRegisterReqObj } from '@/app/diary/diaryType';
import { useRouter } from 'next/navigation';
import { CatType } from '@/types/cat';

type DiaryRegisterReqWithCats = Omit<DiaryRegisterReqObj, 'taggedCats'> & {
  taggedCats: CatType[];
};

interface DiaryWriteModalProps {
  onClose: () => void;
  id: number;
  diaryDetail?: DiaryRegisterReqWithCats;
}

const DiaryWriteModal = ({
  onClose,
  id,
  diaryDetail
}: DiaryWriteModalProps) => {
  const router = useRouter();

  const [textareaContent, setTextareaContent] = useState('');
  const [currentTime, setCurrentTime] = useState({
    hour: new Date().getHours().toString().padStart(2, '0'),
    minute: new Date().getMinutes().toString().padStart(2, '0')
  });
  const [chipObjList, setChipObjList] = useState([
    { key: 'food', content: '🐟 사료', checked: false },
    { key: 'water', content: '💧 물', checked: false }
  ]);
  const [searchCatModal, setSearchCatModal] = useState(false);
  const [selectTimeBottomSheet, setSelectTimeBottomSheet] = useState(false);
  const [taggedCatList, setTaggedCatList] = useState<CatType[]>([]);
  const [diaryImageList, setDiaryImageList] = useAtom(diaryImageListAtom);

  const settingDiaryDetail = () => {
    if (!diaryDetail) return;

    setTextareaContent(diaryDetail.content);
    setCurrentTime({
      hour: diaryDetail.caredTime.split(':')[0].split(' ')[1],
      minute: diaryDetail.caredTime.split(':')[1]
    });
    setChipObjList(prevList =>
      prevList.map(prevChip =>
        prevChip.key === 'food'
          ? { ...prevChip, checked: diaryDetail.isFeed }
          : prevChip.key === 'water'
            ? { ...prevChip, checked: diaryDetail.isGivenWater }
            : prevChip
      )
    );
    setDiaryImageList(updateDiaryImages(diaryDetail?.images));
    setTaggedCatList(diaryDetail.taggedCats);
  };

  const updateDiaryImages = (images: string[]) => {
    if (!images) return [];

    const updatedImageList = images.map((image, index) => ({
      key: index,
      imageSrc: null,
      croppedImage: image
    }));

    updatedImageList.push({
      key: images.length,
      imageSrc: null,
      croppedImage: ''
    });
    return updatedImageList.slice(0, 3);
  };
  useEffect(() => {
    settingDiaryDetail();
  }, [diaryDetail]);

  const displayTime = () => {
    const { hour, minute } = currentTime;
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };

  const caredDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  console.log('diaryDetail', diaryDetail);
  const settingParams = () => {
    console.log('taggedCatList', taggedCatList);

    const images = diaryImageList
      ?.filter(diary => diary.croppedImage)
      ?.map(diary => diary.croppedImage);

    return {
      isGivenWater: chipObjList.find(chip => chip.key === 'water')
        ?.checked as boolean,
      isFeed: chipObjList.find(chip => chip.key === 'food')?.checked as boolean,
      content: textareaContent,
      caredDate: caredDate(),
      caredTime: displayTime(),
      catIds: taggedCatList.map(cat => cat.id),
      images: images.filter(image => image !== null) as string[]
    };
  };

  const saveDiary = () => {
    return id
      ? editDiaryMutation.mutate({ id, diary: settingParams() })
      : registerDiaryMutation.mutate(settingParams());
  };

  const registerDiaryMutation = useMutation({
    mutationFn: (reqObj: DiaryRegisterReqObj) => {
      return registerDiaryOnServer(reqObj);
    },
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        onClose();
        router.push('/diary');
      } else {
        console.error('일지 등록 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('일지 등록 중 오류:', error);
    }
  });

  const editDiaryMutation = useMutation({
    mutationFn: (reqObj: { id: number; diary: DiaryRegisterReqObj }) =>
      editDiaryOnServer(reqObj),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        onClose();
      } else {
        console.error('일지 수정 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('일지 수정 중 오류:', error);
    }
  });

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title="일지쓰기" />
        <Topbar.Complete onClick={saveDiary} />
      </Topbar>
      <section className="flex items-center justify-between px-4 py-2">
        <h5 className="py-2 text-heading-5 text-gr-900">돌봄 시간</h5>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelectTimeBottomSheet(!selectTimeBottomSheet);
          }}
        >
          {displayTime()}
        </Button>
      </section>
      <section className="flex flex-col gap-4">
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">돌봄 일지</h5>
          <div className="px-4">
            <Textarea
              propObj={{
                placeholder: '오늘 하루의 돌봄 일지를 기록해보세요.',
                content: textareaContent,
                maxLength: 500
              }}
              onChange={e => setTextareaContent(e)}
            />
          </div>
        </article>
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">
            사진
            <span className="text-pr-500">
              {diaryImageList.filter(diary => diary.croppedImage).length || 0}
            </span>
            /3
          </h5>
          <div className="flex gap-3 px-4">
            {diaryImageList.map((diary, idx: number) => {
              if (idx === 0 || diaryImageList[idx - 1].croppedImage) {
                return (
                  <ImageUploader
                    key={diary.key}
                    data={diary}
                    deleteBtn
                    onUpload={setDiaryImageList}
                    images={diaryImageList}
                  />
                );
              }
            })}
          </div>
        </article>
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">돌봄 기록</h5>
          <div className="flex gap-2 px-4 py-1">
            {chipObjList.map(chip => {
              return (
                <Chip
                  key={chip.key}
                  propObj={chip}
                  onClick={() =>
                    setChipObjList(prevList =>
                      prevList.map(prevChip =>
                        prevChip.key === chip.key
                          ? { ...prevChip, checked: !prevChip.checked }
                          : prevChip
                      )
                    )
                  }
                />
              );
            })}
          </div>
        </article>
        <article>
          <BottomSheet
            isVisible={selectTimeBottomSheet}
            setIsVisible={() =>
              setSelectTimeBottomSheet(!selectTimeBottomSheet)
            }
            heightPercent={['70%', '50%']}
          >
            <div className="flex h-12 items-center justify-center text-heading-3">
              돌봄 시간을 입력하세요.
            </div>
            <div className="px-4 pb-10 pt-4">
              <TimeInput
                time={currentTime}
                setTime={setCurrentTime}
                setSelectTimeBottomSheet={setSelectTimeBottomSheet}
              />
            </div>
          </BottomSheet>
        </article>
        <article>
          <div className="flex items-center justify-between p-4">
            <h5 className="text-heading-5 text-gr-900">
              고양이 태그
              <span className="pl-1 text-pr-500">{taggedCatList.length}</span>
            </h5>
            <BackIcon
              width={16}
              height={16}
              stroke="var(--gr-black)"
              className="rotate-180"
              onClick={() => setSearchCatModal(true)}
            />
          </div>
          <ul className="px-4 py-1 pb-20">
            {taggedCatList.map((cat: CatType) => {
              return (
                <li key={cat.id} className="flex items-center gap-4 py-2">
                  <img
                    src={cat.imageUrl}
                    alt="cat-image"
                    className="h-12 w-12 rounded-full border"
                  />
                  <div className="flex gap-2">
                    <h5 className="text-body-2 text-gr-900">{cat.name}</h5>
                    <img
                      src={`/images/icons/gender-${cat.sex}.svg`}
                      alt="tag cat"
                      className={`rounded-full ${
                        cat.sex === 'F' ? 'bg-[#FFF2F1]' : 'bg-[#ECF5FF]'
                      }`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
        {searchCatModal && (
          <SearchCatModal
            setSearchCatModal={setSearchCatModal}
            setTaggedCatList={setTaggedCatList}
          />
        )}
      </section>
    </div>
  );
};

export default DiaryWriteModal;
