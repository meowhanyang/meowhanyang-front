import { DiaryObj } from '@/app/diary/diaryType';
import returnFetch from '@/utils/returnFetch';
import { base64ToFile } from '@/utils/common';
import { getCookie } from '@/utils/common';
import { objectToQueryString } from '@/utils/common';
import { fetchExtendedAuth } from '@/services/nickname';
import { CatObjType, CoParent } from '@/app/zip/catType';

const memberToken = getCookie('Authorization');
export const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API + '/api/auth/v1.0.0',
  headers: { Authorization: `Bearer ${memberToken}` }
});

export const registerCat = async (
  catDataObj: CatObjType & {
    id?: number;
    diaries?: DiaryObj[];
    coParents?: CoParent[];
    dDay?: number;
  }
) => {
  const { croppedImage, image, imageUrl, ...catObj } = catDataObj;
  const formData = new FormData();

  // 기본 이미지인 경우
  if (imageUrl) {
    formData.append(
      'cat',
      new Blob([JSON.stringify({ ...catObj, imageUrl })], {
        type: 'application/json'
      })
    );
    return fetchExtended('/cats', { method: 'POST', body: formData });
  }

  // 사용자 업로드 이미지인 경우
  formData.append(
    'cat',
    new Blob([JSON.stringify(catObj)], {
      type: 'application/json'
    })
  );

  // 크롭된 이미지가 있으면 크롭된 이미지를, 없으면 원본 이미지를 사용
  const imageToUpload = croppedImage || image;
  if (imageToUpload) {
    const file = base64ToFile(imageToUpload, 'image.jpg');
    if (file) formData.append('image', file);
  }

  return fetchExtended('/cats', { method: 'POST', body: formData });
};

export const editCat = async (
  catDataObj: CatObjType & {
    id?: number;
    diaries?: DiaryObj[];
    coParents?: CoParent[];
    dDay?: number;
  }
) => {
  const { imageUrl, coParents, diaries, dDay, id, image, ...catObj } =
    catDataObj;

  const formData = new FormData();
  const catBlob = new Blob([JSON.stringify(catObj)], {
    type: 'application/json'
  });
  formData.append('cat', catBlob);
  const file = base64ToFile(image, 'image.jpg');
  file && formData.append('image', file);

  const requestOptions = { method: 'PATCH', body: formData };

  try {
    const response = await fetchExtended(`/cats/${id}`, requestOptions);
    return response;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 수정 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 수정 중 오류 발생:');
    }
  }
};

type CatSearchOption = {
  page: number;
  size: number;
};

export const getCatsOnServer = async ({ page, size }: CatSearchOption) => {
  try {
    const response = await fetchExtended(
      `/cats?${objectToQueryString({ page, size })}`
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody.items;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 목록 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 목록 조회 중 오류 발생:');
    }
  }
};

export const requestCoParenting = async (reqObj: {
  catId: number;
  memberId: number;
}) => {
  const requestOptions = {
    method: 'POST',
    body: reqObj
  };

  try {
    const response = await fetchExtendedAuth(
      '/cats/co-parents/request',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 공동냥육 신청 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 공동냥육 신청 중 오류 발생:');
    }
  }
};

export const acceptCoParenting = async (coParentId: number) => {
  try {
    const response = await fetchExtendedAuth(
      `/cats/co-parents/${coParentId}/accept`,
      { method: 'POST' }
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 수락 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 수락 중 오류 발생:');
    }
  }
};

export const rejectCoParenting = async (coParentId: number) => {
  try {
    const response = await fetchExtendedAuth(
      `/cats/co-parents/${coParentId}/reject`,
      { method: 'POST' }
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 거절 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 거절 중 오류 발생:');
    }
  }
};

export const getCoParentCat = async (coParentId: number) => {
  try {
    const response = await fetchExtended(`/cats/co-parents/${coParentId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 고양이 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 고양이 조회 중 오류 발생:');
    }
  }
};

export const cancelCoParenting = async (reqObj: {
  catId: number;
  memberId: number;
}) => {
  const requestOptions = {
    method: 'DELETE'
  };

  try {
    const response = await fetchExtendedAuth(
      `/cats/co-parents/cancel?cat-id=${reqObj.catId}&requested-member-id=${reqObj.memberId}`,
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 취소 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 취소 중 오류 발생:');
    }
  }
};

export const deleteCat = async (id: number) => {
  const requestOptions = {
    method: 'DELETE'
  };

  try {
    const response = await fetchExtended(`/cats/${id}`, requestOptions);
    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 삭제 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 삭제 중 오류 발생:');
    }
  }
};
