'use client';

import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef
} from 'react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import useCropper from '@/components/ui/hooks/useCropper';
import CloseIcon from '../../../public/images/icons/close.svg';
import PencilIcon from '../../../public/images/icons/pencil.svg';

export interface ImageUploadData {
  key: number;
  imageSrc: string | null;
  croppedImage: string | null;
}
interface ImageUploaderProps {
  width?: string;
  height?: string;
  radius?: string;
  preview?: ReactNode;
  editBtn?: boolean;
  deleteBtn?: boolean;
  data: ImageUploadData;
  onUpload: Dispatch<SetStateAction<ImageUploadData[]>>;
  images?: ImageUploadData[];
}

const ImageUploader = ({
  width,
  height,
  radius,
  preview,
  editBtn,
  deleteBtn,
  data,
  onUpload,
  images
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageElement = useRef(null);

  const selectImage = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload((prevList: any) => {
          if (Array.isArray(prevList)) {
            return prevList.map(item =>
              item.key === key
                ? { ...item, imageSrc: reader.result as string }
                : item
            );
          } else {
            return {
              ...prevList,
              imageSrc: reader.result as string,
              croppedImage: null
            };
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (key: number) => {
    if (!images) return;

    const updatedList = images
      .filter(image => image.key !== key)
      .map((image, index) => ({
        ...image,
        key: index
      }));
    updatedList.push({
      key: images.length,
      imageSrc: null,
      croppedImage: null
    });
    onUpload(updatedList);
  };

  const { handleCrop } = useCropper(
    data?.key,
    data?.imageSrc,
    imageElement,
    onUpload
  );

  return (
    <div
      className={`${width || 'w-[90px]'} ${height || 'h-[90px]'} ${
        radius || 'rounded-16'
      } relative flex flex-col items-center justify-center bg-gr-50`}
    >
      {/* 파일 업로드 */}
      {!data?.imageSrc && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={e => selectImage(e, data?.key)}
          id={String(data?.key)}
          className="hidden"
        />
      )}
      {/* 업로드 버튼 겸 이미지 프리뷰 */}
      <section
        className={`flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat text-btn-3 text-gr-300 ${
          radius || 'rounded-16'
        }`}
        style={{ backgroundImage: `url(${data?.croppedImage})` }}
        onClick={() => fileInputRef.current?.click()}
      >
        {!data?.croppedImage &&
          (preview || (
            <div className="flex flex-col items-center justify-center gap-1">
              <Image
                src="/images/icons/camera.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <p className="text-btn-3 text-gr-300">사진 추가</p>
            </div>
          ))}
      </section>
      {/* 상단 삭제 버튼 */}
      {data?.croppedImage && deleteBtn && (
        <section
          className="absolute -right-1 -top-1 cursor-pointer"
          onClick={() => deleteImage(data?.key)}
        >
          <Image
            src="/images/icons/close-bg.svg"
            alt="icon"
            width={24}
            height={24}
          />
        </section>
      )}
      {/* 하단 수정/삭제 버튼 */}
      {editBtn && (
        <section className="absolute bottom-0 right-0 rounded-16">
          <div className="h-full w-full rounded-full border-[1.5px] border-gr-white bg-gr-700 p-1">
            {data?.croppedImage ? (
              <CloseIcon
                width={16}
                height={16}
                stroke="var(--gr-white)"
                onClick={() => {
                  console.log(data?.key);
                  deleteImage(data?.key);
                }}
              />
            ) : (
              <PencilIcon
                width={16}
                height={16}
                stroke="var(--gr-white)"
                onClick={() => fileInputRef.current?.click()}
              />
            )}
          </div>
        </section>
      )}
      {/* crop image */}
      <section className="w-full">
        {data?.imageSrc && !data?.croppedImage && (
          <div className="fixed left-0 top-0 z-[200]">
            <div className="h-screen w-screen bg-gr-white">
              <Image
                ref={imageElement}
                src={data?.imageSrc}
                alt="cropped-image"
                width={24}
                height={24}
              />
              <div className="fixed left-1/2 top-8 -translate-x-1/2">
                <Button variant="secondary" size="md" onClick={handleCrop}>
                  이미지 자르기
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ImageUploader;
