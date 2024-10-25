import { objectToQueryString } from '@/utils/common';
import returnFetch from '@/utils/returnFetch';
import { getCookie } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';
import { DiaryRegisterReqObj } from '@/app/diary/diaryType';

type DiarySearchOption = {
  page: number;
  size: number;
  date: string;
};

interface DiaryObj extends DiaryRegisterReqObj {
  id: number;
}

const memberToken = getCookie('Authorization');
const fetchExtendedAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API + '/api/auth/v1.0.0',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${memberToken}`
  }
});

export const useDiaries = ({ date, page, size }: DiarySearchOption) => {
  const fetchDiaries = async (reqObj: DiarySearchOption) => {
    const response = await fetchExtendedAuth(
      `/diaries?${objectToQueryString(reqObj)}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const sortByLatest = data.items.sort(
      (a: DiaryObj, b: DiaryObj) => b.id - a.id
    );
    return sortByLatest || [];
  };

  return useQuery({
    queryKey: ['diaries', page, size, date],
    queryFn: () => fetchDiaries({ date, size, page }),
    staleTime: 1000 * 60 * 10
  });
};

export const useDiaryDetail = (id: number, showWriteModal: boolean) => {
  const fetchDiaryDetail = async (id: number) => {
    const response = await fetchExtendedAuth(`/diaries/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  };

  return useQuery({
    queryKey: ['diaryDetail', id, showWriteModal],
    queryFn: () => fetchDiaryDetail(id),
    staleTime: 1000 * 60 * 10
  });
};
