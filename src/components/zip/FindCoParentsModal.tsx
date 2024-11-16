'use client';

import { CoParent } from '@/app/zip/catType';
import Topbar from '@/components/ui/Topbar';
import CoParentsRequestBottomSheet from '@/components/zip/CoParentsRequestBottomSheet';
import { useCoParents } from '@/hooks/useCats';
import { cancelCoParenting, requestCoParenting } from '@/services/cat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface FindCoParentsModalProps {
  setShowCoParentsModal: React.Dispatch<React.SetStateAction<boolean>>;
  catId: number;
}

const FindCoParentsModal = ({
  setShowCoParentsModal,
  catId
}: FindCoParentsModalProps) => {
  const queryClient = useQueryClient();

  const [keyword, setKeyword] = useState('');
  const [requestBottomSheet, setRequestBottomSheet] = useState(false);
  const [coParentList, setCoParentList] = useState<CoParent[]>([]);
  const [coParent, setCoParent] = useState<CoParent>({} as CoParent);

  const { data: coParents, isError, isLoading } = useCoParents(keyword, catId);

  useEffect(() => {
    setCoParentList(coParents?.items);
  }, [coParents]);

  const debounceNickname = useCallback(
    debounce(name => {
      setKeyword(name);
    }, 500),
    []
  );
  const handleNickname = (e: { target: { value: string } }) => {
    debounceNickname(e.target.value);
  };

  const openBottomSheet = (parent: CoParent) => {
    setCoParent(parent);
    setRequestBottomSheet(true);
  };

  const requestCoParentingMutation = useMutation({
    mutationFn: (reqObj: { catId: number; memberId: number }) =>
      requestCoParenting(reqObj),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.log('error');
      } else {
        queryClient.invalidateQueries({ queryKey: ['coParents'] });
      }
    }
  });

  const cancelCoParentingMutation = useMutation({
    mutationFn: (reqObj: { catId: number; memberId: number }) =>
      cancelCoParenting(reqObj),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.log('error');
      } else {
        queryClient.invalidateQueries({ queryKey: ['coParents'] });
      }
    }
  });

  const toggleRequestCoParenting = () => {
    if (coParent.isRequested) {
      cancelCoParentingMutation.mutate({
        catId: catId,
        memberId: coParent.memberId
      });
      return;
    }
    requestCoParentingMutation.mutate({
      catId: catId,
      memberId: coParent.memberId
    });
  };

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 h-full min-w-[320px] bg-gr-white">
      <section>
        <Topbar type="two" className="justify-start">
          <Topbar.Back onClick={() => setShowCoParentsModal(false)} />
          <Topbar.SearchInput onChange={handleNickname} />
        </Topbar>
      </section>
      <ul className="mx-auto w-full max-w-[640px] p-4 pt-12">
        {coParentList ? (
          <>
            {coParentList?.map((coParent: CoParent) => (
              <li
                key={coParent.memberId}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={coParent.imageUrl || 'https://github.com/shadcn.png'}
                    alt="image"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                  <p className="text-body-2 text-gr-900">{coParent.nickname}</p>
                </div>
                <button
                  className={`flex h-[34px] w-20 items-center justify-center gap-[2px] rounded-[6px] text-btn-2 ${
                    coParent.isRequested
                      ? 'border border-pr-500 bg-gr-white text-pr-500'
                      : 'bg-pr-500 text-gr-white'
                  }`}
                  onClick={() => openBottomSheet(coParent)}
                >
                  {coParent.isRequested ? (
                    <p>요청취소</p>
                  ) : (
                    <>
                      <p>요청</p>
                      <Image
                        src="/images/icons/plane.svg"
                        alt="send"
                        width={20}
                        height={20}
                      />
                    </>
                  )}
                </button>
              </li>
            ))}
          </>
        ) : (
          <div>공동집사가 없습니다.</div>
        )}
      </ul>

      <CoParentsRequestBottomSheet
        isVisible={requestBottomSheet}
        setIsVisible={setRequestBottomSheet}
        coParent={coParent}
        toggleRequestCoParenting={toggleRequestCoParenting}
      />
    </div>
  );
};

export default FindCoParentsModal;
