import Topbar from '../ui/Topbar';
import ImageUploader from '@/components/diary/ImageUploader';
import { CatRegisterReqObj } from '@/app/zip/catType';
import Filter from '../diary/Filter';
import { useState } from 'react';
import { DEFAULT_CAT_IMAGES, DEFAULT_IMAGE_SRC } from '@/constants/cats';

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
    key: 0,
    imageSrc: '',
    croppedImage: null
  });

  const handleImageSelect = (key: number, imageSrc: string) => {
    setSelectedImage({
      key,
      imageSrc,
      croppedImage: imageSrc
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={setPrev} />
        <Topbar.Title title="고양이 등록(2/3)" />
        <Topbar.Complete
          onClick={() => {
            setCatData((prev: CatRegisterReqObj) => ({
              ...prev,
              image: selectedImage.imageSrc,
              croppedImage: selectedImage.croppedImage
            }));
            setStep();
          }}
        />
      </Topbar>
      <section className="pt-20">
        <div className="flex items-center justify-center">
          <img
            className="rounded-[48px]"
            src={selectedImage.croppedImage || DEFAULT_IMAGE_SRC}
            width={120}
            height={120}
            alt="고양이 사진"
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
            data={selectedImage}
            deleteBtn
            onUpload={(data: any) => {
              setSelectedImage(data);
            }}
          />
          {DEFAULT_CAT_IMAGES.map(data => (
            <Filter
              key={data.key}
              id={data.key}
              imageUrl={data.imageSrc}
              type="cat"
              onClick={() => handleImageSelect(data.key, data.imageSrc)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
