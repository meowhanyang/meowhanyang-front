'use client';

import React, { useEffect, useState } from 'react';
import ZipDetailDiary from '../../../components/zip/ZipDetailDiary';
import Topbar from '@/components/ui/Topbar';
import { useRouter } from 'next/navigation';
import MoreBtnBottomSheet from '@/components/community/MoreBtnBottomSheet';
import DetailCardLayout from '@/components/zip/DetailCardLayout';
import { useCatDetail } from '@/hooks/useCats';
import { DiaryObj } from '@/app/diary/diaryType';
import ZipDetailCoParents from '@/components/zip/ZipDetailCoParents';
import { CatRegisterReqObj, CoParent } from '@/app/zip/catType';
import ZipDetailCatCard from '../../../components/zip/ZipDetailCatCard';
import CoParentsBottomSheet from '@/components/zip/CoParentsBottomSheet';
import FindCoParentsModal from '../../../components/zip/FindCoParentsModal';
import { Toaster } from '@/components/ui/Toaster';
import Link from 'next/link';
import CatInfo from '@/components/zip/CatInfo';
import { deleteCat } from '@/services/cat';

const ZipDiaryPage = ({ params: { id } }: { params: { id: number } }) => {
  const router = useRouter();

  const [editBottomSheet, setEditBottomSheet] = useState(false);
  const [coParentsBottomSheet, setCoParentsBottomSheet] = useState(false);
  const [showCatEditModal, setShowCatEditModal] = useState(false);
  const [showCoParentsModal, setShowCoParentsModal] = useState(false);

  const { data: catDetail, isError, isLoading } = useCatDetail(id);
  const [catData, setCatData] = useState<CatRegisterReqObj | null>(null);

  useEffect(() => {
    if (!catDetail) return;
    if (catDetail !== undefined && catData === null) {
      setCatData(catDetail);
    }
  }, [catDetail, id, catData]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <Topbar type="two">
        <Topbar.Back onClick={() => router.back()} />
        <Topbar.More onClick={() => setEditBottomSheet(true)} />
      </Topbar>
      <section className="mx-auto flex h-screen max-w-[640px] flex-col gap-4 overflow-auto bg-gr-50 px-4 pb-32 pt-[72px]">
        <article className="rounded-16">
          <ZipDetailCatCard {...catDetail} />
        </article>
        <DetailCardLayout
          titleObj={{
            title: '공동집사',
            onClick: () => setCoParentsBottomSheet(true)
          }}
          btnObj={{
            text: '함께할 공동집사 찾기',
            onClick: () => setShowCoParentsModal(true)
          }}
        >
          <div className="flex pt-2">
            {catDetail.coParents?.map((coParent: CoParent) => (
              <ZipDetailCoParents key={coParent.memberId} {...coParent} />
            ))}
          </div>
        </DetailCardLayout>
        {catDetail.isMine && (
          <DetailCardLayout
            titleObj={{ title: '일지' }}
            btnObj={{
              text: '더보기',
              onClick: () => router.push(`/diary`)
            }}
          >
            {catDetail.diaries?.slice(0, 3).map((diary: DiaryObj) => (
              <Link href={`/diary/${diary.id}`} key={diary.id}>
                <ZipDetailDiary {...diary} />
              </Link>
            ))}
          </DetailCardLayout>
        )}
      </section>

      <MoreBtnBottomSheet
        type="zip"
        isVisible={editBottomSheet}
        setIsVisible={() => setEditBottomSheet(!editBottomSheet)}
        heightPercent={['50%', '40%']}
        name={catDetail?.name}
        memberId={catDetail?.id}
        onDelete={() => {
          deleteCat(catDetail?.id);
          location.href = '/zip';
        }}
        onEdit={() => setShowCatEditModal(true)}
      />
      <CoParentsBottomSheet
        isVisible={coParentsBottomSheet}
        setIsVisible={() => setCoParentsBottomSheet(!coParentsBottomSheet)}
        coParents={catDetail.coParents}
      />

      {showCatEditModal && catData && (
        <CatInfo
          type="edit"
          setStep={() => setShowCatEditModal(false)}
          catData={catData}
          setPrev={() => setShowCatEditModal(false)}
        />
      )}

      {showCoParentsModal && (
        <FindCoParentsModal
          setShowCoParentsModal={setShowCoParentsModal}
          catId={catDetail.id}
        />
      )}
      <Toaster />
    </>
  );
};

export default ZipDiaryPage;
