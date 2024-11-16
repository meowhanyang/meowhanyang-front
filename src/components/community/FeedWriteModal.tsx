import ImageUploader, {
  ImageUploadData
} from '@/components/diary/ImageUploader';
import Textarea from '@/components/ui/Textarea';
import Topbar from '@/components/ui/Topbar';
import React, { useEffect, useState } from 'react';
import { FeedType } from '@/types/communityType';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { editFeedOnServer, registerFeedOnServer } from '@/services/community';

interface FeedWriteModalProps {
  onClose: () => void;
  feedDetail?: FeedType;
}

const FeedWriteModal = ({ onClose, feedDetail }: FeedWriteModalProps) => {
  const router = useRouter();

  const [textareaContent, setTextareaContent] = useState('');
  const [feedImageList, setFeedImageList] = useState<ImageUploadData[]>([
    { key: 1, imageSrc: null, croppedImage: null },
    { key: 2, imageSrc: null, croppedImage: null },
    { key: 3, imageSrc: null, croppedImage: null }
  ]);

  const settingFeedDetail = () => {
    if (!feedDetail) return;

    setTextareaContent(feedDetail.content);
    setFeedImageList(updateFeedImages(feedDetail?.images));
  };

  const updateFeedImages = (images: string[]) => {
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
    settingFeedDetail();
  }, [feedDetail]);

  const saveFeed = () => {
    return feedDetail?.id
      ? editFeedMutation.mutate({
          id: feedDetail?.id,
          ...settingParams()
        })
      : registerFeedMutation.mutate(settingParams());
  };

  const settingParams: () => { content: string; images: string[] } = () => {
    const images = feedImageList
      ?.filter(feed => feed.croppedImage)
      ?.map(feed => feed.croppedImage);

    return {
      content: textareaContent,
      images: images.filter(image => image !== null) as string[]
    };
  };

  const registerFeedMutation = useMutation({
    mutationFn: (reqObj: { content: string; images: string[] }) =>
      registerFeedOnServer(reqObj),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        onClose();
        router.push('/community');
      } else {
        console.error('게시글 등록 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시글 등록 중 오류:', error);
    }
  });

  const editFeedMutation = useMutation({
    mutationFn: (reqObj: { id: number; content: string; images: string[] }) =>
      editFeedOnServer(reqObj),
    onSuccess: (response: any) => {
      if (response.status === 'OK') {
        onClose();
      } else {
        console.error('게시글 수정 중 오류:', response.message);
      }
    },
    onError: (error: any) => {
      console.error('게시글 수정 중 오류:', error);
    }
  });

  useEffect(() => {
    return () => {
      setFeedImageList([]);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-full overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={onClose} />
        <Topbar.Title title="글쓰기" />
        <Topbar.Complete onClick={saveFeed} />
      </Topbar>
      <div className="mx-auto max-w-[640px] pb-28 pt-12">
        <article className="p-4 pt-14">
          <Textarea
            propObj={{
              placeholder: '사람들과 나누고 싶은 일들을 공유해보세요!',
              content: textareaContent,
              maxLength: 500
            }}
            onChange={e => setTextareaContent(e)}
          />
        </article>
        <article>
          <h5 className="p-4 text-heading-5 text-gr-900">
            사진
            <span className="text-pr-500">
              {feedImageList?.filter(feed => feed.croppedImage).length || 0}
            </span>
            /3
          </h5>
          <div className="flex gap-3 px-4">
            {feedImageList.map((feed, idx: number) => {
              if (idx === 0 || feedImageList[idx - 1].croppedImage) {
                return (
                  <ImageUploader
                    key={feed.key}
                    data={feed}
                    deleteBtn
                    onUpload={setFeedImageList}
                    images={feedImageList}
                  />
                );
              }
            })}
          </div>
        </article>
      </div>
    </div>
  );
};

export default FeedWriteModal;
