import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { ImageUploadData } from '@/components/diary/ImageUploader';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface CropperImageElement extends HTMLImageElement {
  cropper: Cropper;
}

const useCropper = (
  key: number,
  imageSrc: string | null,
  imageElement: MutableRefObject<CropperImageElement | null>,
  onUpload:
    | Dispatch<SetStateAction<ImageUploadData[]>>
    | Dispatch<SetStateAction<ImageUploadData>>
) => {
  useEffect(() => {
    if (imageElement.current && imageSrc) {
      const cropper = new Cropper(imageElement.current, {
        viewMode: 1,
        aspectRatio: 1,
        modal: true,
        background: false
      });

      return () => {
        cropper.destroy();
      };
    }
  }, [imageSrc]);

  const handleCrop = () => {
    if (imageElement.current) {
      const cropper = imageElement.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();

      // Canvas 크기 조절
      const MAX_HEIGHT = 800;
      const MAX_WIDTH = 800;

      const resizedCanvas = document.createElement('canvas');
      const ctx = resizedCanvas.getContext('2d');
      resizedCanvas.width = MAX_WIDTH;
      resizedCanvas.height = MAX_HEIGHT;
      ctx?.drawImage(croppedCanvas, 0, 0, MAX_WIDTH, MAX_HEIGHT);

      // Canvas를 이미지로 변환하여 압축 && 이미지 품질 설정
      const resizedImage = resizedCanvas.toDataURL('image/jpeg', 0.8);

      onUpload((prevList: any) => {
        if (Array.isArray(prevList)) {
          return prevList.map(item =>
            item.key === key ? { ...item, croppedImage: resizedImage } : item
          );
        } else if (
          prevList &&
          typeof prevList === 'object' &&
          !Array.isArray(prevList)
        ) {
          return { ...prevList, croppedImage: resizedImage };
        } else {
          return [];
        }
      });
    }
  };

  return { handleCrop };
};

export default useCropper;
