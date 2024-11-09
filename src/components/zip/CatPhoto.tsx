import Topbar from '../ui/Topbar';
import ImageUploader from '@/components/diary/ImageUploader';
import { CatRegisterReqObj } from '@/app/zip/catType';
import Filter from '../diary/Filter';
import { useState } from 'react';
import { DEFAULT_CAT_IMAGES, DEFAULT_IMAGE_SRC } from '@/constants/cats';
import Image from 'next/image';

interface SignInMainProps {
  setStep: () => void;
  setCatData: (data: any) => void;
  setPrev: () => void;
}

export default function CatPhoto({
  setStep,
  setCatData,
  setPrev
}: SignInMainProps) {
  const [selectedImage, setSelectedImage] = useState<{
    key: number;
    imageSrc: string;
    croppedImage: string | null;
  }>({
    key: DEFAULT_CAT_IMAGES[0].key,
    imageSrc: DEFAULT_IMAGE_SRC,
    croppedImage: null
  });

  const [selectedKey, setSelectedKey] = useState<number | null>(
    DEFAULT_CAT_IMAGES[0].key
  );

  const handleImageSelect = (key: number, imageSrc: string) => {
    setSelectedImage({
      key,
      imageSrc,
      croppedImage: null
    });
    setSelectedKey(key);
  };

  const handleImageUpload = (data: any) => {
    setSelectedImage(data);
    setSelectedKey(null); // 이미지 업로드 시 선택 해제
  };
  const clickCompleteButton = (prev: CatRegisterReqObj) => {
    // 기본 이미지 선택한 경우
    if (
      DEFAULT_CAT_IMAGES.some(img => img.imageSrc === selectedImage.imageSrc)
    ) {
      return {
        ...prev,
        imageUrl: selectedImage.imageSrc,
        image: null,
        croppedImage: null
      };
    }

    // 사용자 업로드 이미지인 경우
    return {
      ...prev,
      image: selectedImage.imageSrc,
      croppedImage: selectedImage.croppedImage, // 크롭된 이미지가 없으면 원본 이미지 사용
      imageUrl: selectedImage.imageSrc
    };
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="고양이 등록(2/3)" />
        <Topbar.Complete
          onClick={() => {
            setCatData(clickCompleteButton);
            setStep();
          }}
        />
      </Topbar>
      <section className="pt-20">
        <div className="flex items-center justify-center">
          <Image
            src={
              selectedImage.croppedImage
                ? selectedImage.croppedImage
                : selectedImage.imageSrc
            }
            alt="고양이 사진"
            width={120}
            height={120}
            className="rounded-[48px]"
          />
        </div>
      </section>
      <section className="px-6">
        <div className="py-4 text-center text-body-4 text-gr-black">
          고양이 대표 사진을 하나 선택하세요!
        </div>
        <div className="grid grid-cols-4 gap-4">
          <ImageUploader
            width="w-16"
            height="h-16"
            data={
              DEFAULT_CAT_IMAGES.some(
                img => img.imageSrc === selectedImage.imageSrc
              )
                ? { key: 0, imageSrc: '', croppedImage: null }
                : selectedImage
            }
            deleteBtn
            onUpload={handleImageUpload}
          />
          {DEFAULT_CAT_IMAGES.map(data => (
            <Filter
              key={data.key}
              id={data.key}
              imageUrl={data.imageSrc}
              type="cat"
              isSelected={selectedKey === data.key}
              onClick={() => handleImageSelect(data.key, data.imageSrc)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
